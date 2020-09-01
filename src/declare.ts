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

export type JWTCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly header: Header;
    readonly body: Body;

    readonly availableAt?: Date;
    readonly expirationAt?: Date;
    readonly issuedAt?: Date;

    readonly audience?: string;
    readonly issuer?: string;
    readonly subject?: string;
};

export type JWTFixedCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly issuedAt: Date;
} & JWTCreateOptions<Header, Body>;

export type TokenTuple = [string, string, string];
