/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import {
    EVENT_CONTENT_CATALOG_UPDATE,
    ICatalogService,
    MultiNamePermissionContext,
    SeDowngradeComponent,
    SystemEventService,
    DROPDOWN_MENU_ITEM_DATA,
    IDropdownMenuItemData
} from 'smarteditcommons';

/**
 * DeletePageItemComponent builds a dropdown item allowing for the soft
 * deletion of a given CMS page .
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-delete-page-item',
    templateUrl: './DeletePageItemComponent.html',
    styleUrls: ['../PageItems.scss']
})
export class DeletePageItemComponent implements OnInit {
    public pageInfo: ICMSPage;
    public isDeletePageEnabled: boolean;
    public tooltipMessage: string;
    public deletePagePermission: MultiNamePermissionContext[];

    constructor(
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData,
        private managePageService: ManagePageService,
        private systemEventService: SystemEventService,
        private catalogService: ICatalogService
    ) {
        this.isDeletePageEnabled = false;
        this.tooltipMessage = 'se.cms.tooltip.movetotrash';
    }

    async ngOnInit(): Promise<void> {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        await this.getDisableDeleteTooltipMessage();
        this.setDeletePermissions();
    }

    public async onClickOnDeletePage(): Promise<void> {
        const uriContext = await this.catalogService.retrieveUriContext();
        await this.managePageService.softDeletePage(this.pageInfo, uriContext);
        this.systemEventService.publishAsync(EVENT_CONTENT_CATALOG_UPDATE);
    }

    private setDeletePermissions(): void {
        this.deletePagePermission = [
            {
                names: ['se.delete.page.type'],
                context: {
                    typeCode: this.pageInfo.typeCode
                }
            },
            {
                names: ['se.act.on.page.in.workflow'],
                context: {
                    pageInfo: this.pageInfo
                }
            }
        ];
    }

    private async getDisableDeleteTooltipMessage(): Promise<void> {
        const uriContext = await this.catalogService.retrieveUriContext();
        const isEnabled = await this.managePageService.isPageTrashable(this.pageInfo, uriContext);
        this.isDeletePageEnabled = isEnabled;

        if (this.isDeletePageEnabled) {
            this.tooltipMessage = null;
            return;
        }

        this.tooltipMessage = await this.managePageService.getDisabledTrashTooltipMessage(
            this.pageInfo,
            uriContext
        );
    }
}
