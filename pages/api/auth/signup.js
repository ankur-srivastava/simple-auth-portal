import { hashPassword } from "../../../helper/auth"
import { checkUserExists, createUser } from "../../../helper/db-helper"

const handler = async (req, res) => {
    console.log('In Signup Handler')
    if(req.method === 'POST') {
        const { email, password } = req.body
        console.log('POST Request email = ', email)
        // validate
        if(!email || !email.includes('@') || !password) {
            res.status(422).json({message: 'Invalid inputs'})
            return
        }
        // check if user exists
        try {
            const existingUser = await checkUserExists(email)
            if(existingUser) {
                console.log('User Exists')
                res.status(200).json({message: 'User Exists', existingUser})
                return
            }
        } catch (error) {
            console.log('Error while fetching user ', error)
        }
        // store in db
        const newUser = {
            email,
            password: await hashPassword(password)
        }
        try {
            const user = await createUser(newUser)
            console.log('User Added')
            res.status(200).json({message: 'Success', user})
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Error'})
            return
        }
    }
}

export default handler
