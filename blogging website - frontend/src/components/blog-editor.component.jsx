import {Link} from 'react-router-dom';
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';

const BlogEditor= () => {
  return (

    <>
         <nav className='navbar'>
           <Link to='/' className='flex-none w-10'>
             <img src={logo}/>
           </Link>

           <p className='max-md:hidden text-black line-clamp-1 w-full'>
                New Blog
           </p>

           <div className='flex gap-4 ml-auto'>
             <button className='btn-dark py-2 px-4 font-bold'>
                 publish
             </button>
             <button className='btn-light py-2 px-4 font-bold'>
                Save Draft
             </button>
           </div>

          
    </nav>


    <AnimationWrapper>
            <section>
              <div >
                
              </div>
            </section>
           </AnimationWrapper>
    </>
   
  )
}



export default BlogEditor;

//line-clamp-1 means if text length overflow the show dot...