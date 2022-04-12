/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('smartedit-build/config/karma/karma.ext.smarteditContainer.conf');
const lodash = require('lodash');

const bundlePaths = require('smartedit-build/bundlePaths');
const { compose, merge } = require('smartedit-build/builders');

module.exports = compose(
    merge({
        // list of files / patterns to load in the browser
        // each file acts as entry point for the webpack configuration
        files: lodash.concat(
            bundlePaths.test.unit.commonUtilModules,
            'src/**/*.js',
            '.temp/templates.js',
            'tests/specBundle.ts'
        ),

        webpack: require('./webpack.config.spec'),
    })
)(base);
