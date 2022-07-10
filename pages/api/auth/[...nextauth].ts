import { UserCreate } from "api_clients"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"


export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({token, account}) {
        console.log("callback jwt", {token}, {account})

        if (account && account.provider !== "credentials") {
            if (token.email && token.name) {
                // register if not exist on backend
                const userBody = {
                    full_name: token.name,
                    email: token.email,
                }

                // send create user request
            }
        }

        return token
    },
    async session({session, token, user}) {
        console.log("callback session", {session}, {token}, {user})
        return session
    }
  }
})
