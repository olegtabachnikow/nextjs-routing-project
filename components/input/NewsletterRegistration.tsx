import { useRef, useContext, FC } from 'react';
import classes from './NewsletterRegistration.module.css';
import NotificationContext from '@/store/notification-context';

const NewsletterRegistration: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);
  function handleRefreshValue() {
    if (emailInputRef.current) {
      emailInputRef.current.value = '';
    }
  }
  function registrationHandler(event: any) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;

    notificationCtx.showNotification({
      title: 'Signing  up...',
      message: 'Registering the newsletter',
      status: 'pending',
    });

    fetch('api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          handleRefreshValue();
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message) || 'Something went wrong!';
        });
      })
      .then((res) => {
        handleRefreshValue();
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      })
      .catch((err) => {
        handleRefreshValue();
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
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
};

export default NewsletterRegistration;
