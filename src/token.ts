/**
 * @author WMXPY
 * @namespace JWT
 * @description Token
 */

export class JWTToken<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    public static createWithoutVerify<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(token: string): JWTToken<Header, Body> {

        return new JWTToken<Header, Body>(token);
    }

    private readonly _rawToken: string;

    private constructor(rawToken: string) {

        this._rawToken = rawToken;
    }
}
