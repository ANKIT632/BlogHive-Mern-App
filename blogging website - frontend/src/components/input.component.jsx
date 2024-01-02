import React, { useState }  from 'react'


const InputBox = ({name ,type,id,value,placeholder,icon}) => {

    const [passworsVisible,SetPassworsVisible]=useState(false);

  return (
    <div className='relative w-[100%] mb-4'>
    {console.log("call")}
      <input 
      name={name}
        type={type==='password'?(passworsVisible?'text':type):type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={"fi "+ icon +" input-icon"}></i>

      {
        type==="password"?
        <i className={"fi fi-rr-eye" +(!passworsVisible? "-crossed":"")+" input-icon left-[auto] right-4 cursor-pointer"} 
        onClick={()=>SetPassworsVisible(currVal=>!currVal)}
        ></i>:""
      }
    </div>
  )
}

export default InputBox