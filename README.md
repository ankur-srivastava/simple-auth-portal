This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## NextAuth package

Install the next-auth package, which has been used for authentication.

## Config File

Add a next.config.js with following content

    const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

    module.exports = (phase) => {
        if(phase === PHASE_DEVELOPMENT_SERVER) {
            return {
                env: {
                    mongodb_username: 'test',
                    mongodb_password: '',
                    mongodb_db: 'test_dev'
                }
            }
        }

        return {
            env: {
                mongodb_username: 'test',
                mongodb_password: '',
                mongodb_db: 'test'
            }
        }
    }
