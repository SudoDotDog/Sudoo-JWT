/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 */

import { formatEncryptedContentByContentStructure, formatTokenByStructure, JWTJoinedHeader } from "@sudoo/jwt-config";
import { serializeObject, SignatureCreator } from "@sudoo/token";
import { JWTCreateOptions } from "./declare";
import { extractJWTBody, extractJWTHeader } from "./jwt";

export class JWTCreator<Header extends Record<string, any> = any, Body extends Record<string, any> = any> {

    public static instantiate<Header extends Record<string, any> = any, Body extends Record<string, any> = any>(privateKey: string): JWTCreator<Header, Body> {

        return new JWTCreator<Header, Body>(privateKey);
    }

    private readonly _privateKey: string;

    private constructor(privateKey: string) {

        this._privateKey = privateKey;
    }

    public create(options: JWTCreateOptions<Header, Body>): string {

        const fixedHeader: JWTJoinedHeader<Header> = extractJWTHeader(options);
        const fixedBody: Body = extractJWTBody(options);

        const serializedHeader: string = serializeObject(fixedHeader);
        const serializedBody: string = serializeObject(fixedBody);

        const joinedContent: string = formatEncryptedContentByContentStructure({
            header: serializedHeader,
            body: serializedBody,
        });

        const signatureCreator: SignatureCreator = SignatureCreator.instantiate(this._privateKey);
        const signature: string = signatureCreator.sign(joinedContent);

        const jwtToken: string = formatTokenByStructure({
            header: serializedHeader,
            body: serializedBody,
            signature,
        });

        return jwtToken;
    }
}
