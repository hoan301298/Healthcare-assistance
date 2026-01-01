import { constants } from "../../../constant.js";

const isProd = constants.PRODUCTION === true;

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProd, // set false only on localhost http
    sameSite: isProd ? "none" : "strict",
    path: "/",
    domain: isProd ? ".vercel.app" : undefined, // domain register
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};