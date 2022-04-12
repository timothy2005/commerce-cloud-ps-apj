/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges
} from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { HomepageService, HomepageType } from 'cmssmarteditcontainer/services';
import { IUriContext, SeDowngradeComponent, TypedMap } from 'smarteditcommons';

/**
 * Component responsible for displaying a homepage icon with the passed cms page and uri context inputs.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-homepage-icon',
    templateUrl: './HomepageIconComponent.html',
    styleUrls: ['./HomepageIconComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageIconComponent implements OnChanges {
    @Input() cmsPage: ICMSPage;
    @Input() uriContext: IUriContext;

    public type: HomepageType;

    constructor(public homepageService: HomepageService, private cdr: ChangeDetectorRef) {}

    async ngOnChanges(): Promise<void> {
        if (!this.cmsPage && !this.uriContext) {
            return;
        }

        this.type = await this.homepageService.getHomepageType(this.cmsPage, this.uriContext);
        this.cdr.detectChanges();
    }

    public isVisible(): boolean {
        return !!this.type;
    }

    public getIconClass(): TypedMap<boolean> {
        return {
            'se-homepage-icon--current': this.type === HomepageType.CURRENT,
            'se-homepage-icon--old': this.type === HomepageType.OLD
        };
    }

    public getTooltipMessage(): string {
        const state = this.getHomepageState(this.type);
        return `se.cms.homepage.tooltip.message.${state}`;
    }

    private getHomepageState(type: HomepageType): string {
        return HomepageType.CURRENT === type ? 'current' : 'previous';
    }
}
