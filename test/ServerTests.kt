import io.ktor.application.Application
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.server.testing.cookiesSession
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.setBody
import io.ktor.server.testing.withTestApplication
import org.junit.jupiter.api.Test
import uttt.createAuthToken
import uttt.module
import kotlin.test.assertEquals

class ServerTests {

    @Test
    fun loginTest() {
        withTestApplication (Application::module) {
            cookiesSession {
                with(handleRequest(HttpMethod.Post, "/login") {
                    addHeader(HttpHeaders.ContentType, ContentType.Application.FormUrlEncoded.toString())
                    setBody("username=test&password=asdfghj")
                }) {
                    val token = response.cookies["SESSION"]!!.value.removePrefix("token=%23s")
                    assertEquals(createAuthToken("test"), token)
                }
                with(handleRequest(HttpMethod.Get, "/whoami") {
                }) {
                    val body = response.content
                    assertEquals("test", body)
                }
            }
        }
    }
}