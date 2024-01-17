const isValidUsername = (username) => {
    // by increasing *\d. increasing the username digits
    // now is 3 from index 0 actually 4 digits in username is must
    const regex = /^(?=[A-Z])\w*\d.*\d.*\d.*\d.*$/;
    return regex.test(username);
  };
  


  export {isValidUsername}