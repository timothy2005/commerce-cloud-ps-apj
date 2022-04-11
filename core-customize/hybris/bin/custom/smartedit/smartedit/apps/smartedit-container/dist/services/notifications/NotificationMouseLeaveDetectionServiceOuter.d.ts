import { IBound, INotificationMouseLeaveDetectionService, WindowUtils } from 'smarteditcommons';
/**
 * This service makes it possible to track the mouse position to detect when it leaves the notification panel.
 * It is solely meant to be used with the notificationService.
 */
/** @internal */
export declare class NotificationMouseLeaveDetectionService extends INotificationMouseLeaveDetectionService {
    private document;
    private windowUtils;
    private notificationPanelBounds;
    private mouseLeaveCallback;
    constructor(document: Document, windowUtils: WindowUtils);
    startDetection(outerBounds: IBound, innerBounds: IBound, callback: () => any): Promise<void>;
    stopDetection(): Promise<void>;
    protected _callCallback(): Promise<void>;
    protected _getBounds(): Promise<IBound>;
    protected _getCallback(): Promise<() => void>;
    private validateBounds;
}
