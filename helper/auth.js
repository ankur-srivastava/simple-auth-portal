import { hash } from 'bcrypt'

export async function hashPassword(password) {
    const hashedPwd = await hash(password, 12)
    return hashedPwd
}