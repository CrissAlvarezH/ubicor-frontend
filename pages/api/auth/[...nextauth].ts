import { AuthService, OAuthUserCreate } from "api_clients"
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
        async jwt({ token, account }) {
            console.log("callback jwt", { token }, { account })

            if (account && account.provider !== "credentials") {
                if (token.email && token.name) {
                    // register if not exist on backend
                    const userBody: OAuthUserCreate = {
                        full_name: token.name,
                        email: token.email,
                        provider: account.provider
                    }

                    const user = await AuthService.authGetOrCreateUser(userBody)

                    token.user_id = user.id
                    token.scopes = user.scopes

                    console.log("user", user)
                    console.log("token", token)
                }
            }

            return token
        },
        async session({ session, token, user }) {
            console.log("callback session", { session }, { token }, { user })
            return session
        }
    }
})
