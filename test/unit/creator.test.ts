/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 * @package Unit Test
 */

import { generateKeyPair, KeyPair } from '@sudoo/token';
import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTCreator } from '../../src';

describe('Given {JWTCreator} class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('jwt-creator');

    it('should be able to construct', (): void => {

        const keyPair: KeyPair = generateKeyPair();

        const creator: JWTCreator = JWTCreator.create(keyPair.private);

        expect(creator).to.be.instanceOf(JWTCreator);
    });
});
