/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const base = require('smartedit-build/config/webpack/shared/webpack.bare.config');

const {
    compose,
    webpack: { alias, karma }
} = require('smartedit-build/builders');

module.exports = compose(
    karma({ instrument: false }),
    alias('smarteditcommons', resolve('src'))
)(base);
