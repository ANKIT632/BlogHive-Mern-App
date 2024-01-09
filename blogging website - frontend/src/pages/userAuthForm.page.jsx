import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'

import { Link, Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'

import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { SetSession } from '../common/session'
import { useContext } from 'react'
import { UserContext } from '../App'
import { authWithGoogle } from '../common/firebase'

const userAuthForm = ({ type }) => {


    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);     // {access_token} --> userAuth.access_token

    //  send data to server
    const userAuthThrougthServer = (serverRoute, formdata) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formdata)
            .then(({ data }) => {

                SetSession('user', JSON.stringify(data));  // bec's browser store only string data.
                setUserAuth(data);
                console.log(sessionStorage);
            })
            .catch(({ response }) => {
                toast.error(response.data.error);
            });
    }


    // googleAuth

    const handleGoogleAuth = (e) => {
        e.preventDefault();

        authWithGoogle().then(user => {
         
            let serverRoute = '/google-auth';
            let formData = {
                access_token: user.accessToken
            }

            userAuthThrougthServer(serverRoute, formData);
        }).catch(err => {
            toast.error('troble login trough google');
            return console.log(err);
        })
    }




    // credential check
    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == 'sign-in' ? '/signin' : '/signup';

        // formData
        let form = new FormData(formElement);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        //regex
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let { fullname, email, password } = formData;


        if (type === 'sign-Up' && fullname.length < 3) {
            return toast.error("Fullname must be at least 3  letter long");
        }



        if (!email.length) {
            return toast.error("Enter email");
        }

        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric , 1 lowercase and 1 uppercase");
        }


        userAuthThrougthServer(serverRoute, formData);

    }


    return (
        access_token ? <Navigate to='/' /> :
            <AnimationWrapper keyValue={type}>

                <section className='h-cover flex items-center justify-center '>
                    <Toaster />
                    <form id='formElement' className='w-[80%] max-w-[400px]'>
                        <h1 className='text-4xl font-gelsio capitalize text-center mb-5'>
                            {type == 'sign-in' ? "Welcome back" : "join us today"}
                        </h1>

                        {
                            type !== 'sign-in' ?
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder='Full Name'
                                    icon="fi-rr-user"
                                /> : ""
                        }
                        <InputBox
                            name="email"
                            type="email"
                            placeholder='Email'
                            icon="fi-rr-envelope"
                        />
                        <InputBox
                            name="password"
                            type="password"
                            placeholder='password'
                            icon="fi-rr-key"
                        />

                        <button
                            className='btn-dark center mt-8 mb-5'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            {type.replace('-', ' ')}
                        </button>



                        <div className='relative w-full flex items-center gap-2 my-5 opacity-20 uppercase text-black font-bold'>
                            <hr className='w-1/2 border-black' />
                            <p>or</p>
                            <hr className='w-1/2 border-black' />

                        </div>

                        <button className='btn-dark flex items-csenter justify-center gap-4 w-[75%] center'
                            onClick={handleGoogleAuth}
                        >

                            <img src={googleIcon} className='w-5' />
                            continue with google
                        </button>

                        {
                            type == 'sign-in' ?
                                <p className='mt-5 text-dark-gray text-xl text-center'>Don't have an account ?
                                    <Link to="/signup" className="underline text-black text-xl ml-1">Join us today</Link></p> :
                                <p className='mt-5 text-dark-gray text-xl text-center'>Already have  Account ?
                                    <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here</Link></p>
                        }


                    </form>

                </section>
            </AnimationWrapper>
    )
}


export default userAuthForm;