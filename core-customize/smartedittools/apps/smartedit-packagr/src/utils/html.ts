/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { minify } = require('html-minifier');

const MINIFICATION_FLAGS = {
    collapseWhitespace: true,
    caseSensitive: true,
    keepClosingSlash: true,
    removeComments: true
};

/**
 * This function minifies the given HTML.
 *
 * Note:
 * - This function uses the html-minifier internally.
 *   Check the following URL for more information:
 *      https://github.com/kangax/html-minifier
 *
 *
 * @param html the html to minify. Cannot be null.
 *
 * @returns the html after being minified
 */
export const minifyHtml = (html: string = ''): string => {
    return minify(html, MINIFICATION_FLAGS);
};
