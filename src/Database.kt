package uttt

class Database {
    val database = mutableMapOf<String, String>("test" to "asdfghj", "a" to "a")

    fun validateUser(username: String?, password: String?) {
        if (username !in database || database[username] != password) throw AuthenticationException()
    }
}