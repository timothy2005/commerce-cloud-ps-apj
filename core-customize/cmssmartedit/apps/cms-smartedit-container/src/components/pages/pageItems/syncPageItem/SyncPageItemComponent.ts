/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { PageSynchronizationPanelModalData } from 'cmssmarteditcontainer/components/synchronize/types';
import {
    EVENT_CONTENT_CATALOG_UPDATE,
    ICatalogService,
    IModalService,
    LogService,
    MultiNamePermissionContext,
    SeDowngradeComponent,
    SystemEventService,
    IDropdownMenuItemData,
    DROPDOWN_MENU_ITEM_DATA
} from 'smarteditcommons';
import { PageSynchronizationPanelModalComponent } from '../../../synchronize';

/**
 * Build a drop-down item allowing for the edition of a given CMS page.
 *
 * Allows to open an Synchronization Modal for a given page.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-sync-page-item',
    templateUrl: './SyncPageItemComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncPageItemComponent implements OnInit {
    /**
     * Context of the CMS page associated to the Edit Page Item.
     */
    public pageInfo: ICMSPage;
    public syncPagePermission: MultiNamePermissionContext[];

    constructor(
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData,
        private catalogService: ICatalogService,
        private systemEventService: SystemEventService,
        private modalService: IModalService,
        private logService: LogService
    ) {}

    ngOnInit(): void {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        this.syncPagePermission = [
            {
                names: ['se.act.on.page.in.workflow'],
                context: {
                    pageInfo: this.pageInfo
                }
            }
        ];
    }

    public async sync(): Promise<void> {
        const uriContext = await this.catalogService.retrieveUriContext();

        try {
            await this.modalService
                .open<PageSynchronizationPanelModalData>({
                    component: PageSynchronizationPanelModalComponent,
                    templateConfig: {
                        title: 'se.cms.synchronization.pagelist.modal.title.prefix',
                        titleSuffix: 'se.cms.pageeditormodal.editpagetab.title'
                    },
                    config: {
                        modalPanelClass: 'modal-md'
                    },
                    data: {
                        cmsPage: this.pageInfo,
                        uriContext
                    }
                })
                .afterClosed.toPromise();
            // sync has been clicked
            this.systemEventService.publishAsync(EVENT_CONTENT_CATALOG_UPDATE);
        } catch (error) {
            this.logService.debug('Page Synchronization Panel Modal dismissed', error);
        }
    }
}
