/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { SignatureVerifier } from "@sudoo/token";
import { JWTJoinedHeader } from "./declare";

export const deconstructJWT = (token: string): [string, string, string] => {

    const tuple: [string, string, string] = token.split('.') as [string, string, string];

    return tuple;
};

export const verifySurfaceTokenPattern = (token: string): boolean => {

    const tuple: [string, string, string] = deconstructJWT(token);
    if (tuple.length !== 3) {
        return false;
    }

    return true;
};

export const verifyTokenSignatureByTuple = (tuple: [string, string, string], publicKey: string): boolean => {

    const serializedHeader: string = tuple[0];
    const serializedBody: string = tuple[1];
    const signature: string = tuple[2];

    const joinedContent: string = [
        serializedHeader,
        serializedBody,
    ].join('.');

    const signatureVerifier: SignatureVerifier = SignatureVerifier.create(publicKey);

    return signatureVerifier.verify(joinedContent, signature);
};

export const verifyTokenSignatureByToken = (token: string, publicKey: string): boolean => {

    const tuple: [string, string, string] = deconstructJWT(token);
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
