const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = data => jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '432000s' });
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token === null || token === undefined) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('err', err);
      return res.sendStatus(403);
    };
    req.user = user;
    next();
  })
};
