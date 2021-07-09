# Sudoo-JWT

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-JWT/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-JWT/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-JWT/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-JWT)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fjwt.svg)](https://www.npmjs.com/package/@sudoo/jwt)
[![downloads](https://img.shields.io/npm/dm/@sudoo/jwt.svg)](https://www.npmjs.com/package/@sudoo/jwt)

JWT generator verifier for Node

## Install

```sh
yarn add @sudoo/jwt
yarn add @sudoo/token # Peer Dependency
# Or
npm install @sudoo/jwt --save
npm install @sudoo/token --save # Peer Dependency
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
