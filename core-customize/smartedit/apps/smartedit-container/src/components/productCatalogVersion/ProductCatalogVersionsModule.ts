/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    moduleUtils,
    EditorFieldMappingService,
    L10nPipeModule,
    SelectModule,
    TooltipModule,
    TranslationModule
} from 'smarteditcommons';

import { MultiProductCatalogVersionConfigurationComponent } from './multiProductCatalogVersionConfiguration';
import { MultiProductCatalogVersionSelectorComponent } from './multiProductCatalogVersionSelector';
import { ProductCatalogVersionsSelectorComponent } from './productCatalogVersionsSelector';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        L10nPipeModule,
        TranslationModule.forChild(),
        SelectModule,
        TooltipModule
    ],
    declarations: [
        ProductCatalogVersionsSelectorComponent,
        MultiProductCatalogVersionConfigurationComponent,
        MultiProductCatalogVersionSelectorComponent
    ],
    entryComponents: [
        ProductCatalogVersionsSelectorComponent,
        MultiProductCatalogVersionConfigurationComponent,
        MultiProductCatalogVersionSelectorComponent
    ],
    providers: [
        moduleUtils.initialize(
            (editorFieldMappingService: EditorFieldMappingService) => {
                editorFieldMappingService.addFieldMapping(
                    'ProductCatalogVersionsSelector',
                    null,
                    null,
                    {
                        component: ProductCatalogVersionsSelectorComponent
                    }
                );
            },
            [EditorFieldMappingService]
        )
    ]
})
export class ProductCatalogVersionModule {}
