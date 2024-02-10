import {Link} from 'react-router-dom';
import logo from '../imgs/logo.png';
import AnimationWrapper from '../common/page-animation';
import defaultBannner from '../imgs/blog banner.png';
import {Toaster, toast} from 'react-hot-toast'
import { useContext, useEffect, useRef,useState } from 'react';
import { EditorContext } from '../pages/editor.pages';
import EditorJS from '@editorjs/editorjs'
import { tools } from './tools.component';
const BlogEditor= () => {

  let blogBannerRef=useRef();
  let {blog,blog :{title,banner,content,teg,des},setBlog,textEditor,setTextEditor,setEditorState}=useContext(EditorContext);


  //useEffect 

  useEffect(()=>{
    let editor=new EditorJS({
        holderId:'textEditor',
        data:'',
        tools:tools,
        placeholder:"Let's write something Here"
    });

    setTextEditor(editor);
  },[])

// if click enter then does not work in title use it for make single line title; 
const handleTitleKeyDown=(e)=>{
   if(e.keyCode===13){
    e.preventDefault();
   }
}

const [selectedImage, setSelectedImage] = useState(null);

// increase height of title textarea according to text.
const handleTitleChange=(e)=>{
   let input=e.target;
   input.style.height='auto';
   input.style.height=input.scrollHeight+"px";
  
   setBlog({...blog,title:input.value});

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

          blogBannerRef.current.src=selectImg;
            setBlog({...blog,banner:selectImg});

        }
  }


  const handlePublishEvent=()=>{
      //  if(!banner.length){
      //   return toast.error('Upload the blog banner to publish it !!');
      //  }
      //  if(title.length){
      //   return toast.error('Upload the blog title !!');
         
      //  }

      console.log(textEditor);

       if(textEditor.isReady){
          textEditor.save().then(data=>{
                 if(data.blocks.length){
                  setBlog({...blog,content:data
                  });
                  setEditorState('publish');
                 }
                 else{
                  return toast.error('Write something in your blog to publish it')
                 }
          })
          .catch((err)=>{
            console.log(err);
          })
       }
     
  }

  return (

    <>
  
          <nav className='navbar shadow'>
           <Link to='/' className='flex-none w-10'>
             <img src={logo}/>
           </Link>

           <p className='max-md:hidden text-black line-clamp-1 w-full'>
              {title.length?title:"New Blog"}
           </p>

           <div className='flex gap-4 ml-auto'>
             <button className='btn-dark py-2 px-4 '
              onClick={handlePublishEvent}
             >
                 publish
             </button>
             <button className='btn-light py-2 px-4 ' >
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
                              ref={blogBannerRef}
                              src={banner}
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
                  className='text-2xl font-medium w-full h-10 outline-none  mt-10 leading-tight placeholder:opacity-40 md:text-3xl'
                  onKeyDown={handleTitleKeyDown}
                  onChange={handleTitleChange}
                  >

                  </textarea>
                  <hr className='w-full opacity-20 my-5'/>
                  <div>
                <div id='textEditor' className='font-gelasio'></div>
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

//Note :
// blog :{title,banner,content,teg,des} use for destructure.