import { AuthService, Body_Auth_login, OAuthUserCreate } from "api_clients"
import axios from "axios"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { parseJwt } from "utils/jwt"


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
                        const decodedToken = parseJwt(resp.access_token)
                        return {
                            id: decodedToken.user.id,
                            email: decodedToken.user.email,
                            name: decodedToken.user.full_name,
                            access_token: resp.access_token,
                            scopes: decodedToken.user.scopes,
                            expireAt: decodedToken.exp
                        }
                    } catch (error: any) {
                        console.log("AUTH ERROR", error)
                    }
                }
                return null // null when fails
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.AUTH_GOOGLE_ID || "",
        //     clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
        //     authorization: {
        //         params: {
        //             prompt: "consent",
        //             access_type: "offline",
        //             response_type: "code"
        //         }
        //     }
        // })
    ],

    pages: {
        signIn: "/profile/login"
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account && token.name && token.email) {
                if (account.provider === "google") {
                    // register if not exist on backend
                    const userBody: OAuthUserCreate = {
                        email: token.email
                    }

                    userBody.full_name = token.name,
                    userBody.provider = account.provider

                    const idToken = account.id_token || "invalid"
                    const resp = await AuthService.authTokenSignIn({token_id: idToken, provider: "google"})

                    token.user_id = resp.user.id
                    token.scopes = resp.user.scopes
                    token.access_token = resp.access_token

                    return refreshAccessToken(token, "google")
                } else if (account.provider === "credentials") {
                    token.access_token = user?.access_token
                    token.scopes = user?.scopes
                    token.expireAt = user?.expireAt
                }
            }

            const timeNow = Math.floor(new Date().getTime()/1000.0)
            if (token.expireAt && token.expireAt < timeNow) {
                return refreshAccessToken(token, "credentials")
            }

            // TODO refresh token for google

            return token
        },
        async session({ session, token, user }) {
            session.scopes = token.scopes
            session.access_token = token.access_token
            session.error = token.error
            return session
        }
    }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any, provider: string) {
  try {

    switch (provider) {
        case "google":
            return refreshGoogleAccessToken(token)
        case "credentials":
            return refreshCredentialsAccessToken(token)
        default:
            throw Error("Method not implemented")
    }

  } catch (error: any) {
    console.error("AUTH REFRESH ACCESS TOKEN ERROR", error?.data)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}


async function refreshCredentialsAccessToken(token: any) {
    // not doing token refreshing
    return {...token, error: "RefreshAccessTokenError"}
}

async function refreshGoogleAccessToken(token: any) {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

    const refreshedTokens: any = await axios({
        url: url,
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expireAt: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
}

export default NextAuth(authOptions)
