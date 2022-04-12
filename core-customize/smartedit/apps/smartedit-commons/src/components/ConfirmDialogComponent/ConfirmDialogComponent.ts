/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component } from '@angular/core';
import { FundamentalModalManagerService, TypedMap } from '@smart/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'se-confirm-dialog',
    template: `
        <div id="confirmationModalDescription">
            {{ (modalData | async).description | translate: (descriptionPlaceholders | async) }}
        </div>
    `
})
export class ConfirmDialogComponent {
    constructor(private modalManager: FundamentalModalManagerService) {}

    public get modalData(): Observable<any> {
        return this.modalManager.getModalData();
    }

    public get descriptionPlaceholders(): Observable<TypedMap<string>> {
        return this.modalManager
            .getModalData()
            .pipe(map((data) => data.descriptionPlaceholders || {}));
    }
}
