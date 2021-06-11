/**
 * @author WMXPY
 * @namespace JWT
 * @description Declare
 */

export type JWTOptionalHeader = {

    readonly aud?: string; // Audience
    readonly exp?: number; // Expiration Time
    readonly jti?: string; // JWT ID
    readonly iat?: number; // Issued At
    readonly iss?: string; // Issuer
    readonly nbf?: number; // Not Before
    readonly sub?: string; // Subject
    readonly ver?: string; // Version
};

export type OptionalVerbalHeaders = {

    readonly availableAt?: Date;
    readonly expirationAt?: Date;
    readonly issuedAt?: Date;

    readonly audience?: string;
    readonly identifier?: string;
    readonly issuer?: string;
    readonly subject?: string;
    readonly version?: string;
};

export type JWTFixedHeader = {

    readonly alg: 'RS256';
    readonly typ: 'JWT';
} & JWTOptionalHeader;

export type JWTJoinedHeader<Header extends Record<string, any>> = Header & JWTFixedHeader;

export type JWTCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly header: Header;
    readonly body: Body;
} & OptionalVerbalHeaders;

export type TokenTuple = [string, string, string];
