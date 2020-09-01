/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { JWTJoinedHeader } from "./declare";

export const verifySurfacePattern = (token: string): boolean => {

    const tuple: [string, string, string] = token.split('.') as [string, string, string];
    if (tuple.length !== 3) {
        return false;
    }

    return true;
};

export const fixJWTHeader = <Header extends Record<string, any>>(header: Header): JWTJoinedHeader<Header> => {

    return {
        alg: 'RS256',
        typ: 'JWT',
        ...header,
    };
};
