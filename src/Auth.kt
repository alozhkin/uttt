package uttt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException

const val domain = "https://mydomain.com"
const val audience = "user"
val secret = System.getenv("UTTT_SECRET") ?: "secret"
val algorithm = Algorithm.HMAC256(secret)

fun createAuthToken(username: String): String = JWT.create()
    .withIssuer(domain)
    .withAudience(audience)
    .withClaim("username", username)
    .sign(algorithm)

fun verifyAuthToken(username: String, token: String) {
    try {
        JWT
            .require(algorithm)
            .withIssuer(domain)
            .withAudience(audience)
            .withClaim("username", username)
            .build()
            .verify(token)
    } catch (exception: JWTVerificationException) {
        throw AuthenticationException()
    }
}
