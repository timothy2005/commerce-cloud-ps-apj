/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { GENERIC_EDITOR_WIDGET_DATA, GenericEditorWidgetData } from 'smarteditcommons';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'se-component-slot-shared-slot-type-field',
    templateUrl: './SlotSharedSlotTypeFieldComponent.html',
    styleUrls: ['./SlotSharedSlotTypeFieldComponent.scss']
})
export class SlotSharedSlotTypeFieldComponent {
    public page: ICMSPage;

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        public data: GenericEditorWidgetData<ICMSPage>
    ) {
        ({ model: this.page } = data);
    }
}
