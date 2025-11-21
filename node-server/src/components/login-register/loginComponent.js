import jsonToken from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { constants } from '../../constant.js';
import UserDetail from '../model/UserDetail.js';

const loginComponent = async (req, res) => {
  
  const { username, password } = req.body;
  try {
    const user = await UserDetail.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    } else {
      compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
  
        const token = jsonToken.sign({ id: user.id, username: user.username }, constants.SECRET_KEY);
        res.json({ token, username });  
      });
    }
  } catch (error) {
    console.log('Failed to connect User: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
  //Middleware to authenticate JWT token

export default loginComponent;