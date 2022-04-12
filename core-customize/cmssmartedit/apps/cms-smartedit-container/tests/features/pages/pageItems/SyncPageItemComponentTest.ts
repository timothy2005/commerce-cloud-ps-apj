/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { SyncPageItemComponent } from 'cmssmarteditcontainer/components/pages/pageItems/syncPageItem/SyncPageItemComponent';
import {
    ICatalogService,
    IModalService,
    LogService,
    SystemEventService,
    IDropdownMenuItemData
} from 'smarteditcommons';

describe('SyncPageItemComponent', () => {
    let catalogService: jasmine.SpyObj<ICatalogService>;
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let modalService: jasmine.SpyObj<IModalService>;
    let logService: jasmine.SpyObj<LogService>;
    let dropdownMenuData: IDropdownMenuItemData;

    const MOCKED_URI_CONTEXT = 'MOCKED_URI_CONTEXT';

    let component: SyncPageItemComponent;
    beforeEach(() => {
        catalogService = jasmine.createSpyObj<ICatalogService>('catalogService', [
            'retrieveUriContext'
        ]);

        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'publishAsync'
        ]);

        modalService = jasmine.createSpyObj<IModalService>('modalService', ['open']);

        logService = jasmine.createSpyObj<LogService>('logService', ['debug']);

        dropdownMenuData = {
            dropdownItem: {},
            selectedItem: { uid: 'some_uid', typeCode: 'typeCode' } as ICMSPage
        };

        component = new SyncPageItemComponent(
            dropdownMenuData,
            catalogService,
            systemEventService,
            modalService,
            logService
        );
    });

    describe('Synchronize Page Modal', () => {
        beforeEach(() => {
            component.pageInfo = {
                uid: 'MOCKED_PAGE_INFO_UID'
            } as ICMSPage;
            catalogService.retrieveUriContext.and.returnValue(Promise.resolve(MOCKED_URI_CONTEXT));
        });

        it('Opens Synchronize Page Modal with the correct data AND handles the sync button click properly', async () => {
            modalService.open.and.returnValue({
                afterClosed: {
                    toPromise: () => Promise.resolve()
                }
            });

            await component.sync();

            expect(modalService.open).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    data: { cmsPage: component.pageInfo, uriContext: MOCKED_URI_CONTEXT }
                })
            );
            // after sync button has been clicked
            expect(systemEventService.publishAsync).toHaveBeenCalledWith(
                'EVENT_CONTENT_CATALOG_UPDATE'
            );
        });

        it('Opens Synchronize Page Modal with the correct data AND handles the rejection properly', async () => {
            modalService.open.and.returnValue({
                afterClosed: {
                    toPromise: () => Promise.reject('reject reason')
                }
            });

            await component.sync();

            expect(modalService.open).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    data: { cmsPage: component.pageInfo, uriContext: MOCKED_URI_CONTEXT }
                })
            );
            // after rejection button has been clicked
            expect(logService.debug).toHaveBeenCalledWith(
                'Page Synchronization Panel Modal dismissed',
                'reject reason'
            );
        });
    });
});
