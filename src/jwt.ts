/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { JWTJoinedHeader } from "./declare";

export const fixJWTHeader = <Header extends Record<string, any>>(header: Header): JWTJoinedHeader<Header> => {

    return {
        alg: 'RS256',
        typ: 'JWT',
        ...header,
    };
};
