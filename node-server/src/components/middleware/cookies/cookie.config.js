import { constants } from "../../../constant.js";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: constants.PRODUCTION === true, // set false only on localhost http
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};