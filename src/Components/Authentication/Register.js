// Register
import { useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth'

const Register = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { search } = location;
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState('');
  const [signInWithGoogle, gLoading, gError] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate('/');
      } else {
        navigate('/verify-email');
      }
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem('email');
        if (!email) {
          email = window.prompt('Please provide your email');
        }
        setInitialLoading(true);
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            localStorage.removeItem('email');
            setInitialLoading(false);
            setInitialError('');
            if (result.user.emailVerified) {
              navigate('/');
            } else {
              navigate('/verify-email');
            }
          })
          .catch((err) => {
            setInitialLoading(false);
            setInitialError(err.message);
            navigate('/login');
          });
      }
    }
  }, [user, search, navigate]);


 

  

const handleSignUp = async (e) => {
  e.preventDefault();
  setLoginLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

 
    const formData = new FormData();
    formData.append('name', ''); 
    formData.append('email', email);
    formData.append('role', ''); 
    formData.append('company', ''); 
    formData.append('district', ''); 
    formData.append('address', ''); 
    await fetch('http://localhost:8000/user', {
      method: 'POST',
      body: formData,
    });

    await sendEmailVerification(user, {
      url: 'http://localhost:3000',
      handleCodeInApp: true,
    });
    setLoginLoading(false);
    setInfoMsg('Verification email sent. Please check your inbox.');
  } catch (err) {
    setLoginLoading(false);
    setLoginError(err.message);
  }
};

  return (
    <div>
        <div className='box'>
      {initialLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {initialError !== '' ? (
            <div className='error-msg'>{initialError}</div>
          ) : (
            <>
              {user ? (
                <div>Please wait...</div>
              ) : (
                <form className='form-group custom-form'>
                  <label>Email</label>
                  <input
                    type='email'
                    required
                    placeholder='Enter Email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password</label>
                  <input
                    type='password'
                    required
                    placeholder='Enter Password'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type='button' className='btn btn-primary btn-md' onClick={handleSignUp}>
                    {loginLoading ? <span>Signing you up</span> : <span>Sign Up</span>}
                  </button>
                  {loginError !== '' && <div className='error-msg'>{loginError}</div>}
                  {infoMsg !== '' && <div className='info-msg'>{infoMsg}</div>}
                </form>
              )}
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Register;
