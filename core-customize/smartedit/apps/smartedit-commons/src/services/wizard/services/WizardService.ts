/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { InjectionToken, Type } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { StringUtils } from '../../../utils';
import { IWizardActionStrategy } from './DefaultWizardActionStrategy';
import { WizardAction } from './WizardActions';

/**
 * A plain JSON object, representing the configuration options for a single step in a wizard.
 */
export interface WizardStep {
    /**
     * An optional unique ID for this step in the wizard. If no ID is provided, one is automatically generated.<br />
     * You may choose to provide an ID, making it easier to reference this step explicitly via the wizard service, or
     * be able to identify for which step a callback is being triggered.
     */
    id: string;
    /**
     * **Deprecated since 2005, use [component]{@link WizardStep#component}.**
     *
     * The url of the html template for this step.
     * @deprecated
     */
    templateUrl?: string;

    component?: Type<any>;
    /**
     * An i18n key representing a meaning (short) name for this step.
     * This name will be displayed in the wizard navigation menu.
     */
    name: string;
    /**
     * An i18n key, representing the title that will be displayed at the top of the wizard for this step.
     */
    title: string;
    actions?: WizardAction[];
}

/**
 * A plain JSON object, representing the configuration options for a modal wizard
 */
export interface WizardConfig {
    /**
     * An ordered array of Wizard Steps.
     */
    steps: WizardStep[];
    actionStrategy?: IWizardActionStrategy;
    /**
     * An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired, and the wizard is about to be closed. If this function is defined and returns a value, this
     * value will be returned in the resolved promise returned by the [open]{@link ModalWizard#open}.
     * This is an easy way to pass a result from the wizard to the caller.
     */
    resultFn?: () => void;
    /**
     * An optional callback function that receives a single parameter, the current step ID. This callback
     * is used to enable/disable the next action and the done action.
     * The callback should return a boolean to enabled the action. Null, or if this callback is not defined defaults to
     * true (enabled)
     */
    isFormValid?: (stepId: string) => boolean;
    /**
     * An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the next action is fired. You have the opportunity to halt the Next action by
     * returning promise and rejecting it, otherwise the wizard will continue and load the next step.
     */
    onNext?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the cancel action is fired. You have the opportunity to halt the cancel action
     * (thereby stopping the wizard from being closed), by returning a promise and rejecting it, otherwise the wizard will
     * continue the cancel action.
     */
    onCancel?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired. You have the opportunity to halt the done action (thereby stopping the wizard from being closed),
     * by returning a promise and rejecting it, otherwise the wizard will continue and close the wizard.
     */
    onDone?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional i18n key to override the default label for the Done button
     */
    doneLabel?: string;
    /**
     * An optional i18n key to override the default label for the Next button
     */
    nextLabel?: string;
    /**
     * An optional i18n key to override the default label for the Back button
     */
    backLabel?: string;
    /**
     * An optional i18n key to override the default label for the Cancel button
     */
    cancelLabel?: string;
    templateOverride?: string;
    cancelAction?: WizardAction;
}

export const WIZARD_MANAGER = new InjectionToken<WizardService>('WIZARD_MANAGER');
export const WIZARD_API = new InjectionToken('WIZARD_API');

/**
 * The Wizard Manager is a wizard management service that can be injected into your wizard controller.
 */
export class WizardService {
    public onLoadStep: (index: number, nextStep: WizardStep) => void;
    public onClose: (result: any) => void;
    public onCancel: () => void;
    public onStepsUpdated: (steps: WizardStep[]) => void;
    public properties: TypedMap<any>;

    private _actionStrategy: IWizardActionStrategy;
    private _currentIndex: number;
    private _conf: WizardConfig;
    private _steps: WizardStep[];
    private _getResult: () => void;

    constructor(
        private defaultWizardActionStrategy: IWizardActionStrategy,
        private stringUtils: StringUtils
    ) {
        // the overridable callbacks
        this.onLoadStep = function <T = void>(index: number, nextStep: WizardStep): T {
            return;
        };
        this.onClose = function <T = void>(result: any): T {
            return;
        };
        this.onCancel = function <T = void>(): T {
            return;
        };
        this.onStepsUpdated = function <T = void>(steps: WizardStep[]): T {
            return;
        };
    }

    /* @internal */
    initialize(conf: WizardConfig): void {
        this.validateConfig(conf);

        this._actionStrategy = conf.actionStrategy || this.defaultWizardActionStrategy;
        this._actionStrategy.applyStrategy(this, conf);

        this._currentIndex = 0;
        this._conf = { ...conf };
        this._steps = this._conf.steps;
        this._getResult = conf.resultFn;
        this.validateStepUids(this._steps);

        this.goToStepWithIndex(0);
    }

    /* @internal */
    executeAction(action: WizardAction): Promise<void> {
        if (action.executeIfCondition) {
            const result = action.executeIfCondition();
            return (result instanceof Promise ? result : Promise.resolve(result)).then(() =>
                action.execute(this)
            );
        }
        return Promise.resolve(action.execute(this));
    }

    /**
     * Navigates the wizard to the given step.
     * @param index The 0-based index from the steps array returned by the wizard controllers getWizardConfig() function
     */
    goToStepWithIndex(index: number): void {
        const nextStep = this.getStepWithIndex(index);
        if (nextStep) {
            this.onLoadStep(index, nextStep);
            this._currentIndex = index;
        }
    }

    /**
     * Navigates the wizard to the given step.
     * @param id The ID of a step returned by the wizard controllers getWizardConfig() function. Note that if
     * no id was provided for a given step, then one is automatically generated.
     */
    goToStepWithId(id: string): void {
        this.goToStepWithIndex(this.getStepIndexFromId(id));
    }

    /**
     * Adds an additional step to the wizard at runtime
     * @param index (OPTIONAL) A 0-based index position in the steps array. Default is 0.
     */
    addStep(newStep: WizardStep, index: number): void {
        if (parseInt(newStep.id, 10) !== 0 && !newStep.id) {
            newStep.id = this.stringUtils.generateIdentifier();
        }
        if (!index) {
            index = 0;
        }
        if (this._currentIndex >= index) {
            this._currentIndex++;
        }
        this._steps.splice(index, 0, newStep);
        this.validateStepUids(this._steps);
        this._actionStrategy.applyStrategy(this, this._conf);
        this.onStepsUpdated(this._steps);
    }

    /**
     * Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     */
    removeStepById(id: string): void {
        this.removeStepByIndex(this.getStepIndexFromId(id));
    }

    /**
     * Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     * @param index The 0-based index of the step you wish to remove.
     */
    removeStepByIndex(index: number): void {
        if (index >= 0 && index < this.getStepsCount()) {
            this._steps.splice(index, 1);
            if (index === this._currentIndex) {
                this.goToStepWithIndex(0);
            }
            this._actionStrategy.applyStrategy(this, this._conf);
            this.onStepsUpdated(this._steps);
        }
    }

    /**
     * Close the wizard. This will return a resolved promise to the creator of the wizard, and if any
     * resultFn was provided in the {@link ModalWizardConfig} the returned
     * value of this function will be passed as the result.
     */
    close(): void {
        let result: any;
        if (typeof this._getResult === 'function') {
            result = this._getResult();
        }
        this.onClose(result);
    }

    /**
     * Cancel the wizard. This will return a rejected promise to the creator of the wizard.
     */
    cancel(): void {
        this.onCancel();
    }

    getSteps(): WizardStep[] {
        return this._steps;
    }

    getStepIndexFromId(id: string): number {
        const index = this._steps.findIndex((step) => step.id === id);
        return index;
    }

    /**
     * @returns True if the ID exists in one of the steps
     */
    containsStep(stepId: string): boolean {
        return this.getStepIndexFromId(stepId) >= 0;
    }

    getCurrentStepId(): string {
        return this.getCurrentStep().id;
    }

    getCurrentStepIndex(): number {
        return this._currentIndex;
    }

    getCurrentStep(): WizardStep {
        return this.getStepWithIndex(this._currentIndex);
    }

    /**
     * @returns The number of steps in the wizard. This should always be equal to the size of the array.
     * returned by [getSteps]{@link WizardManager#getSteps}.
     */
    getStepsCount(): number {
        return this._steps.length;
    }

    getStepWithId(id: string): WizardStep {
        const index = this.getStepIndexFromId(id);
        if (index >= 0) {
            return this.getStepWithIndex(index);
        }
        return null;
    }

    getStepWithIndex(index: number): WizardStep {
        if (index >= 0 && index < this.getStepsCount()) {
            return this._steps[index];
        }
        throw new Error('wizardService.getStepForIndex - Index out of bounds: ' + index);
    }

    private validateConfig(config: WizardConfig): void {
        if (!config.steps || config.steps.length <= 0) {
            throw new Error('Invalid WizardService configuration - no steps provided');
        }

        config.steps.forEach((step) => {
            if (!step.templateUrl && !step.component) {
                throw new Error(
                    `Invalid WizardService configuration - Step missing a templateUrl or component: ${step}`
                );
            }
        });
    }

    private validateStepUids(steps: WizardStep[]): void {
        const stepIds: TypedMap<string> = {};
        steps.forEach((step) => {
            if (!step.id) {
                step.id = this.stringUtils.generateIdentifier();
            } else if (stepIds[step.id]) {
                throw new Error(`Invalid (Duplicate) step id: ${step.id}`);
            } else {
                stepIds[step.id] = step.id;
            }
        });
    }
}
