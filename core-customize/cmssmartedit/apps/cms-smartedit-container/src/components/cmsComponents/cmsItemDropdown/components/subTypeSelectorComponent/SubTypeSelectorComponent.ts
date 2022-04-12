/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SeDowngradeComponent, IdWithLabel } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-sub-type-selector',
    templateUrl: './SubTypeSelectorComponent.html',
    styleUrls: ['./SubTypeSelectorComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubTypeSelectorComponent {
    @Input() subTypes: string[];
    @Output() onSubTypeSelect: EventEmitter<string> = new EventEmitter();

    public select({ id }: IdWithLabel): void {
        this.onSubTypeSelect.emit(id);
    }
}
