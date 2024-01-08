import React, { useContext } from 'react'
import AnimationWrapper from '../common/page-animation';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSession } from '../common/session';

 const userNavigationPanel= () => {

    const { userAuth:{username},setUserAuth}=useContext(UserContext);

    const signOutUser=()=>{
      removeFromSession('user');
      setUserAuth({access_token:null});
    }    

  return (
    <AnimationWrapper
    className="absolute right-0 z-50"
    transition={{duration:0.2}}
      
    >

       <div className='bg-white shadow absolute right-0 border border-grey w-60  duration-200'>
           <Link to='/editor' className='flex gap-2 link md:hidden pl-8 py-4 border-b border-black font-bold'>
              <i className='fi fi-rr-file-edit '></i>
              <p>write</p>
           </Link>

           <Link to={`/user/${username}`} className='link pl-8 py-2 border-b border-black'>
           profile
           </Link>
           <Link to="/dashboard/blogs" className='link pl-8 py-2 border-b border-black'>
           Dashboard
           </Link>
           <Link to="/settings/edit-profile " className='link pl-8 py-2 border-b border-black'>
           Settings
           </Link>
    
        <button className='text-left p-2 hover:bg-grey w-full pl-8 py-2'
         onClick={signOutUser}
        >
         <h4 className='font-bold  '>Sign Out</h4>
         <p className='text-dark-grey'>@{username}</p>
        </button>
       </div> 
    </AnimationWrapper>
  )
}

export default userNavigationPanel;
