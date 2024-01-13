const changeToUpperCase = (text)=>{
    return text[0]?.toUpperCase() + text?.substr(1, text?.length)
}



export {changeToUpperCase}