import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from '../../assets/images/logo.jpg';
import loginImage from '../../assets/images/loginImage.jpg';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/login/', {  // Ensure URL matches your Django setup
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResponseMessage(data.message);
        if (data.message === 'Login successful!') { 
          console.log('daaa nahui')
          onLogin()
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setResponseMessage('An error occurred');
      });
  };

  return (
    <div className={styles.fullPage}>
      <div className={`${styles.brandingWrapper} ${styles.float}`}>
        <div className={`${styles.branding} ${styles.illustrationClass}`}></div>
      </div>
      <div className={`${styles.contentWrapper} ${styles.float}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <img className={styles.logoImage} src={logo} alt="Company Logo" />
          </div>
          <div className={styles.workArea}>
            <div className={`${styles.authArea} ${styles.groupMargin}`}>
              <div className={styles.loginArea}>
                <div className={`${styles.loginMessage} ${styles.groupMargin}`}>
                  <b>Login in the format:</b>
                  <br />
                  <b>DTU Users:</b>
                  <span>username@dtu.dk</span>
                  <br />
                  <b>DTU Students:</b>
                  <span>username@dtu.dk</span>
                  <br />
                  <b>Guest.dtu.dk Users:</b>
                  <span>username@win.dtu.dk</span>
                </div>
                <form onSubmit={handleSubmit} className={styles.loginForm} autoComplete="off">
                  <div className={styles.formsAuthenticationArea}>
                    <input
                      className={`${styles.userNameInput} ${styles.text} ${styles.fullWidth}`}
                      name="username"
                      type="email"
                      value={username}
                      tabIndex="1"
                      spellCheck="false"
                      placeholder="Username"
                      autoComplete="off"
                      onChange={e => setUsername(e.target.value)}
                    />

                    <input
                      className={`${styles.passwordInput} ${styles.text} ${styles.fullWidth}`}
                      name="password"
                      type="password"
                      value={password}
                      tabIndex="2"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit" className={styles.submitButton}>Connect</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
