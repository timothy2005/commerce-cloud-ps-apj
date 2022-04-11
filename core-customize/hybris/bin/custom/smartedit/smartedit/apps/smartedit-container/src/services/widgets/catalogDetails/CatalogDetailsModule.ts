/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core';
import { TranslateModule } from '@ngx-translate/core';
import {
    CollapsibleContainerModule,
    CompileHtmlModule,
    ICatalogDetailsService,
    L10nPipeModule,
    SharedComponentsModule
} from 'smarteditcommons';
import { CatalogDetailsComponent } from './components/CatalogDetailsComponent';
import { CatalogHierarchyModalComponent } from './components/CatalogHierarchyModalComponent';
import { CatalogHierarchyNodeComponent } from './components/CatalogHierarchyNodeComponent';
import { CatalogHierarchyNodeMenuItemComponent } from './components/CatalogHierarchyNodeMenuItemComponent';
import { CatalogVersionDetailsComponent } from './components/CatalogVersionDetailsComponent';
import { CatalogVersionItemRendererComponent } from './components/CatalogVersionItemRendererComponent';
import { CatalogVersionsThumbnailCarouselComponent } from './components/CatalogVersionsThumbnailCarouselComponent';
import { HomePageLinkComponent } from './components/HomePageLinkComponent';
import { CatalogDetailsService } from './services/CatalogDetailsService';
import { CatalogNavigateToSite } from './services/CatalogNavigateToSite';

/**
 * This module contains the {@link CatalogDetailsModule.component:catalogVersionDetails} component.
 */
@NgModule({
    imports: [
        CommonModule,
        CollapsibleContainerModule,
        CompileHtmlModule,
        L10nPipeModule,
        SharedComponentsModule,
        IconModule,
        TranslateModule.forChild()
    ],
    providers: [
        { provide: ICatalogDetailsService, useClass: CatalogDetailsService },
        CatalogNavigateToSite
    ],
    declarations: [
        HomePageLinkComponent,
        CatalogDetailsComponent,
        CatalogVersionDetailsComponent,
        CatalogVersionsThumbnailCarouselComponent,
        CatalogVersionItemRendererComponent,
        CatalogHierarchyModalComponent,
        CatalogHierarchyNodeComponent,
        CatalogHierarchyNodeMenuItemComponent
    ],
    entryComponents: [
        CatalogVersionsThumbnailCarouselComponent,
        CatalogVersionDetailsComponent,
        HomePageLinkComponent,
        CatalogDetailsComponent,
        CatalogVersionItemRendererComponent,
        CatalogHierarchyModalComponent,
        CatalogHierarchyNodeComponent,
        CatalogHierarchyNodeMenuItemComponent
    ],
    exports: [CatalogDetailsComponent]
})
export class CatalogDetailsModule {}
