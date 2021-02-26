/**
 * @author WMXPY
 * @namespace JWT
 * @description Token
 */

import { deserializeObject } from "@sudoo/token";
import { JWTJoinedHeader, TokenTuple } from "./declare";
import { deconstructJWT, verifyTokenPatternByTuple, verifyTokenSignatureByTuple } from "./jwt";
import { fixUndefinableDate } from "./util";

export class JWTToken<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public static fromToken<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> | null {

        const tuple: TokenTuple = deconstructJWT(token);

        const surfaceVerifyResult: boolean = verifyTokenPatternByTuple(tuple);
        if (!surfaceVerifyResult) {
            return null;
        }

        return new JWTToken<Header, Body>(token);
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public static fromTokenThrowable<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> {

        const tuple: TokenTuple = deconstructJWT(token);

        const surfaceVerifyResult: boolean = verifyTokenPatternByTuple(tuple);
        if (!surfaceVerifyResult) {
            throw new Error("[Sudoo-JWT] Invalid Token");
        }

        return new JWTToken<Header, Body>(token);
    }

    private readonly _rawToken: string;
    private readonly _tuple: TokenTuple;
    private readonly _header: JWTJoinedHeader<Header>;
    private readonly _body: Body;
    private readonly _signature: string;

    private constructor(rawToken: string, tuple?: TokenTuple) {

        this._rawToken = rawToken;

        const confirmedTuple: TokenTuple = Array.isArray(tuple)
            ? tuple
            : deconstructJWT(rawToken);

        this._tuple = confirmedTuple;

        this._header = deserializeObject(confirmedTuple[0]);
        this._body = deserializeObject(confirmedTuple[1]);
        this._signature = confirmedTuple[2];
    }

    public verifySignature(publicKey: string): boolean {

        const localVerifyResult: boolean = verifyTokenSignatureByTuple(
            this._tuple,
            publicKey,
        );
        return localVerifyResult;
    }

    public verifyExpiration(currentTime: Date = new Date()): boolean {

        if (typeof this._header.exp === 'undefined'
            || this._header.exp === null) {
            return true;
        }
        if (typeof this._header.exp !== 'number') {
            return false;
        }

        const fixedDate: number | undefined = fixUndefinableDate(currentTime);
        if (typeof fixedDate !== 'number') {
            return false;
        }
        return fixedDate < this._header.exp;
    }

    public get rawToken(): string {
        return this._rawToken;
    }
    public get tuple(): TokenTuple {
        return this._tuple;
    }
    public get header(): JWTJoinedHeader<Header> {
        return this._header;
    }
    public get body(): Body {
        return this._body;
    }
    public get signature(): string {
        return this._signature;
    }
}
