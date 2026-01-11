import { constants } from "../../../constant.js";

const isProd = constants.NODE_ENV === "prod";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "lax" : "strict",
    maxAge: 24 * 60 * 60 * 1000
};