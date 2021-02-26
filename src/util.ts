/**
 * @author WMXPY
 * @namespace JWT
 * @description Util
 */

export const convertJSTimeToUnixTime = (jsTime: number): number => {

    const draftTime: number = jsTime / 1000;
    const roundedTime: number = Math.floor(draftTime);

    return roundedTime;
};

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

    return convertJSTimeToUnixTime(time);
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

    return convertJSTimeToUnixTime(time);
};
