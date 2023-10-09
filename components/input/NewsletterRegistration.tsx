import { useRef } from 'react';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  function registrationHandler(event: any) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    fetch('api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
