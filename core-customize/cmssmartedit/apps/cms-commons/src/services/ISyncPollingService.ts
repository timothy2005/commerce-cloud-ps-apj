/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IUriContext, TypedMap } from 'smarteditcommons';
import { ISyncJob, ISyncStatus } from '../dtos';

export abstract class ISyncPollingService {
    registerSyncPollingEvents(): void {
        'proxyFunction';
        return null;
    }

    changePollingSpeed(eventId: string, itemId?: string): void {
        'proxyFunction';
        return null;
    }

    fetchSyncStatus(_pageUUID: string, uriContext: IUriContext): Promise<ISyncStatus> {
        'proxyFunction';
        return null;
    }

    performSync(array: TypedMap<string>[], uriContext: IUriContext): Promise<ISyncJob> {
        'proxyFunction';
        return null;
    }

    getSyncStatus(
        pageUUID?: string,
        uriContext?: IUriContext,
        forceGetSynchronization?: boolean
    ): Promise<ISyncStatus> {
        'proxyFunction';
        return null;
    }
}
