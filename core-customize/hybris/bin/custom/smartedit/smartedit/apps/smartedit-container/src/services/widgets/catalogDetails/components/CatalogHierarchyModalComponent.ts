/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { FundamentalModalManagerService, IBaseCatalog } from 'smarteditcommons';

import './CatalogHierarchyModalComponent.scss';

/**
 * @ignore
 */
@Component({
    selector: 'se-catalog-hierarchy-modal',
    templateUrl: './CatalogHierarchyModalComponent.html'
})
export class CatalogHierarchyModalComponent {
    public catalogs$: Promise<IBaseCatalog[]>;
    public siteId: string;

    constructor(public modalService: FundamentalModalManagerService) {}

    ngOnInit(): void {
        this.catalogs$ = this.modalService
            .getModalData()
            .pipe(take(1))
            .toPromise()
            .then(({ catalog }) => [...catalog.parents, catalog]);
    }

    onSiteSelected(): void {
        this.modalService.close();
    }
}
