//checks the token inside the authorization header
const jwt = require('jsonwebtoken');

//authenticate token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "8faHdXnNLhKxfjydSFbtEjmcTWZt"); //second portion should be changed to a process/enviorment variable (along it all other isntances of it)
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
}