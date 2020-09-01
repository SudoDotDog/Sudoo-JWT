/**
 * @author WMXPY
 * @namespace JWT
 * @description Token
 */

import { deserializeObject } from "@sudoo/token";
import { JWTJoinedHeader, TokenTuple } from "./declare";
import { deconstructJWT, verifyTokenPatternByTuple, verifyTokenSignatureByTuple } from "./jwt";

export class JWTToken<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    public static createWithoutVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> | null {

        const tuple: TokenTuple = deconstructJWT(token);
        const surfaceVerifyResult: boolean = verifyTokenPatternByTuple(tuple);
        if (!surfaceVerifyResult) {
            return null;
        }

        return new JWTToken<Header, Body>(token);
    }

    public static createWithLocalVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string, publicKey: string): JWTToken<Header, Body> | null {

        const tuple: TokenTuple = deconstructJWT(token);
        const surfaceVerifyResult: boolean = verifyTokenPatternByTuple(tuple);
        if (!surfaceVerifyResult) {
            return null;
        }

        const localVerifyResult: boolean = verifyTokenSignatureByTuple(tuple, publicKey);
        if (!localVerifyResult) {
            return null;
        }

        return new JWTToken<Header, Body>(token);
    }

    private readonly _rawToken: string;
    private readonly _header: JWTJoinedHeader<Header>;
    private readonly _body: Body;
    private readonly _signature: string;

    private constructor(rawToken: string, tuple?: TokenTuple) {

        this._rawToken = rawToken;

        const confirmedTuple: TokenTuple = Array.isArray(tuple)
            ? tuple
            : deconstructJWT(rawToken);

        this._header = deserializeObject(confirmedTuple[0]);
        this._body = deserializeObject(confirmedTuple[1]);
        this._signature = confirmedTuple[2];
    }
}
