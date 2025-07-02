import { NextAuthOptions } from 'next-auth'
import { SanityAdapter } from 'next-auth-sanity'
import GoogleProvider from 'next-auth/providers/google'
import sanityClient from './sanity'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: SanityAdapter(sanityClient),
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    async session({ session, token }) {
      if (!token?.email) return session

      try {
        const user = await sanityClient.fetch<{ _id: string }>(
          `*[_type == "user" && email == $email][0] { _id }`,
          { email: token.email }
        )

        if (user?._id) {
          session.user.id = user._id
        }
      } catch (err) {
        console.error('Sanity fetch user failed:', err)
      }

      return session
    }
  }
}
