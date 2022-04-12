/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const base = require('./shared/webpack.base.config');

const {
    compose,
    webpack: { tsLoader, dev, sassLoader }
} = require('../../builders');

const bundlePaths = require('../../bundlePaths');

module.exports = compose(
    dev(),
    sassLoader(true, true, true),
    tsLoader(resolve(bundlePaths.external.generated.tsconfig.devSmartedit))
)(base);
