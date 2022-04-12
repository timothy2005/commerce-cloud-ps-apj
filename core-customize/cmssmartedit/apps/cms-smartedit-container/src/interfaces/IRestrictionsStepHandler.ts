/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IRestrictionsStepHandler {
    hideStep(): void;
    showStep(): void;
    isStepValid(): boolean;
    save?(): Promise<void>;
    getStepId(): string;
    goToStep(): void;
}
