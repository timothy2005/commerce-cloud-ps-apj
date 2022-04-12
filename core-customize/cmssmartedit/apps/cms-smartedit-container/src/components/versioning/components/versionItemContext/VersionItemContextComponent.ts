/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SeDowngradeComponent } from 'smarteditcommons';

import { IPageVersion, PageVersionSelectionService } from '../../services';

/**
 * Represents selected page versions in the toolbar context.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-version-item-context',
    templateUrl: './VersionItemContextComponent.html',
    styleUrls: ['./VersionItemContextComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionItemContextComponent implements OnInit {
    public pageVersion$: Observable<IPageVersion>;
    public EMPTY_DESCRIPTION_MSG_KEY = 'se.cms.versions.no.description';

    constructor(private pageVersionSelectionService: PageVersionSelectionService) {}

    ngOnInit(): void {
        this.pageVersion$ = this.pageVersionSelectionService.getSelectedPageVersion$();

        this.pageVersionSelectionService.hideToolbarContextIfNotNeeded();
    }

    public deselectPageVersion(): void {
        this.pageVersionSelectionService.deselectPageVersion();
    }
}
