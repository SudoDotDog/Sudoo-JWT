# Sudoo-JWT

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-JWT.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-JWT)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-JWT/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-JWT)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fjwt.svg)](https://www.npmjs.com/package/@sudoo/jwt)
[![downloads](https://img.shields.io/npm/dm/@sudoo/jwt.svg)](https://www.npmjs.com/package/@sudoo/jwt)

:clap: JWT generator verifier for Node

## Install

```sh
yarn add @sudoo/jwt
yarn add @sudoo/token @sudoo/jwt-config # Peer Dependency
# Or
npm install @sudoo/jwt --save
npm install @sudoo/token @sudoo/jwt-config --save # Peer Dependency
```

## Creator Usage

```ts
import { JWTCreator } from "@sudoo/jwt";

const creator: JWTCreator = JWTCreator.instantiate("<Private Key>");
const token: string = creator.create({
    header: {
        foo: 'bar',
    },
    body: {
        foo: 'bar',
    },
}); // Signed Token
```
