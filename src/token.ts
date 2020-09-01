/**
 * @author WMXPY
 * @namespace JWT
 * @description Token
 */

import { verifySurfaceTokenPattern } from "./jwt";

export class JWTToken<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    public static createWithoutVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> | null {

        const surfaceVerifyResult: boolean = verifySurfaceTokenPattern(token);
        if (!surfaceVerifyResult) {
            return null;
        }

        return new JWTToken<Header, Body>(token);
    }

    public static createWithPatternVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> | null {

        const surfaceVerifyResult: boolean = verifySurfaceTokenPattern(token);
        if (!surfaceVerifyResult) {
            throw new Error('[Sudoo-JWT] Invalid JWT Token');
        }

        return new JWTToken<Header, Body>(token);
    }

    public static createWithLocalVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> | null {

        const surfaceVerifyResult: boolean = verifySurfaceTokenPattern(token);
        if (!surfaceVerifyResult) {
            throw new Error('[Sudoo-JWT] Invalid JWT Token');
        }

        return new JWTToken<Header, Body>(token);
    }

    private readonly _rawToken: string;

    private constructor(rawToken: string) {

        this._rawToken = rawToken;
    }
}
