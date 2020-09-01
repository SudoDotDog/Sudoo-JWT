/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { SignatureVerifier } from "@sudoo/token";
import { JWTJoinedHeader, TokenTuple } from "./declare";

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

export const fixJWTHeader = <Header extends Record<string, any>>(header: Header): JWTJoinedHeader<Header> => {

    return {
        alg: 'RS256',
        typ: 'JWT',
        ...header,
    };
};
