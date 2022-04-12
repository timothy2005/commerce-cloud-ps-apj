/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        targets: ['files'],
        config: function(data, conf) {
            conf.files = ['web/features/**/*.ts', 'jsTests/**/*.ts'];

            return conf;
        }
    };
};
