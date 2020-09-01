/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 */

import { serializeObject, SignatureCreator } from "@sudoo/token";
import { JWTJoinedHeader } from "./declare";
import { fixJWTHeader } from "./jwt";

export class JWTCreator<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    public static instantiate<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(privateKey: string): JWTCreator<Header, Body> {

        return new JWTCreator<Header, Body>(privateKey);
    }

    private readonly _privateKey: string;

    private constructor(privateKey: string) {

        this._privateKey = privateKey;
    }

    public create(header: Header, body: Body): string {

        const fixedHeader: JWTJoinedHeader<Header> = fixJWTHeader(header);

        const serializedHeader: string = serializeObject(fixedHeader);
        const serializedBody: string = serializeObject(body);

        const joinedContent: string = [
            serializedHeader,
            serializedBody,
        ].join('.');

        const signatureCreator: SignatureCreator = SignatureCreator.instantiate(this._privateKey);
        const signature: string = signatureCreator.sign(joinedContent);

        const jwtToken: string = [
            serializedHeader,
            serializedBody,
            signature,
        ].join('.');

        return jwtToken;
    }
}
