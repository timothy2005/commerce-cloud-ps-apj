/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, Type } from '@angular/core';

import {
    FetchAllStrategy,
    ItemComponentData,
    ITEM_COMPONENT_DATA_TOKEN,
    SelectItem
} from '../../../../components/select';
import { GENERIC_EDITOR_WIDGET_DATA } from '../../components/tokens';
import { GenericEditorOption, GenericEditorWidgetData } from '../../types';

@Component({
    selector: 'se-enum-item-printer',
    template: ` <span id="enum-{{ data.select.id }}">{{ data.item.label }}</span> `
})
export class EnumItemPrinterComponent {
    constructor(@Inject(ITEM_COMPONENT_DATA_TOKEN) public data: ItemComponentData) {}
}

@Component({
    selector: 'se-enum',
    template: `
        <se-select
            [id]="data.field.qualifier"
            class="se-generic-editor-dropdown"
            [(model)]="data.model[data.qualifier]"
            [isReadOnly]="data.isFieldDisabled()"
            [resetSearchInput]="false"
            [fetchStrategy]="fetchStrategy"
            [itemComponent]="itemComponent"
            [placeholder]="'se.genericeditor.sedropdown.placeholder'"
            [showRemoveButton]="true"
        ></se-select>
    `
})
export class EnumComponent {
    public itemComponent: Type<any> = EnumItemPrinterComponent;
    public fetchStrategy: {
        fetchAll: FetchAllStrategy<SelectItem>;
    };

    constructor(@Inject(GENERIC_EDITOR_WIDGET_DATA) public data: GenericEditorWidgetData<any>) {
        const { editor, field, qualifier } = data;
        this.fetchStrategy = {
            fetchAll: async (search: string): Promise<SelectItem[]> => {
                // the refereshOptions does not resolve with items, it populates the "field.options" object with the fetched data
                await editor.refreshOptions(field, qualifier, search);

                const options = field.options[qualifier] as GenericEditorOption[];
                // Map code to id for SelectComponent that requires item to have an id property
                const selectItems = options.map((option) => ({
                    ...option,
                    id: option.code
                })) as SelectItem[];
                return selectItems;
            }
        };
    }
}
