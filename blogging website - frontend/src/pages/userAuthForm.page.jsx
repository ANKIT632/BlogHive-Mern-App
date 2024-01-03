import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'

const userAuthForm = ({ type }) => {



    return (
        <AnimationWrapper keyValue={type}>
            <section className='h-cover flex items-center justify-center'>
                <form className='w-[80%] max-w-[400px]'>
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
                    >
                        {type.replace('-', ' ')}
                    </button>

                    <div className='relative w-full flex items-center gap-2 my-5 opacity-20 uppercase text-black font-bold'>
                        <hr className='w-1/2 border-black' />
                        <p>or</p>
                        <hr className='w-1/2 border-black' />

                    </div>

                    <button className='btn-dark flex items-center justify-center gap-4 w-[75%] center'>

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