/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 */

import { JWTJoinedHeader } from "./declare";
import { fixJWTHeader } from "./jwt";

export class JWTCreator<Header extends Record<string, any>, Body extends Record<string, any>> {

    public static create<Header extends Record<string, any> = unknown, Body extends Record<string, any> = unknown>(privateKey: string): JWTCreator<Header, Body> {

        return new JWTCreator<Header, Body>(privateKey);
    }

    private readonly _privateKey: string;

    private constructor(privateKey: string) {

        this._privateKey = privateKey;
    }

    public create(header: Header, body: Body): void {

        const fixedHeader: JWTJoinedHeader<Header> = fixJWTHeader(header);
    }
}
