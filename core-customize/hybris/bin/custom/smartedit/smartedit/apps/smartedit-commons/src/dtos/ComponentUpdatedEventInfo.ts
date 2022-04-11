/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Payload } from '@smart/utils';

/**
 * Contains information about a component being updated.
 */
export interface ComponentUpdatedEventInfo extends Payload {
    /**
     * The smartedit id of the updated component.
     */
    componentId: string;

    /**
     * The smartedit type of the updated component.
     */
    componentType: string;

    /**
     * Flag that specifies if the update to the component requires decorators to be refreshed (replayed).
     */
    requiresReplayingDecorators: boolean;
}
