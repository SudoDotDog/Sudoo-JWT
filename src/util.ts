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

export const getCurrentUnixTime = (): number => {

    return convertJSTimeToUnixTime(Date.now());
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
        return getCurrentUnixTime();
    }

    if (!target.getTime) {
        return getCurrentUnixTime();
    }

    const time: number = target.getTime();

    if (isNaN(time)) {
        return getCurrentUnixTime();
    }

    return convertJSTimeToUnixTime(time);
};
