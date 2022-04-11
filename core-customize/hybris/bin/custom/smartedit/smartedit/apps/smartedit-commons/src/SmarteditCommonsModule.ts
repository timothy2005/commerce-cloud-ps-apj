/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { InjectionToken, Injector, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    booleanUtils,
    retriableErrorPredicate,
    timeoutErrorPredicate,
    updatePredicate,
    BooleanUtils,
    BrowserService,
    CachedAnnotationFactory,
    CacheConfigAnnotationFactory,
    CacheEngine,
    CacheService,
    Class,
    CloneableUtils,
    CryptographicUtils,
    DefaultRetryStrategy,
    ExponentialRetryStrategy,
    EVENT_SERVICE,
    FingerPrintingService,
    FunctionsUtils,
    HttpBackendService,
    HttpErrorInterceptorService,
    HttpUtils,
    I18N_RESOURCE_URI_TOKEN,
    InvalidateCacheAnnotationFactory,
    IModalService,
    IRetryStrategy,
    ISettingsService,
    LinearRetryStrategy,
    LoginDialogResourceProvider,
    LogService,
    LANGUAGE_SERVICE,
    LANGUAGE_SERVICE_CONSTANTS,
    OperationContextAnnotationFactory,
    OperationContextService,
    OPERATION_CONTEXT_TOKEN,
    PromiseUtils,
    RestServiceFactory,
    RetryInterceptor,
    StringUtils as ParentStringUtils,
    TESTMODESERVICE,
    UrlUtils,
    WindowUtils as ParentWindowUtils,
    WHO_AM_I_RESOURCE_URI_TOKEN
} from '@smart/utils';
import {
    operationContextCMSPredicate,
    operationContextInteractivePredicate,
    operationContextNonInteractivePredicate,
    operationContextToolingPredicate,
    AngularJSBootstrapIndicatorService,
    AngularJSLazyDependenciesService,
    AuthorizationService,
    CrossFrameEventService,
    CrossFrameEventServiceGateway,
    GatewayFactory,
    GatewayProxiedAnnotationFactory,
    GatewayProxy,
    InterceptorHelper,
    ITemplateCacheService,
    PermissionsRestService,
    SmarteditBootstrapGateway,
    TestModeService,
    WizardModule,
    YjqueryModule
} from 'smarteditcommons/services';
import { ExperienceInterceptor } from 'smarteditcommons/services/interceptors/ExperienceInterceptor';
import {
    moduleUtils,
    DiscardablePromiseUtils,
    I18N_RESOURCE_URI,
    NodeUtils,
    OPERATION_CONTEXT,
    StringUtils,
    SMARTEDIT_INNER_FILES,
    SMARTEDIT_INNER_FILES_POST,
    SMARTEDIT_RESOURCE_URI_REGEXP,
    SMARTEDIT_ROOT,
    SSO_AUTHENTICATION_ENTRY_POINT,
    SSO_LOGOUT_ENTRY_POINT,
    SSO_OAUTH2_AUTHENTICATION_ENTRY_POINT,
    WindowUtils,
    WHO_AM_I_RESOURCE_URI
} from 'smarteditcommons/utils';
import { SeGenericEditorModule } from './components/genericEditor';
import { SliderPanelServiceFactory } from './components/sliderPanel';
import { diBridgeUtils } from './di';
import { FundamentalsModule } from './FundamentalsModule';
import {
    IUIBootstrapModalService,
    IUIBootstrapModalStackService,
    JQueryUtilsService,
    LanguageService,
    LanguageServiceGateway,
    ModalService,
    SettingsService,
    TimerService,
    FileReaderService,
    FileMimeTypeService,
    FileValidationService,
    FileValidatorFactory,
    FILE_VALIDATION_CONFIG
} from './services';
import { IAnimateService } from './services/interfaces/IAnimateService';
import { PriorityService } from './services/PriorityService';
import { SystemEventService } from './services/SystemEventService';
import { SmarteditConstantsModule } from './SmarteditConstantsModule';
import {
    I18N_LANGUAGES_RESOURCE_URI,
    LANGUAGE_RESOURCE_URI,
    SMARTEDIT_LOGIN_DIALOG_RESOURCES
} from './utils';

import './directives/ngHrefDirective';

const gatewayProxiedAnnotationFactoryToken = new InjectionToken<string>(
    'gatewayProxiedAnnotationFactoryToKen'
);
const cachedAnnotationFactoryToken = new InjectionToken<string>('cachedAnnotationFactoryToken');
const cacheConfigAnnotationFactoryToken = new InjectionToken<string>(
    'cacheConfigAnnotationFactoryToken'
);
const invalidateCacheAnnotationFactoryToken = new InjectionToken<string>(
    'invalidateCacheAnnotationFactoryToken'
);
const operationContextAnnotationFactoryToken = new InjectionToken<string>(
    'operationContextAnnotationFactoryToken'
);

/**
 * Module containing all the services shared within the smartedit commons.
 */
@NgModule({
    imports: [
        FundamentalsModule,
        LocationUpgradeModule.config(),
        YjqueryModule,
        SeGenericEditorModule,
        WizardModule,
        SmarteditConstantsModule
    ],
    providers: [
        diBridgeUtils.upgradeProvider('$animate', IAnimateService),
        diBridgeUtils.upgradeProvider('$uibModal', IUIBootstrapModalService),
        diBridgeUtils.upgradeProvider('$uibModalStack', IUIBootstrapModalStackService),
        diBridgeUtils.upgradeProvider('$templateCache', ITemplateCacheService),
        SmarteditBootstrapGateway,
        AngularJSLazyDependenciesService,
        AngularJSBootstrapIndicatorService,
        LanguageServiceGateway,
        LanguageService,
        {
            provide: LANGUAGE_SERVICE,
            useClass: LanguageService
        },
        TimerService,
        DiscardablePromiseUtils,
        moduleUtils.provideValues({
            SSO_LOGOUT_ENTRY_POINT,
            SSO_AUTHENTICATION_ENTRY_POINT,
            SSO_OAUTH2_AUTHENTICATION_ENTRY_POINT,
            SMARTEDIT_RESOURCE_URI_REGEXP,
            SMARTEDIT_ROOT,
            SMARTEDIT_INNER_FILES,
            SMARTEDIT_INNER_FILES_POST,
            [OPERATION_CONTEXT_TOKEN]: OPERATION_CONTEXT,
            [WHO_AM_I_RESOURCE_URI_TOKEN]: WHO_AM_I_RESOURCE_URI,
            [I18N_RESOURCE_URI_TOKEN]: I18N_RESOURCE_URI
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExperienceInterceptor,
            multi: true
        },
        { provide: IModalService, useClass: ModalService },
        { provide: ISettingsService, useClass: SettingsService },
        SliderPanelServiceFactory,
        LogService,
        BrowserService,
        FingerPrintingService,
        CacheEngine,
        CacheService,
        CloneableUtils,
        CrossFrameEventService,
        /* forbiddenNameSpaces:false */
        {
            provide: LoginDialogResourceProvider,
            useValue: SMARTEDIT_LOGIN_DIALOG_RESOURCES
        },
        {
            provide: LANGUAGE_SERVICE_CONSTANTS,
            useValue: {
                LANGUAGE_RESOURCE_URI,
                I18N_LANGUAGES_RESOURCE_URI
            }
        },
        {
            provide: EVENT_SERVICE,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            useFactory: (crossFrameEventService: CrossFrameEventService) => crossFrameEventService,
            deps: [CrossFrameEventService]
        },
        {
            provide: CrossFrameEventServiceGateway.crossFrameEventServiceGatewayToken,
            useClass: CrossFrameEventServiceGateway
        },
        OperationContextService,
        BooleanUtils,
        CryptographicUtils,
        FunctionsUtils,
        HttpUtils,
        NodeUtils,
        PromiseUtils,
        JQueryUtilsService,
        {
            provide: ParentStringUtils,
            useClass: StringUtils
        },
        StringUtils,
        UrlUtils,
        {
            provide: ParentWindowUtils,
            useClass: WindowUtils
        },
        WindowUtils,
        SystemEventService,
        PriorityService,
        TestModeService,
        {
            provide: TESTMODESERVICE,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            useFactory: (testModeService: TestModeService) => testModeService,
            deps: [TestModeService]
        },
        GatewayFactory,
        GatewayProxy,
        InterceptorHelper,
        {
            provide: gatewayProxiedAnnotationFactoryToken,
            useFactory: GatewayProxiedAnnotationFactory,
            deps: [GatewayProxy]
        },
        {
            provide: cachedAnnotationFactoryToken,
            useFactory: CachedAnnotationFactory,
            deps: [CacheService]
        },
        {
            provide: cacheConfigAnnotationFactoryToken,
            useFactory: CacheConfigAnnotationFactory,
            deps: [LogService]
        },
        {
            provide: invalidateCacheAnnotationFactoryToken,
            useFactory: InvalidateCacheAnnotationFactory,
            deps: [CacheService]
        },
        {
            provide: operationContextAnnotationFactoryToken,
            useFactory: OperationContextAnnotationFactory,
            deps: [Injector, OperationContextService, OPERATION_CONTEXT_TOKEN]
        },
        RestServiceFactory,
        PermissionsRestService,
        AuthorizationService,
        FileMimeTypeService,
        FileReaderService,
        FileValidationService,
        FileValidatorFactory,
        // TODO: remove when all consumers in cmssmartedit has replaced DI with import
        {
            provide: 'seFileValidationServiceConstants',
            useValue: FILE_VALIDATION_CONFIG
        },
        moduleUtils.initialize(
            (
                gatewayProxiedAnnotationFactory: any,
                cachedAnnotationFactory: any,
                cacheConfigAnnotationFactory: any,
                invalidateCacheAnnotationFactory: any,
                operationContextAnnotationFactory: any
            ) => {
                diBridgeUtils.downgradeService('translateService', TranslateService);
                diBridgeUtils.downgradeService('browserService', BrowserService);
                diBridgeUtils.downgradeService('httpBackendService', HttpBackendService);
                diBridgeUtils.downgradeService('operationContextService', OperationContextService);
                diBridgeUtils.downgradeService('retryInterceptor', RetryInterceptor);
                diBridgeUtils.downgradeService(
                    'httpErrorInterceptorService',
                    HttpErrorInterceptorService
                );
                diBridgeUtils.downgradeService('fileMimeTypeService', FileMimeTypeService);
                diBridgeUtils.downgradeService('fileReaderService', FileReaderService);
                diBridgeUtils.downgradeService('fileValidationService', FileValidationService);
                diBridgeUtils.downgradeService('fileValidatorFactory', FileValidatorFactory);
                // TODO: remove when all consumers in cmssmartedit has replaced DI with import
                diBridgeUtils.downgradeService(
                    'seFileValidationServiceConstants',
                    null,
                    'seFileValidationServiceConstants'
                );
            },
            [
                gatewayProxiedAnnotationFactoryToken,
                cachedAnnotationFactoryToken,
                cacheConfigAnnotationFactoryToken,
                invalidateCacheAnnotationFactoryToken,
                operationContextAnnotationFactoryToken
            ]
        ),
        moduleUtils.bootstrap(
            (
                retryInterceptor: RetryInterceptor,
                defaultRetryStrategy: Class<IRetryStrategy>,
                exponentialRetryStrategy: Class<IRetryStrategy>,
                linearRetryStrategy: Class<IRetryStrategy>,
                operationContextService: OperationContextService
            ) => {
                retryInterceptor
                    .register(
                        booleanUtils.areAllTruthy(
                            operationContextInteractivePredicate,
                            retriableErrorPredicate
                        ),
                        defaultRetryStrategy
                    )
                    .register(
                        booleanUtils.areAllTruthy(
                            operationContextNonInteractivePredicate,
                            retriableErrorPredicate
                        ),
                        exponentialRetryStrategy
                    )
                    .register(
                        booleanUtils.areAllTruthy(
                            operationContextCMSPredicate,
                            timeoutErrorPredicate,
                            updatePredicate
                        ),
                        exponentialRetryStrategy
                    )
                    .register(
                        booleanUtils.areAllTruthy(
                            operationContextToolingPredicate,
                            timeoutErrorPredicate,
                            updatePredicate
                        ),
                        linearRetryStrategy
                    );
                operationContextService.register(LANGUAGE_RESOURCE_URI, OPERATION_CONTEXT.TOOLING);
            },
            [
                RetryInterceptor,
                DefaultRetryStrategy,
                ExponentialRetryStrategy,
                LinearRetryStrategy,
                OperationContextService,
                LogService
            ]
        )
    ]
})
export class SmarteditCommonsModule {}
