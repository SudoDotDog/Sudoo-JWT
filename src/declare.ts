/**
 * @author WMXPY
 * @namespace JWT
 * @description Declare
 */

import { OptionalVerbalHeaders } from "@sudoo/jwt-config";

export type JWTCreateOptions<Header extends Record<string, any> = any, Body extends Record<string, any> = any> = {

    readonly header: Header;
    readonly body: Body;
} & OptionalVerbalHeaders;
