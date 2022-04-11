/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';
import { OuterAuthorizationMocks } from '../../utils/commonMockedModules/outerAuthorizationMock';
import { OuterConfigurationMocks } from '../../utils/commonMockedModules/outerConfigurationMock';
import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../utils/commonMockedModules/outerLanguagesMock';
import { OuterOtherMocks } from '../../utils/commonMockedModules/outerOtherMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../utils/commonMockedModules/outerPreviewMock';
import { OuterSitesMocks } from '../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';

@SeEntryModule('e2eBackendMocks')
@NgModule({
    imports: [
        OuterAuthorizationMocks,
        OuterWhoAmIMocks,
        OuterConfigurationMocks,
        i18nMocks,
        OuterLanguagesMocks,
        OuterOtherMocks,
        OuterPreviewMocks,
        OuterSitesMocks,
        E2eOnLoadingSetupModule,
        OuterPermissionMocks
    ],
    providers: [
        moduleUtils.provideValues({
            SMARTEDIT_ROOT: 'web/webroot',
            SMARTEDIT_RESOURCE_URI_REGEXP: /^(.*)\/apps\/smartedit-e2e\/generated\/e2e/,
            SMARTEDIT_INNER_FILES: [
                '/web/webroot/static-resources/thirdparties/blockumd/blockumd.js',
                '/apps/smartedit-e2e/node_modules/ckeditor4/ckeditor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/vendor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/base-inner-app.js'
            ],
            SMARTEDIT_INNER_FILES_POST: [
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/inner-app.js',
                '/web/webroot/static-resources/thirdparties/blockumd/unblockumd.js'
            ]
        }),
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                const map = [
                    {
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value: '"somepath"',
                        key: 'i18nAPIRoot'
                    }
                ];

                httpBackendService.whenGET(/configuration/).respond(function () {
                    return [200, map];
                });

                httpBackendService.whenGET(/cmswebservices\/sites$/).respond({
                    sites: []
                });

                httpBackendService.whenGET(/generated\_/).passThrough();

                httpBackendService.whenGET(/static-resources/).passThrough();
            },
            [HttpBackendService]
        )
    ]
})
export class E2eBackendMocksModule {}

window.pushModules(E2eBackendMocksModule);
