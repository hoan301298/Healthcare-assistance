const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
    }  
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        return res.json(user);
    });
};

module.exports = authenticateToken;