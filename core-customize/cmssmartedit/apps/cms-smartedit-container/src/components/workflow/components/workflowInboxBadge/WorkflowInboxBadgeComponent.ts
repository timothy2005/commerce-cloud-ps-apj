/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SeDowngradeComponent } from 'smarteditcommons';
import { WorkflowService } from '../../services/WorkflowService';

@SeDowngradeComponent()
@Component({
    selector: 'se-workflow-inbox-badge',
    templateUrl: './WorkflowInboxBadgeComponent.html',
    styleUrls: ['./WorkflowInboxBadgeComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowInboxBadgeComponent {
    public inboxCount$: Observable<number>;

    constructor(private workflowService: WorkflowService) {}

    ngOnInit(): void {
        this.inboxCount$ = this.workflowService.getTotalNumberOfActiveWorkflowTasks();
    }

    public stringifyCount(count: number): string {
        return count <= 99 ? String(count) : '99+';
    }
}
