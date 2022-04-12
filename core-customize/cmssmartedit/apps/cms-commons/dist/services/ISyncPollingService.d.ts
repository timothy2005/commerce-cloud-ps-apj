import { IUriContext, TypedMap } from 'smarteditcommons';
import { ISyncJob, ISyncStatus } from '../dtos';
export declare abstract class ISyncPollingService {
    registerSyncPollingEvents(): void;
    changePollingSpeed(eventId: string, itemId?: string): void;
    fetchSyncStatus(_pageUUID: string, uriContext: IUriContext): Promise<ISyncStatus>;
    performSync(array: TypedMap<string>[], uriContext: IUriContext): Promise<ISyncJob>;
    getSyncStatus(pageUUID?: string, uriContext?: IUriContext, forceGetSynchronization?: boolean): Promise<ISyncStatus>;
}
