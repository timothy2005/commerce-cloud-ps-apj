/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { PAGE_TYPES_RESTRICTION_TYPES_URI } from 'cmscommons';
import { IRestService, RestServiceFactory, SeDowngradeService } from 'smarteditcommons';

export interface ICMSPageTypeRestriction {
    pageType: string;
    restrictionType: string;
}

export interface ICMSPageTypeRestrictions {
    pageTypeRestrictionTypeList: ICMSPageTypeRestriction[];
}
@SeDowngradeService()
export class PageTypesRestrictionTypesRestService {
    private readonly restService: IRestService<ICMSPageTypeRestrictions>;
    constructor(private restServiceFactory: RestServiceFactory) {
        this.restService = this.restServiceFactory.get(PAGE_TYPES_RESTRICTION_TYPES_URI);
    }

    getPageTypesRestrictionTypes(): Promise<ICMSPageTypeRestrictions> {
        return this.restService.get();
    }
}
