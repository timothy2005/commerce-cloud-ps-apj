/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TranslateService } from '@ngx-translate/core';
import * as lodash from 'lodash';

import { SeDowngradeService } from 'smarteditcommons/di';
import { LanguageService } from '../../../../../../services/language/LanguageService';
import { GenericEditorOption } from '../../../../types';
import { DropdownPopulatorInterface } from '../DropdownPopulatorInterface';
import { DropdownPopulatorPayload } from '../types'; // TODO: move to ../../types ?

/**
 * Implementation of {@link DropdownPopulatorInterface} for "EditableDropdown" cmsStructureType
 * containing options attribute.
 */
@SeDowngradeService()
export class OptionsDropdownPopulator extends DropdownPopulatorInterface {
    constructor(
        public languageService: LanguageService,
        public translateService: TranslateService
    ) {
        super(lodash, languageService, translateService);
    }

    /**
     * Implementation of the [fetchAll]{@link DropdownPopulatorInterface#fetchAll} method.
     */
    public fetchAll(payload: DropdownPopulatorPayload): Promise<GenericEditorOption[]> {
        const options = this.populateAttributes(
            payload.field.options as GenericEditorOption[],
            payload.field.idAttribute,
            payload.field.labelAttributes
        );

        if (payload.search) {
            return this.search(options, payload.search);
        }

        return Promise.resolve(options);
    }
}
