const SetSession=(key,value)=>{
    return sessionStorage.setItem(key,value);
}

const GetSessionData=(key)=>{
    return sessionStorage.getItem(key);
}

const removeFromSession=(key)=>{
    return sessionStorage.removeItem(key);
}

const logOutUser=()=>{
    sessionStorage.clear();
}

export { SetSession,GetSessionData,removeFromSession,logOutUser};