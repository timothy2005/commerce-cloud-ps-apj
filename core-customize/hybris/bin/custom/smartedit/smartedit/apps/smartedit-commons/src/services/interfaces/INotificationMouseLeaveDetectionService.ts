/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Interface for mouse bounds
 */
export interface IBound {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * The interface defines the methods required to detect when the mouse leaves the notification panel
 * in the SmartEdit application and in the SmartEdit container.
 *
 * It is solely meant to be used with the notificationService.
 */
export abstract class INotificationMouseLeaveDetectionService {
    /**
     * This method starts tracking the movement of the mouse pointer in order to detect when it
     * leaves the notification panel.
     *
     * The innerBounds parameter is considered optional. If it is not provided, it will not be
     * validated and detection will only be started in the SmartEdit container.
     *
     * Here is an example of a bounds object:
     *
     * {
     *     x: 100,
     *     y: 100,
     *     width: 200,
     *     height: 50
     * }
     *
     * This method will throw an error if:
     *     - the bounds parameter is not provided
     *     - a bounds object does not contain the X coordinate
     *     - a bounds object does not contain the Y coordinate
     *     - a bounds object does not contain the width dimension
     *     - a bounds object does not contain the height dimension
     */

    startDetection(outerBounds: IBound, innerBounds: IBound, callback: () => any): Promise<void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method stops tracking the movement of the mouse pointer.
     */
    stopDetection(): Promise<void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method is used to start tracking the movement of the mouse pointer within the iFrame.
     */
    protected _remoteStartDetection(bound: IBound): Promise<void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method is used to stop tracking the movement of the mouse pointer within the iFrame.
     */
    protected _remoteStopDetection(): Promise<void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method is used to call the callback function when it is detected from within the iFrame that
     * the mouse left the notification panel
     */
    protected _callCallback(): Promise<void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method is called for each mouse movement. It evaluates whether or not the
     * mouse pointer is in the notification panel. If it isn't, it calls the onMouseLeave.
     */
    protected _onMouseMove(event: MouseEvent): void {
        this._getBounds().then((bounds: IBound) => {
            const isOutsideX =
                bounds &&
                event &&
                (event.clientX < bounds.x || event.clientX > bounds.x + bounds.width);
            const isOutsideY =
                bounds &&
                event &&
                (event.clientY < bounds.y || event.clientY > bounds.y + bounds.height);

            if (isOutsideX || isOutsideY) {
                this._onMouseLeave();
            }
        });
    }

    /**
     * This method gets bounds
     */
    protected _getBounds(): Promise<IBound> {
        'proxyFunction';
        return null;
    }

    /**
     * This method gets callback
     */
    protected _getCallback(): Promise<() => void> {
        'proxyFunction';
        return null;
    }

    /**
     * This method is triggered when the service has detected that the mouse left the
     * notification panel. It will execute the callback function and stop detection.
     */
    private _onMouseLeave(): void {
        this._getCallback().then((callback: () => void) => {
            if (callback) {
                callback();
                this.stopDetection();
            } else {
                this._callCallback().then(() => {
                    this.stopDetection();
                });
            }
        });
    }
}
