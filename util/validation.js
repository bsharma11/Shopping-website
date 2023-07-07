const { emit } = require("nodemon");

function isEmpty(value) {
  return !value || value.trim() == "";
}

function email_pass_correct(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

function usercredentialsareValid(email, password, name, street, postal, city) {
  return (
    email_pass_correct(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}
function emailisConfirmed(email,confirmemail){
    return email === confirmemail
}

module.exports ={
    usercredentialsareValid:usercredentialsareValid,
    emailisConfirmed:emailisConfirmed
}