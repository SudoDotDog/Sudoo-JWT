/**
 * @author WMXPY
 * @namespace JWT
 * @description JWT
 */

import { deconstructJWTEnsure, extractJWTFixedHeader, formatEncryptedContentByContentStructure, JWTFixedHeader, JWTJoinedHeader, TokenTuple, verifyTokenPatternByTuple } from "@sudoo/jwt-config";
import { SignatureVerifier } from "@sudoo/token";
import { JWTCreateOptions } from "./declare";

export const verifyTokenPatternByToken = (token: string): boolean => {

    const tuple: TokenTuple = deconstructJWTEnsure(token);
    return verifyTokenPatternByTuple(tuple);
};

export const verifyTokenSignatureByTuple = (tuple: TokenTuple, publicKey: string): boolean => {

    const serializedHeader: string = tuple[0];
    const serializedBody: string = tuple[1];
    const signature: string = tuple[2];

    const joinedContent: string = formatEncryptedContentByContentStructure({
        header: serializedHeader,
        body: serializedBody,
    });

    const signatureVerifier: SignatureVerifier = SignatureVerifier.instantiate(publicKey);

    return signatureVerifier.verify(joinedContent, signature);
};

export const verifyTokenSignatureByToken = (token: string, publicKey: string): boolean => {

    const tuple: TokenTuple = deconstructJWTEnsure(token);
    if (tuple.length !== 3) {
        return false;
    }

    return verifyTokenSignatureByTuple(tuple, publicKey);
};

export const extractJWTHeader = <Header extends Record<string, any>>(options: JWTCreateOptions<Header, any>): JWTJoinedHeader<Header> => {

    const fixedHeaders: JWTFixedHeader = extractJWTFixedHeader(options);

    return {
        ...fixedHeaders,
        ...options.header,
    };
};

export const extractJWTBody = <Body extends Record<string, any>>(options: JWTCreateOptions<any, Body>): Body => {

    return options.body;
};
