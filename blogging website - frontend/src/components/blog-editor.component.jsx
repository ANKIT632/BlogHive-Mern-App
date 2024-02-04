import {Link} from 'react-router-dom';
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';
import defaultBannner from '../imgs/blog banner.png';
import {Toaster, toast} from 'react-hot-toast'
import { useRef,useState } from 'react';

const BlogEditor= () => {

  let blogBannerRef=useRef();

const handleTitleKeyDown=()=>{
   if(e.keyCode==13){
    e.preventDefault();
   }
}

const [selectedImage, setSelectedImage] = useState(null);

const handleTitleChange=(e)=>{
   let input=e.target;

   input.style.height='auto';
   input.style.height=input.scrollHeight+"px"
}

  const handleBannerUpload=(e)=>{
  

        let selectImg=e.target.files[0];
        
        console.log("img..1 ",selectImg);

        // if not select img after click the return null
        if(selectImg){
          
          // let lodingToast=toast.loading("uploading...");

          // add on db.

          //  toast.dismiss(lodingToast);
          //  toast.success('uploaded');

          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(selectedFile);

          // blogBannerRef.current.src=selectImg;
        }
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

    <Toaster/>
    <AnimationWrapper>
            <section>
              <div className='mx-auto max-w-[900px] w-full'>

                  <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">

                      <label htmlFor='uploadBanner'>
                            <img
                              // ref={blogBannerRef}
                              src={selectedImage?selectedImage:defaultBannner}
                              className='z-20'
                             
                            />
                    

                      <input 
                        id='uploadBanner'
                        type='file'
                        accept='.png, .jpg ,.jpeg'
                        hidden
                        onChange={handleBannerUpload}
                      />

             </label>
                  </div>

                  <textarea
                  placeholder='Blog Title'
                  className='text-2xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 md:text-3xl'
                  onKeyDown={handleTitleKeyDown}
                  onChange={handleTitleChange}
                  >

                  </textarea>
              </div>
            </section>
           </AnimationWrapper>
    </>
   
  )
}



export default BlogEditor;

//line-clamp-1 means if text length overflow the show dot...
// How to work click input  ? lable are active click event for input .