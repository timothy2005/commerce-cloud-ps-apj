/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { WorkflowAction } from './WorkflowAction';
import { WorkflowStatus } from './WorkflowStatus';

/**
 * Interface used by {@link WorkflowService} to represent a workflow.
 */
export interface Workflow {
    workflowCode: string;
    templateCode: string;
    description?: string;
    attachments?: string[];
    status?: WorkflowStatus;
    actions?: WorkflowAction[];
    isAvailableForCurrentPrincipal: boolean;
}
