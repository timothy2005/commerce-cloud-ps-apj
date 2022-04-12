/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { TypePermissionsRestService } from 'cmscommons';
import { SeDowngradeComponent } from 'smarteditcommons';
import { PageType, PageTypeService } from '../../../../../dao/PageTypeService';

@SeDowngradeComponent()
@Component({
    selector: 'se-select-page-type',
    templateUrl: './SelectPageTypeComponent.html',
    styleUrls: ['../../addPageWizard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPageTypeComponent implements OnInit {
    @Input() pageTypeCode: string;
    @Output() onTypeSelected: EventEmitter<PageType>;

    public pageTypes: PageType[];

    constructor(
        private pageTypeService: PageTypeService,
        private typePermissionsRestService: TypePermissionsRestService,
        private cdr: ChangeDetectorRef
    ) {
        this.onTypeSelected = new EventEmitter();
        this.pageTypes = [];
    }

    async ngOnInit(): Promise<void> {
        await this.loadPageTypes();
        this.cdr.detectChanges();
    }

    public selectType(pageType: PageType): void {
        this.onTypeSelected.emit(pageType);
    }

    public isSelected(pageType: PageType): boolean {
        return pageType.code === this.pageTypeCode;
    }

    private async loadPageTypes(): Promise<void> {
        const pageTypes = await this.pageTypeService.getPageTypes();
        const allPageTypeCodes = pageTypes.map((pageType) => pageType.code);
        const createPermissionResult = await this.typePermissionsRestService.hasCreatePermissionForTypes(
            allPageTypeCodes
        );
        this.pageTypes = pageTypes.filter((pageType) => createPermissionResult[pageType.code]);
    }
}
