import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import './Assets/css/Login.css';
import { Toaster } from 'react-hot-toast';

const Login = () => {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    return (
        <>
            <div className='login_body'>
                <div style={{ display: 'flex' }}>
                    <form>
                        <div className="login_div">
                            <h1 className="login_Log"><b>Login</b></h1>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                className='login_un'
                                sx={{ marginBottom: '30px', borderRadius: '10px' }}
                                value={name}
                                onChange={(event) => { setname(event.target.value) }}
                                required
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                className='login_un'
                                sx={{ marginBottom: '30px', borderRadius: '10px' }}
                                value={password}
                                onChange={(event) => { setpassword(event.target.value) }}
                                required
                            />
                            <div className="login_remember">
                                <label className="login_checkbox">
                                    <input type='checkbox'></input>Remember me
                                </label>
                                <a href='/' className='login_forgot'>Forgot password?</a>
                            </div>
                            <button className='login_button'>Login</button>
                            <div>
                                <label className='login_dont'>Don't have an account? </label>
                                <a href='/SignUp' className='login_forgot'>Signup</a>
                            </div>
                        </div>
                    </form>
                    <div style={{ marginTop: '50px', marginBottom: '80px', height: '50vh' }}>
                        <b style={{ fontSize: '40px', color: '#373737' }}>Safe Surfing<br></br>Beware of online scams</b><br></br><br></br><br></br>
                        <div className='login_welcome'>
                            <h1 style={{ fontSize: '40px', color: '#373737' }}>Welcome back!</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default Login;
