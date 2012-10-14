/**
 * Created with JetBrains WebStorm.
 * User: farin99
 * Date: 8/22/12
 * Time: 10:51 PM
 * To change this template use File | Settings | File Templates.
 */


const unknown_errMsg = "General error";

const errorCodes = {
    getUserMessage: function(err){

        if(errorCodeMessages[err]){
           return errorCodeMessages[err];
        }
        else if(errorCodeMessages[err.code]){
            return errorCodeMessages[err.code];
        }
        else{
            console.log(err);
            return errorCodeMessages[err.code];
        }
    }

  , duplicateKey: 11000
  , userNotExist: 66000
  , invalidSignupData: 66001
  , invalidArguments: 66002
  , userAlreadyExists: 66003
};

const errorCodeMessages = {
    11000: "User already exists."
  , 66000: "Wrong user name or password"
  , 66001: "User name or password did not met the requirments."
  , 66002: "Invalid arguments provided."
  , 66003: "User already exists."
};

module.exports = errorCodes;
