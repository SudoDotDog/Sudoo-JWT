/**
 * @author WMXPY
 * @namespace JWT
 * @description Declare
 */

export type JWTOptionalHeader = {

    readonly aud?: string;
    readonly exp?: number;
    readonly jti?: string;
    readonly iat?: number;
    readonly iss?: string;
    readonly nbf?: number;
    readonly sub?: string;
};

export type JWTFixedHeader = {

    readonly alg: 'RS256';
    readonly typ: 'JWT';
} & JWTOptionalHeader;

export type JWTJoinedHeader<Header extends Record<string, any>> = Header & JWTFixedHeader;

export type JWTCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly header: Header;
    readonly body: Body;

    readonly availableAt?: Date;
    readonly expirationAt?: Date;
    readonly issuedAt?: Date;

    readonly audience?: string;
    readonly identifier?: string;
    readonly issuer?: string;
    readonly subject?: string;
};

export type TokenTuple = [string, string, string];
