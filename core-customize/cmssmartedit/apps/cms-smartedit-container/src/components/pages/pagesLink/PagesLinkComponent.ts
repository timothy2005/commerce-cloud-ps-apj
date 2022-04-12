/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_LIST_PATH } from 'cmscommons';
import { SeDowngradeComponent, SmarteditRoutingService, NG_ROUTE_PREFIX } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-pages-link',
    templateUrl: './PagesLinkComponent.html',
    styleUrls: ['../pageList.scss']
})
export class PagesLinkComponent implements OnInit {
    private siteId: string;
    private catalogId: string;
    private catalogVersion: string;

    constructor(private route: ActivatedRoute, private seRouting: SmarteditRoutingService) {}

    ngOnInit(): void {
        this.siteId = this.route.snapshot.params.siteId;
        this.catalogId = this.route.snapshot.params.catalogId;
        this.catalogVersion = this.route.snapshot.params.catalogVersion;
    }

    public backToPagelist(): void {
        this.seRouting.go(
            `${NG_ROUTE_PREFIX}${PAGE_LIST_PATH}`
                .replace(':siteId', this.siteId)
                .replace(':catalogId', this.catalogId)
                .replace(':catalogVersion', this.catalogVersion)
        );
    }
}
