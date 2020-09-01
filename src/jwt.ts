/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { SignatureVerifier } from "@sudoo/token";
import { JWTCreateOptions, JWTFixedHeader, JWTJoinedHeader, JWTOptionalHeader, TokenTuple } from "./declare";
import { fixNowDate, fixUndefinableDate } from "./util";

export const deconstructJWT = (token: string): TokenTuple => {

    const tuple: TokenTuple = token.split('.') as TokenTuple;

    return tuple;
};

export const verifyTokenPatternByTuple = (tuple: TokenTuple): boolean => {

    if (tuple.length !== 3) {
        return false;
    }
    return true;
};

export const verifyTokenPatternByToken = (token: string): boolean => {

    const tuple: TokenTuple = deconstructJWT(token);
    return verifyTokenPatternByTuple(tuple);
};

export const verifyTokenSignatureByTuple = (tuple: TokenTuple, publicKey: string): boolean => {

    const serializedHeader: string = tuple[0];
    const serializedBody: string = tuple[1];
    const signature: string = tuple[2];

    const joinedContent: string = [
        serializedHeader,
        serializedBody,
    ].join('.');

    const signatureVerifier: SignatureVerifier = SignatureVerifier.instantiate(publicKey);

    return signatureVerifier.verify(joinedContent, signature);
};

export const verifyTokenSignatureByToken = (token: string, publicKey: string): boolean => {

    const tuple: TokenTuple = deconstructJWT(token);
    if (tuple.length !== 3) {
        return false;
    }

    return verifyTokenSignatureByTuple(tuple, publicKey);
};

export const extractJWTHeader = <Header extends Record<string, any>>(options: JWTCreateOptions<Header, any>): JWTJoinedHeader<Header> => {

    const optionalHeaders: JWTOptionalHeader = {

        aud: options.audience,
        exp: fixUndefinableDate(options.expirationAt),
        jti: options.identifier,
        iat: fixNowDate(options.issuedAt),
        iss: options.issuer,
        nbf: fixUndefinableDate(options.availableAt),
        sub: options.subject,
    };

    const keys: Array<keyof JWTOptionalHeader> = Object.keys(optionalHeaders) as Array<keyof JWTOptionalHeader>;
    const fixedHeaders: JWTFixedHeader = keys.reduce((previous: JWTFixedHeader, currentKey: keyof JWTOptionalHeader) => {

        if (typeof optionalHeaders[currentKey] !== 'undefined') {
            return {
                ...previous,
                [currentKey]: optionalHeaders[currentKey],
            };
        }
        return previous;
    }, {
        alg: 'RS256',
        typ: 'JWT',
    });

    return {
        ...fixedHeaders,
        ...options.header,
    };
};

export const extractJWTBody = <Body extends Record<string, any>>(options: JWTCreateOptions<any, Body>): Body => {

    return options.body;
};
