/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTCreator } from '../../src';
import { MockKeyPairGenerator } from '../mock/generate';

describe('Given {JWTCreator} class', (): void => {

    const chance: Chance.Chance = new Chance('jwt-creator');

    let keyPair: MockKeyPairGenerator;

    before(() => {
        keyPair = MockKeyPairGenerator.getInstance();
    });

    it('should be able to construct', (): void => {

        const creator: JWTCreator = JWTCreator.instantiate(keyPair.singleLinePrivate);

        expect(creator).to.be.instanceOf(JWTCreator);
    });

    it('should be able to create token', (): void => {

        const creator: JWTCreator = JWTCreator.instantiate(keyPair.singleLinePrivate);

        const token: string = creator.create({

            header: {
                foo: chance.string(),
            },
            body: {
                bar: chance.string(),
            },
        });

        console.log(token);
        expect(typeof token).to.be.equal('string');
    });
});
