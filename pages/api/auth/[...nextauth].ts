import { AuthService, Body_Auth_login, OAuthUserCreate } from "api_clients"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (credentials?.email && credentials?.password) {
                    const loginBody: Body_Auth_login = {
                        username: credentials.email,
                        password: credentials.password
                    }

                    try {
                        const resp = await AuthService.authLogin(loginBody)
                        return {
                            id: resp.user.id,
                            email: resp.user.email,
                            name: resp.user.full_name
                        }
                    } catch (error: any) {
                        console.log("AUTH ERROR", error)
                    }
                }
                return null // null when fails
            }
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID || "",
            clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],

    pages: {
        signIn: "/profile/login"
    },

    callbacks: {
        async jwt({ token, account }) {
            console.log("callback jwt", { token }, { account })
            if (account && token.name && token.email) {

                const userBody: OAuthUserCreate = {
                    email: token.email
                }

                if (account.provider !== "credentials") {
                    // register if not exist on backend
                    userBody.full_name = token.name,
                    userBody.provider = account.provider
                }

                const user = await AuthService.authGetOrCreateUser(userBody)

                token.user_id = user.id
                token.scopes = user.scopes
            }

            return token
        },
        async session({ session, token, user }) {
            console.log("callback session", { session }, { token }, { user })
            session.scopes = token.scopes
            return session
        }
    }
}

export default NextAuth(authOptions)
