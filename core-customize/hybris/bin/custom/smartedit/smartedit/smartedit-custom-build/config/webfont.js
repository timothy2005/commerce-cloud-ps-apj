/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function() {
    return {
        targets: ['webfont'],
        config: function(data, conf) {
            const paths = require('../paths');
            return {
                webfont: {
                    expand: true,
                    src: paths.webfont.src,
                    dest: paths.webfont.dest,
                    destLess: paths.webfont.destLess,
                    options: {
                        font: 'hyicon',
                        types: 'eot,svg,ttf,woff2,woff',
                        stylesheets: ['less'],
                        engine: 'node',
                        normalize: true,
                        hashes: false,
                        embed: true,
                        autoHint: false,
                        templateOptions: {
                            baseClass: 'hyicon',
                            classPrefix: 'hyicon-'
                        },
                        relativeFontPath: paths.webfont.webrootFontPath
                    }
                }
            };
        }
    };
};
