import { LocalizedMap } from 'smarteditcommons';
import { WorkflowActionStatus } from './WorkflowActionStatus';
import { WorkflowDecision } from './WorkflowDecision';
/**
 * Interface used by {@link WorkflowService} to query a workflow action.
 */
export interface WorkflowAction {
    code: string;
    name: LocalizedMap;
    description: LocalizedMap;
    actionType: string;
    status: WorkflowActionStatus;
    startedAgoInMillis: number;
    isCurrentUserParticipant: boolean;
    decisions: WorkflowDecision[];
}
