import Embed from  '@editorjs/embed';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from "@editorjs/inline-code";


const uploadImageByFile=(e)=>{
    
}


const uploadImageByURL= (e)=>{
    let link=new Promise((resolve,reject)=>{
        try{
            resolve(e);
        }
        catch{
            reject(err);
        }
    });

    const url = link;
    return {
        success: 1,
        file: { url }
    };
}

export const tools={
    embed:Embed,
    list:{
        class:List,
        inlineToolbar:true,
    },
    image:{
        class:Image,
        config:{
            uploader:{
                uploadByUrl:uploadImageByURL,
                uploadByFile:uploadImageByFile,
            }
        }
    },
    header:{
        class:Header,
        config:{
            placeholder:'Write heading here..',
            level:[2,3],
            defaultLevel:3,

        }
    },
    quote:{
        class:Quote,
        inlineToolbar:true,
    },
    marker:Marker,
    inlineCode:InlineCode
}

// Note:
// Enbed use to add social media video by provide link.

// List allow to add order and unorder list ,it is customization option.
 // - allow inline tool and make order and unorder list
 
// Image provide you can unpload image and link provide or drag & drop.
// Header use to provide header h1,h2..
   // - level = h2,h3

// Quote add the quote.
// marker marke the text.



