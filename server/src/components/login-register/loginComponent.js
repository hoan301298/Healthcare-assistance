const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserDetail = require('../model/UserDetail');
const SECRET_KEY = process.env.SECRET_KEY;

const loginComponent = async (req, res) => {
  
  const { username, password } = req.body;
  try {
    const user = await UserDetail.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
  
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
        res.json({ token, username });  
      });
    }
  } catch (error) {
    console.log('Failed to connect User: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
  //Middleware to authenticate JWT token

module.exports = loginComponent;