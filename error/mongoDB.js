exports.mongoDB = (error) => {
   
    let errorVal = [];
    if (error.customError) {
      errorVal.push(error.customError);
      return errorVal;
   }

    if (!error.errors.legnth) {
       for (const key in error.errors) {
        errorVal.push(error.errors[key].message);
        
       }
    }

   return errorVal;

}
