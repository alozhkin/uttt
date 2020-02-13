package uttt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException
import io.ktor.application.*
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.sessions.Sessions
import io.ktor.sessions.cookie
import io.ktor.sessions.sessions
import java.io.File
import java.time.Duration
import kotlin.Exception

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused")
fun Application.module() {

    install(CallLogging)
    install(DefaultHeaders)
    install(Sessions) {
        cookie<MySession>("SESSION") {
            cookie.httpOnly = true
            cookie.duration = Duration.ofMinutes(5)
        }
    }
    install(StatusPages) {
        exception<AuthenticationException> {
            call.respond(HttpStatusCode.Unauthorized)
        }
    }

    routing {
        static("static") {
            staticRootFolder = File("resources/static")
            file("style.css")
            file("temp.css")
            file("index.js")
        }
        get("/") {
//            call.sessions.clear("SESSION")
            call.respondFile(File("resources/static/index.html"))
        }

        login()
        getName()
    }
}

val database = Database()

fun Routing.login() {
    post("/login") {
        val params = call.receiveParameters()
        val username = params["username"] ?: throw AuthenticationException()
        val password = params["password"] ?: throw AuthenticationException()
        database.validateUser(username, password)
        val cookie = MySession(createAuthToken(username))
        call.sessions.set("SESSION", cookie)
        call.respond(HttpStatusCode.OK)
    }
}

fun Routing.getName() {
    get("/whoami") {
        val token = (call.sessions.get("SESSION") as? MySession)?.token ?: throw AuthenticationException()
        val username = JWT.decode(token).claims["username"]?.asString() ?: throw AuthenticationException()
        verifyAuthToken(username, token)
        call.respondText(username)
    }
}