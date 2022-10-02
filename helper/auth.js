import { compare, hash } from 'bcrypt'

export async function hashPassword(password) {
    const hashedPwd = await hash(password, 12)
    return hashedPwd
}

export async function verifyPassword(password, hashedPwd) {
    const isValid = compare(password, hashedPwd)
    return isValid
}
