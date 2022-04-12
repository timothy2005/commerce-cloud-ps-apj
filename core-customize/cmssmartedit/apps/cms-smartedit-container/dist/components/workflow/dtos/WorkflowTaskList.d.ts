import { Pagination } from 'smarteditcommons';
import { WorkflowTask } from './WorkflowTask';
/**
 * Represent a Workflow Task List.
 */
export interface WorkflowTaskList {
    tasks: WorkflowTask[];
    pagination: Pagination;
}
