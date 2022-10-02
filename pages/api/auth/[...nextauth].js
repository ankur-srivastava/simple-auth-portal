import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../helper/auth'
import { checkUserExists } from '../../../helper/db-helper'

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                // check if user exists in db
                const user = await checkUserExists(credentials.email)
                if(!user) {
                    throw new Error('No User Found')
                }
                // Validate password
                const isValid = await verifyPassword(credentials.password, user.password)
                if(!isValid) {
                    throw new Error('Could not log you in')
                }
                return {email: user.email}
            }
        })
    ]
})
