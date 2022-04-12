/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import {
    ComponentAttributes,
    IContextualMenuButton,
    IContextualMenuConfiguration,
    SeDowngradeComponent,
    TypedMap
} from 'smarteditcommons';

export enum ContextualMenuItemMode {
    Small = 'small',
    Compact = 'compact'
}

export interface SlotAttributes {
    smarteditSlotId: string;
    smarteditSlotUuid: string;
}

@SeDowngradeComponent()
@Component({
    selector: 'se-contextual-menu-item',
    templateUrl: './ContextualMenuItemComponent.html'
})
export class ContextualMenuItemComponent implements OnInit, OnDestroy {
    @Input() mode: ContextualMenuItemMode;
    @Input() index: number;
    @Input() componentAttributes: ComponentAttributes;
    @Input() slotAttributes: SlotAttributes;
    @Input() itemConfig: IContextualMenuButton;

    public classes: string;

    private listeners: TypedMap<() => void>;
    private modes: ContextualMenuItemMode[] = [
        ContextualMenuItemMode.Small,
        ContextualMenuItemMode.Compact
    ];

    constructor(private element: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        this.classes = `cmsx-ctx__icon-more--small ${this.itemConfig.displayClass}`;

        this.validateInput();

        if (this.itemConfig.action && this.itemConfig.action.callbacks) {
            this.setupListeners();
        }
    }

    ngOnDestroy(): void {
        this.removeListeners();
    }

    private validateInput(): void {
        if (typeof this.mode !== 'string' || this.modes.indexOf(this.mode) === -1) {
            throw new Error('Error initializing contextualMenuItem - unknown mode');
        }
    }

    private removeListeners(): void {
        Object.keys(this.listeners || {}).forEach((key: string) => {
            this.element.nativeElement.removeEventListener(key, this.listeners[key]);
        });
    }

    private setupListeners(): void {
        const {
            smarteditComponentType,
            smarteditComponentId,
            smarteditComponentUuid,
            smarteditContainerType,
            smarteditContainerId
        } = this.componentAttributes;
        const { smarteditSlotId, smarteditSlotUuid } = this.slotAttributes;

        const config: IContextualMenuConfiguration = {
            componentType: smarteditComponentType,
            componentId: smarteditComponentId,
            componentUuid: smarteditComponentUuid,
            containerType: smarteditContainerType,
            containerId: smarteditContainerId,
            componentAttributes: this.componentAttributes,
            slotId: smarteditSlotId,
            slotUuid: smarteditSlotUuid
        };

        this.listeners = Object.keys(this.itemConfig.action.callbacks).reduce(
            (acc: TypedMap<() => void>, key: string) => ({
                ...acc,
                [key]: (): void => this.itemConfig.action.callbacks[key](config)
            }),
            {}
        );

        Object.keys(this.listeners).forEach((key: string) => {
            this.element.nativeElement.addEventListener(key, () => this.listeners[key]());
        });
    }
}
