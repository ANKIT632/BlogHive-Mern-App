import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../imgs/logo.png'
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

const navbar = () => {

const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);  

    const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);

    return (
        <>

            <nav className='navbar'>

                <Link to='/' className='flex-none w-10'>
                    <img src={logo} className='w-full' />
                </Link>

                <div className={"absolute  bg-white  w-full left-0 top-full mt-0.5 border-b border-grey py-2 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + (searchBoxVisibility ? "show" : "hide")}>
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-full h-10 bg-grey md:w-auto  p-1 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-gray md:pl-12 md:h-12'
                    />
                    <i className='fi fi-rr-search absolute right-[10%] hover:bg-black/10 md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-2xl text-dark-gray '></i>
                </div>
                <div className='flex item-center gap-3 md:gap-6 ml-auto'>
                    <button className=' md:hidden bg-grey w-11 h-11 rounded-full flex items-center justify-center' onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}>
                        <i className='fi fi-rr-search text-2xl'></i>
                    </button>

                    <Link to="/editor" className='hidden md:flex gap-2 link '>
                        <i className='fi fi-rr-file-edit '></i>
                        <strong>write</strong>
                    </Link>

                    {
                        access_token ?
                            <>
                                <Link to="/dashboard/notification">
                                    <button className='w-11 h-11 rounded-full bg-grey relative hover:bg-black/10'>
                                        <i className='fi fi-rr-bell text-2xl mt-1'></i>
                                    </button>

                                </Link>

                                <div className='relative'>
                                    <button className='w-11 h-11 '>

                                        <img src={profile_img} className='w-full h-full object-cover rounded-full' />
                                    </button>
                                    <UserNavigationPanel />
                                </div>
                            </>

                            :
                            <>
                                <Link className='btn-dark py-2 md:py-3' to="/signin">
                                    <strong> sign in</strong>
                                </Link>

                                <Link className='btn-light hidden py-2  md:block md:py-3 ' to="/signup">
                                    <strong> sign Up</strong>
                                </Link>
                            </>
                    }

                </div>

            </nav>

            <Outlet />
        </>



    )
}

export default navbar

// md:hidden means hidden in medium and larger screen
// by the help of outlets  the render child route