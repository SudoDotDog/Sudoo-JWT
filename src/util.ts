/**
 * @author WMXPY
 * @namespace JWT
 * @description Util
 */

export const fixUndefinableDate = (target?: Date): number | undefined => {

    if (typeof target === 'undefined') {
        return undefined;
    }

    if (!target.getTime) {
        return undefined;
    }

    const time: number = target.getTime();

    if (isNaN(time)) {
        return undefined;
    }

    return time;
};

export const fixNowDate = (target?: Date): number => {

    if (typeof target === 'undefined') {
        return Date.now();
    }

    if (!target.getTime) {
        return Date.now();
    }

    const time: number = target.getTime();

    if (isNaN(time)) {
        return Date.now();
    }

    return time;
};
