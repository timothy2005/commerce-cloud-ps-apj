/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { clone } from 'lodash';
import {
    FetchStrategy,
    IdWithLabel,
    Page,
    SeDowngradeComponent,
    SelectItem,
    SelectReset,
    SliderPanelConfiguration
} from 'smarteditcommons';
import { PopulatorItem } from '../../../dropdownPopulators/types';
import { CatalogFetchStrategy, ProductCatalog } from '../../services';

interface CatalogInfo {
    catalogId: string;
    catalogVersion: string;
}

@SeDowngradeComponent()
@Component({
    selector: 'se-item-selector-panel',
    templateUrl: './ItemSelectorPanelComponent.html'
})
export class ItemSelectorPanelComponent implements OnInit {
    /**
     * Default items for Items Multi Selector.
     *
     * It is updated (reference is kept) when Save Button is clicked.
     */
    @Input() defaultItemsSelected: string[];
    @Input() itemComponent: Type<any>;
    @Input() getCatalogs: () => Promise<ProductCatalog[]>;
    @Input() itemsFetchStrategy: CatalogFetchStrategy<PopulatorItem>;
    @Input() catalogItemTypeI18nKey: string;
    @Input() maxNumItems?: number;

    /** Event emitted when Save button is clicked. Passes selected items id's. */
    @Output() onChange: EventEmitter<string[]>;
    @Output() showPanelChange: EventEmitter<() => void>; // TODO: When migrating catalogAwareSelector, remove this and call showPanel method via @ViewChild

    public catalogs: ProductCatalog[];
    public catalogInfo: CatalogInfo;
    public panelConfig: SliderPanelConfiguration;
    public saveButtonDisabled: boolean;
    /** Multi Select */
    public internalItemsSelected: string[];

    public resetCatalogVersionSelector: SelectReset;
    public resetItemsListSelector: SelectReset;

    public catalogSelectorFetchStrategy: FetchStrategy;
    public catalogVersionSelectorFetchStrategy: FetchStrategy;
    public itemsSelectorFetchStrategy: FetchStrategy;

    public onCatalogSelectorChange: () => void;
    public onCatalogVersionSelectorChange: () => void;
    public onItemsSelectorChange: () => void;

    /** Set with 2 way binding by SliderPanelComponent. */
    public hidePanel: () => Promise<void>;
    /** Set with 2 way binding by SliderPanelComponent. */
    public showPanel: () => Promise<void>;

    constructor() {
        this.onChange = new EventEmitter();
        this.showPanelChange = new EventEmitter();
        this.maxNumItems = 0;

        this.catalogs = [];
        this.catalogInfo = {} as CatalogInfo;
        this.saveButtonDisabled = true;
        this.internalItemsSelected = [];

        this.initOnCatalogSelectorChange();
        this.initOnCatalogVersionSelectorChange();
        this.initOnItemsSelectorChange();
    }

    ngOnInit(): Promise<void> {
        this.panelConfig = {
            cssSelector: '#y-modal-dialog',
            noGreyedOutOverlay: true,
            modal: {
                title: this.catalogItemTypeI18nKey,
                showDismissButton: false,
                cancel: {
                    onClick: (): void => this.cancel(),
                    label: 'se.cms.catalogaware.panel.button.cancel',
                    isDisabledFn: (): boolean => false
                },
                save: {
                    onClick: (): void => this.saveChanges(),
                    label: 'se.cms.catalogaware.panel.button.add',
                    isDisabledFn: (): boolean => this.isSaveButtonDisabled()
                }
            }
        };

        this.showPanelChange.emit(() => this.initAndShowPanel());

        return this.initCatalogs();
    }

    public isItemSelectorEnabled(): boolean {
        return (
            this.catalogInfo && !!this.catalogInfo.catalogId && !!this.catalogInfo.catalogVersion
        );
    }

    private initOnCatalogSelectorChange(): void {
        this.onCatalogSelectorChange = (): void => {
            if (this.resetCatalogVersionSelector) {
                this.resetCatalogVersionSelector();
            }
        };
    }

    private initOnCatalogVersionSelectorChange(): void {
        this.onCatalogVersionSelectorChange = (): void => {
            if (this.catalogInfo.catalogId && this.catalogInfo.catalogVersion) {
                if (this.resetItemsListSelector) {
                    this.resetItemsListSelector();
                }
            }
        };
    }

    private initOnItemsSelectorChange(): void {
        this.onItemsSelectorChange = (): void => {
            if (this.isItemSelectorEnabled()) {
                // Only consider changes when the item is enabled. Otherwise the changes are happening during initialization.
                this.saveButtonDisabled = false;
            }
        };
    }

    private async initCatalogs(): Promise<void> {
        this.catalogs = await this.getCatalogs();

        if (this.catalogs.length === 1) {
            // Because there is only one catalog that can be selected, select that catalog as a default
            this.catalogInfo.catalogId = this.catalogs[0].id;
        }

        this.initCatalogSelector();
        this.initCatalogVersionSelector();
        this.initItemsSelector();
    }

    private initCatalogSelector(): void {
        this.catalogSelectorFetchStrategy = {
            fetchAll: (): Promise<ProductCatalog[]> => Promise.resolve(this.catalogs)
        };
    }

    private initCatalogVersionSelector(): void {
        this.catalogVersionSelectorFetchStrategy = {
            fetchAll: (): Promise<IdWithLabel[]> => {
                let versions: IdWithLabel[] = [];
                if (this.catalogInfo.catalogId) {
                    const catalog = this.catalogs.find(
                        ({ id }) => id === this.catalogInfo.catalogId
                    );
                    // ECP-5475(CMSX-10401) Add .slice(0) to copy version object instead of creating reference pointer
                    // TL;DR When you select a catalog, "internalReset" for Catalog Version Selector is called which does "this.items.length = 0"
                    versions = catalog.versions.slice(0);
                }
                return Promise.resolve(versions);
            }
        };
    }

    private initItemsSelector(): void {
        this.itemsSelectorFetchStrategy = {
            fetchPage: (
                mask: string,
                pageSize: number,
                currentPage: number
            ): Promise<Page<PopulatorItem>> =>
                this.itemsFetchPageAndFilter(mask, pageSize, currentPage),
            fetchEntity: (uid: string): Promise<SelectItem> =>
                this.itemsFetchStrategy.fetchEntity(uid)
        };
    }

    private initAndShowPanel(): void {
        this.catalogInfo = {} as CatalogInfo;
        this.initCatalogs();
        this.internalItemsSelected = this.defaultItemsSelected
            ? clone(this.defaultItemsSelected)
            : [];
        this.showPanel();
    }

    private async itemsFetchPageAndFilter(
        mask: string,
        pageSize: number,
        currentPage: number
    ): Promise<Page<PopulatorItem>> {
        const page = await this.itemsFetchStrategy.fetchPage(
            this.catalogInfo,
            mask,
            pageSize,
            currentPage
        );
        return this.limitToNonSelectedItems(page);
    }

    private limitToNonSelectedItems(page: Page<PopulatorItem>): Page<PopulatorItem> {
        let itemIndex = page.results.length;
        while (itemIndex--) {
            const item = page.results[itemIndex];
            if (this.internalItemsSelected.includes(item.uid)) {
                page.results.splice(itemIndex, 1);
                page.pagination.count--;
            }
        }
        return page;
    }

    private isSaveButtonDisabled(): boolean {
        return this.saveButtonDisabled;
    }

    private cancel(): void {
        this.catalogInfo = {} as CatalogInfo;
        this.hidePanel();
    }

    private saveChanges(): void {
        // Copy the new elements into the other array. We need to use the same array so that the reference is not lost in the parent.
        this.defaultItemsSelected.splice(
            0,
            this.defaultItemsSelected.length,
            ...this.internalItemsSelected
        );

        // TODO: emit new selected items instead of splicing
        // Refactor when migrating catalogAwareSelector
        // this.onChange.emit(...[this.internalItemsSelected]);
        this.onChange.emit();

        this.hidePanel();
    }
}
