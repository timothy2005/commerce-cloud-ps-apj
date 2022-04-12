/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /*
     * generates angular.module('run').run(['$templateCache', function($templateCache) {}]) module
     * that contains template caches so that they become minifyable !!!
     */
    grunt.registerTask('multipleNGTemplates', function() {
        var conf = grunt.config.get('ngtemplates') || {};

        function failIfExists(dir) {
            if (conf[dir]) {
                grunt.fail.warn(
                    `multipleNGTemplates grunt task: Attempting to define a grunt target with an existing name in config: ${dir}`
                );
            }
        }

        function getSanitizedConfigKey(dir) {
            return dir.replace(/\//g, '-');
        }

        // read all subdirectories from your modules folder
        grunt.file
            .expand(
                {
                    filter: 'isDirectory'
                },
                'web/features/*'
            )
            .forEach(function(dir) {
                var key = getSanitizedConfigKey(dir);
                failIfExists(key);
                var folderName = dir.replace('web/features/', '');
                conf[key] = {
                    src: [dir + '/**/*Template.html'],
                    dest: 'jsTarget/' + dir + '/templates.js',
                    options: {
                        standalone: true, //to declare a module as opposed to binding to an existing one
                        module: folderName + 'Templates'
                    }
                };
                grunt.task.run('ngtemplates:' + key);
            });

        grunt.config.set('ngtemplates', conf);
    });
};
