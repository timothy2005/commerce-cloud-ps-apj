import { EventEmitter, OnInit, Type } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { ActionableSearchItem, SelectComponent, SelectReset } from '../../../select';
import { GenericEditorField } from '../../types';
import { IGenericEditorDropdownService, IGenericEditorDropdownServiceConstructor } from './types';
export declare function genericEditorDropdownComponentOnInit(): void;
export declare class GenericEditorDropdownComponent implements OnInit {
    GenericEditorDropdownService: IGenericEditorDropdownServiceConstructor;
    id: string;
    field: GenericEditorField;
    qualifier: string;
    model: TypedMap<any>;
    showRemoveButton?: boolean;
    itemComponent?: Type<any>;
    resultsHeaderComponent?: Type<any>;
    actionableSearchItem?: ActionableSearchItem;
    reset: SelectReset;
    resetChange: EventEmitter<SelectReset>;
    selectComponent: SelectComponent<any>;
    dropdown: IGenericEditorDropdownService;
    constructor(GenericEditorDropdownService: IGenericEditorDropdownServiceConstructor);
    ngOnInit(): void;
    onClickOtherDropdown(): void;
    onResetChange(reset: SelectReset): void;
}
