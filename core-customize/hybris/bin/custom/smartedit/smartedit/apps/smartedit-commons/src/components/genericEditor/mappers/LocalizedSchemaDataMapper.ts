/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { AbstractFormSchemas, FormSchema, Payload } from '@smart/utils';

import { ILanguage } from '../../../services';
import { LocalizedElementComponent } from '../components/LocalizedElementComponent';
import { GenericEditorField } from '../types';
import { SchemaDataMapper } from './RootSchemaDataMapper';

/**
 * A schema and data mapper for the LocalizedElementComponent.
 */
export class LocalizedSchemaDataMapper implements SchemaDataMapper {
    constructor(
        public id: string,
        private mappers: SchemaDataMapper[],
        private structure: GenericEditorField,
        private languages: ILanguage[],
        private component: Payload
    ) {}

    toValue(): any {
        return this.mappers.reduce((acc, mapper) => {
            acc[mapper.id] = mapper.toValue();
            return acc;
        }, {} as any);
    }

    toSchema(): FormSchema {
        return {
            type: 'group',
            component: 'localized',
            schemas: this.mappers.reduce((acc, mapper) => {
                acc[mapper.id] = mapper.toSchema();
                return acc;
            }, {} as AbstractFormSchemas),
            inputs: {
                field: this.structure,
                languages: this.languages,
                component: this.component
            } as Partial<LocalizedElementComponent>
        };
    }
}
