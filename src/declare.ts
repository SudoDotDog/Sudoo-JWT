/**
 * @author WMXPY
 * @namespace JWT
 * @description Declare
 */

export type JWTFixedHeader = {

    readonly alg: 'RS256';
    readonly typ: 'JWT';
};

export type JWTJoinedHeader<Header extends Record<string, any>> = Header & JWTFixedHeader;
