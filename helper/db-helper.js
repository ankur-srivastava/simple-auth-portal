import { MongoClient } from 'mongodb'

const DB_USERNAME = process.env.mongodb_username
const DB_PASSWORD = process.env.mongodb_password
const DB_NAME = process.env.mongodb_db

const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.jrdex.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(DB_URL);

async function initDb() {
  try {
    return client.db(DB_NAME);
  } catch(e) {
    console.log('Error occured ', e)
  }
}

export async function checkUserExists(email) {
    const database = await initDb()
    const users = database.collection('myusers')

    if(users) {
        try {
            const user = await users.findOne({email})
            if(user) {
                return user
            }
        } catch (error) {
            console.log(error)
        }
    }
    return null
}

export async function createUser(newUser) {
    const database = await initDb()
    const users = database.collection('myusers')

    if(users) {
        const contact = await users.insertOne(newUser)
        console.log('New user created ', JSON.stringify(contact))
        return contact
    }
    return null
}
