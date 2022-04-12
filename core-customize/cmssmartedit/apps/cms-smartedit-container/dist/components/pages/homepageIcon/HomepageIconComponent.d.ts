import { ChangeDetectorRef, OnChanges } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { HomepageService, HomepageType } from 'cmssmarteditcontainer/services';
import { IUriContext, TypedMap } from 'smarteditcommons';
export declare class HomepageIconComponent implements OnChanges {
    homepageService: HomepageService;
    private cdr;
    cmsPage: ICMSPage;
    uriContext: IUriContext;
    type: HomepageType;
    constructor(homepageService: HomepageService, cdr: ChangeDetectorRef);
    ngOnChanges(): Promise<void>;
    isVisible(): boolean;
    getIconClass(): TypedMap<boolean>;
    getTooltipMessage(): string;
    private getHomepageState;
}
