/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('../../smartedit-build/config/webpack/shared/webpack.bare.config');

const {
    compose,
    webpack: { prod }
} = require('../../smartedit-build/builders');

const { commons } = require('./webpack.shared.config');

module.exports = compose(
    prod(),
    commons()
)(base);
