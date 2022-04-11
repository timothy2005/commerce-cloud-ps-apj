/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */

/**
 * @ngdoc service
 * @name @smartutils.services:BooleanUtils
 *
 * @description
 * utility service around booleans.
 */
export class BooleanUtils {
    /**
     * @ngdoc method
     * @name @smartutils.services:BooleanUtils#areAllTruthy
     * @methodOf @smartutils.services:BooleanUtils
     * @description
     * Iterate on the given array of Functions, return true if each function returns true
     *
     * @param {Array} arguments the functions
     *
     * @return {Boolean} true if every function returns true
     */
    areAllTruthy(...functions: ((...args: any[]) => boolean)[]): (...args: any[]) => boolean {
        return function (): boolean {
            const args = arguments;
            return functions.every((f: any) => f && f.apply(f, args));
        };
    }
    /**
     * @ngdoc method
     * @name @smartutils.services:BooleanUtils#isAnyTruthy
     * @methodOf @smartutils.services:BooleanUtils
     *
     * @description
     * Iterate on the given array of Functions, return true if at least one function returns true
     *
     * @param {Array} arguments the functions
     *
     * @return {Boolean} true if at least one function returns true
     */
    isAnyTruthy(...functions: ((...args: any[]) => boolean)[]): (...args: any[]) => boolean {
        return function (): boolean {
            const args = arguments;
            return functions.some((f: any) => f && f.apply(f, args));
        };
    }
}

export const booleanUtils = new BooleanUtils();
