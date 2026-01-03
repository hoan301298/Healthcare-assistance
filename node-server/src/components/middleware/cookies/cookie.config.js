import { constants } from "../../../constant.js";

const isProd = constants.NODE_ENV === "prod";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProd, // set false only on localhost http
    sameSite: isProd ? "lax" : "strict",
    // path: "/",
    // domain: undefined, // domain register
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};