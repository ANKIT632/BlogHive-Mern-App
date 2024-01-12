import {Link} from 'react-router-dom';
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';
import defaultBannner from '../imgs/blog banner.png';

const BlogEditor= () => {

  const handleBannerUpload=(e)=>{
        let selectImg=e.target.files[0];
  }

  return (

    <>
         <nav className='navbar shadow'>
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
              <div className='mx-auto max-w-[900px] w-full'>
                  <div className='relative aspect-video bg-white border-4 border-grey'>
                      <label htmlFor='uploadBanner'>
                            <img
                              src={defaultBannner}
                              className='z-20'
                              style={{ cursor: 'pointer' }}
                            />
                      </label>

                      <input 
                        id='uploadBanner'
                        type='file'
                        accept='.png, .jpg ,.jpeg'
                        hidden
                        onChange={handleBannerUpload}
                      />
                  </div>
              </div>
            </section>
           </AnimationWrapper>
    </>
   
  )
}



export default BlogEditor;

//line-clamp-1 means if text length overflow the show dot...
// How to work click input  ? lable are active click event for input .