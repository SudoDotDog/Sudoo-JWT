/**
 * @author WMXPY
 * @namespace JWT
 * @description Declare
 */

export type JWTFixedHeader = {

    readonly alg: 'RS256';
    readonly typ: 'JWT';
};

export type JWTCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly header: Header;
    readonly body: Body;
};

export type JWTFixedCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {
} & JWTCreateOptions<Header, Body>;

export type JWTJoinedHeader<Header extends Record<string, any>> = Header & JWTFixedHeader;

export type TokenTuple = [string, string, string];
