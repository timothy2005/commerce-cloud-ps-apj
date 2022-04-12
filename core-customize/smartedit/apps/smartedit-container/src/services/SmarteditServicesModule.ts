/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import {
    moduleUtils,
    DragAndDropServiceModule,
    IAnnouncementService,
    ICatalogVersionPermissionService,
    IDragAndDropCrossOrigin,
    IFeatureService,
    INotificationMouseLeaveDetectionService,
    INotificationService,
    IPageInfoService,
    IPermissionService,
    IPerspectiveService,
    IPreviewService,
    IRenderService,
    IWaitDialogService,
    RestServiceFactory,
    SmarteditCommonsModule,
    SmarteditRoutingService,
    IRestServiceFactory
} from 'smarteditcommons';
import { AnnouncementService } from './announcement/AnnouncementServiceOuter';
import { BootstrapService } from './bootstrap/BootstrapService';
import { ConfigurationExtractorService } from './bootstrap/ConfigurationExtractorService';
import { CatalogVersionPermissionRestService } from './CatalogVersionPermissionRestService';
import { CatalogVersionPermissionService } from './catalogVersionPermissionServiceOuter';
import { ConfigurationModalService } from './ConfigurationModalService';
import { ConfigurationService } from './ConfigurationService';
import { DelegateRestService } from './DelegateRestServiceOuter';
import { DragAndDropCrossOrigin } from './DragAndDropCrossOriginOuter';
import { StorefrontPageGuard } from './guards/StorefrontPageGuard';
import { HeartBeatService } from './HeartBeatService';
import { NotificationMouseLeaveDetectionService } from './notifications/NotificationMouseLeaveDetectionServiceOuter';
import { NotificationService } from './notifications/NotificationServiceOuter';
import { PageInfoService } from './PageInfoServiceOuter';
import { PermissionService } from './PermissionServiceOuter';
import { PermissionsRegistrationService } from './PermissionsRegistrationService';
import { FeatureService } from './perspectives/FeatureServiceOuter';
import { PerspectiveService } from './perspectives/PerspectiveServiceOuter';
import { PreviewDatalanguageDropdownPopulator } from './PreviewDatalanguageDropdownPopulator';
import { PreviewDatapreviewCatalogDropdownPopulator } from './PreviewDatapreviewCatalogDropdownPopulator';
import { PreviewService } from './PreviewServiceOuter';
import { ProductService } from './ProductService';
import { RenderService } from './RenderServiceOuter';
import { CatalogAwareRouteResolverHelper } from './resolvers/CatalogAwareRouteResolverHelper';
import { WaitDialogService } from './WaitDialogServiceOuter';

@NgModule({
    imports: [DragAndDropServiceModule, SmarteditCommonsModule],
    providers: [
        HeartBeatService,
        BootstrapService,
        ConfigurationExtractorService,
        DelegateRestService,
        RestServiceFactory,
        ConfigurationService,
        ConfigurationModalService,
        PreviewDatalanguageDropdownPopulator,
        PreviewDatapreviewCatalogDropdownPopulator,
        CatalogVersionPermissionRestService,
        CatalogVersionPermissionService,
        CatalogAwareRouteResolverHelper,
        StorefrontPageGuard,
        SmarteditRoutingService,
        {
            provide: ICatalogVersionPermissionService,
            useClass: CatalogVersionPermissionService
        },
        { provide: IPermissionService, useClass: PermissionService },
        { provide: IPageInfoService, useClass: PageInfoService },
        {
            provide: IRestServiceFactory,
            useClass: RestServiceFactory
        },
        {
            provide: IRenderService,
            useClass: RenderService
        },
        {
            provide: IAnnouncementService,
            useClass: AnnouncementService
        },
        {
            provide: IPerspectiveService,
            useClass: PerspectiveService
        },
        {
            provide: IFeatureService,
            useClass: FeatureService
        },
        {
            provide: INotificationMouseLeaveDetectionService,
            useClass: NotificationMouseLeaveDetectionService
        },
        {
            provide: IWaitDialogService,
            useClass: WaitDialogService
        },
        {
            provide: IPreviewService,
            useClass: PreviewService
        },
        {
            provide: IDragAndDropCrossOrigin,
            useClass: DragAndDropCrossOrigin
        },
        PermissionsRegistrationService,
        {
            provide: INotificationService,
            useClass: NotificationService
        },
        ProductService,
        moduleUtils.initialize(
            (previewService: IPreviewService) => {
                //
            },
            [IPreviewService]
        )
    ]
})
export class SmarteditServicesModule {}
