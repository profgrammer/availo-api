const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ");
    console.log(token);
    const decoded = jwt.verify(token[1], process.env.JWT_KEY);
    req.userToken = decoded;
    next();
  }
  catch(err){
    return res.status(403).json({
      message: 'forbidden'
    });
  }
}
