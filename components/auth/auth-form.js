import { useRef, useState } from 'react';
import { signIn } from 'next-auth/client'
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef()
  const passwordRef = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if(!response.ok) {
      throw new Error(data.message || 'Some error')
    }
    return data
  }
  async function submitHandler(event) {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if(!isLogin) {
      // get the email and password and then call signup api
      try {
        const response = await createUser(email, password)
        console.log('User Created ', response)
      } catch (error) {
        console.log(error)
      }
      
    } else if(isLogin) {
      // we dont need to call any API. Next auth will take care of this
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      console.log('Post Login ', result)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
