import jsonToken from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { constants } from '../../../../constant.js';
import User from '../../../../model/User.schema.js';
import { hashEmailForLookup } from '../../helper/auth/cryptoFunctions.js';

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(500).json({ message: "Fields are missing" })
 
  const hashedEmail = hashEmailForLookup(email);

  try {
    const user = await User.findOne({ hashedEmail: hashedEmail });

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

export default loginController;