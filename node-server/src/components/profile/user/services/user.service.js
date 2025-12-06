import jwt from "jsonwebtoken";
import User from "../../../../model/User.schema"
import { decrypt, encrypt, hashEmailForLookup, hashPassword, verifyPassword } from "../../../helper/cryptoFunctions"
import { constants } from "../../../../constant";

const loginService = async (email, password) => {
    const hashedEmail = hashEmailForLookup(email);
    const user = await User.findOne({ hashedEmail });

    if(!user) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    const isMatch = verifyPassword(password, user.password);
    if(!isMatch) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    const token = jwt.sign(
        { id: user._id },
        constants.SECRET_KEY,
        { expiresIn: "1d" }
    );

    return {
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: decrypt(user.encryptedEmail)
        },
        token,
    }
}

const registerService = async (userRequest) => {
    const hashedEmail = hashEmailForLookup(userRequest.email);
    let user = await User.findOne({ hashedEmail })

    if(user) {
        return {
            success: false,
            message: "Email has been used"
        };
    }

    const newUser = new User({
        name: userRequest.name,
        hashedEmail: hashedEmail,
        encryptedEmail: encrypt(userRequest.email),
        password: hashPassword(userRequest.password)
    })

    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id },
        constants.SECRET_KEY,
        { expiresIn: "1d" }
    )

    return {
        success: true,
        message: "Register successful",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: decrypt(newUser.encryptedEmail)
        },
        token,
    }
}

export {
    loginService,
    registerService
}