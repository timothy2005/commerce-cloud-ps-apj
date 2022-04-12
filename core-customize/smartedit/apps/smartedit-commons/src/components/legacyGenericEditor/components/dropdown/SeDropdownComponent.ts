/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TypedMap } from '@smart/utils';
import { ISeComponent, SeComponent } from 'smarteditcommons/di';
import { genericEditorDropdownComponentOnInit } from '../../../genericEditor/components/dropdown';
import { GenericEditorField } from '../../../genericEditor/types';
import { ISEDropdownService, ISEDropdownServiceConstructor, SEDropdownAPI } from './types';

/**
 * **Deprecated since 2105, use {@link GenericEditorDropdownComponent}.**
 *
 * ### Parameters
 *
 * `field` - The field description of the field being edited as defined by the structure API described in {@link GenericEditorFactoryService}.
 *
 * `field.options` - An array of options to be populated.
 *
 * `field.uri` - The uri to fetch the list of options from a REST call, especially if the dropdown is dependent on another one.
 *
 * `field.propertyType` - If a propertyType is defined, the seDropdown will use the populator associated to it with the following AngularJS recipe name : `propertyType + "DropdownPopulator"`.
 *
 * `field.dependsOn` - The qualifier of the parent dropdown that this dropdown depends on.
 *
 * `field.idAttribute` - The name of the id attribute to use when populating dropdown items.
 *
 * `field.labelAttributes` - An array of attributes to use when determining the label for each item in the dropdown
 *
 * `field.paged` - A boolean to determine if we are in paged mode as opposed to retrieving all items at once.
 *
 * `qualifier` - If the field is not localized, this is the actual field.qualifier, if it is localized, it is the language identifier such as en, de...
 *
 * `model` - If the field is not localized, this is the actual full parent model object, if it is localized, it is the language map: model[field.qualifier].
 *
 * `id` - An identifier of the generated DOM element.
 *
 * `itemTemplateUrl` - The path to the template that will be used to display items in both the dropdown menu and the selection.
 *
 * `getApi` - Exposes API used for setting resultsHeaderTemplateUrl or resultsHeaderTemplate.
 *
 * @deprecated
 */
@SeComponent({
    templateUrl: 'seDropdownTemplate.html',
    inputs: [
        'field:=',
        'qualifier:=',
        'model:=',
        'id:=',
        'getApi:&?',
        'itemTemplateUrl',
        'showRemoveButton'
    ]
})
export class SeDropdownComponent implements ISeComponent {
    public field: GenericEditorField;
    public qualifier: string;
    public model: TypedMap<any>;
    public id: string;
    public itemTemplateUrl: string;
    public getApi: ($api: { $api: SEDropdownAPI }) => void;

    public dropdown: ISEDropdownService;

    constructor(
        public SEDropdownService: ISEDropdownServiceConstructor,
        public CONTEXT_CATALOG: string,
        public CONTEXT_CATALOG_VERSION: string,
        private yjQuery: JQueryStatic
    ) {}

    $onInit(): void {
        genericEditorDropdownComponentOnInit.call(this);
    }

    public onClickOtherDropdown(): void {
        this.closeSelect();
    }

    private closeSelect(): void {
        const uiSelectCtrl = this.getUiSelectCtrl();
        if (uiSelectCtrl) {
            uiSelectCtrl.open = false;
        }
    }

    private getUiSelectCtrl(): any {
        const uiSelectId = '#' + this.field.qualifier + '-selector';

        return this.yjQuery(uiSelectId).controller('uiSelect');
    }
}
