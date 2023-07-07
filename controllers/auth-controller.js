const User = require("../models/user-model");
const authutil = require("../util/authentication");
const validationutil = require("../util/validation");
const sessionFlash = require("../util/session-flash");
function getsignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if (!sessionData){
    sessionData={
    email:'',
    confirmEmail: "",
    password:"",
    fullname:"",
    street:"",
    postal:"",
    city:""

  }
}
  res.render("customer/auth/signup",{inputData:sessionData});
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail:req.body["confirm_email"],
    password: req.body.pass,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  if (
    !validationutil.usercredentialsareValid(
      req.body.email,
      req.body.pass,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.street
    ) ||
    !validationutil.emailisConfirmed(req.body.email, req.body["confirm_email"])
  ) {
    sessionFlash.flashsession(
      req,
      {
        errorMessage: "Please check your Credentials",
        ...enteredData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }
  const user = new User(
    req.body.email,
    req.body.pass,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const userexistalready = await user.userexists();
    if (userexistalready) {
      sessionFlash.flashsession(
        req,
        {
          errorMessage: "User exists Already",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
  }

  res.redirect("/login");
}

function getlogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if (!sessionData){
    sessionData={
    email:'',
    password:""
    }
  }
  res.render("customer/auth/login",{inputData:sessionData});
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.pass);
  let existinguser;
  try {
    existinguser = await user.getuserwithsameemail();
  } catch (error) {
    next(error);
    return;
  }

  const sessionErrorData = {
    errorMessage: "Please check your credentials",
    email: user.email,
    password: user.pass,
  };
  if (!existinguser) {
    sessionFlash.flashsession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  const passiscorrect = await user.matchpass(existinguser.password);
  if (!passiscorrect) {
    sessionFlash.flashsession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  authutil.createusersession(req, existinguser, function () {
    res.redirect("/products");
  });
}

function logout(req, res) {
  authutil.destroyuserauth(req);
  res.redirect("/login");
}

module.exports = {
  getsignup: getsignup,
  getlogin: getlogin,
  signup: signup,
  login: login,
  logout: logout,
};
