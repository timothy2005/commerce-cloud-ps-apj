/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import {
    IDropdownMenuItem,
    ITreeNodeItem,
    NavigationNode,
    NavigationNodeItem,
    NavigationNodeItemDTO,
    SeDowngradeComponent,
    TreeComponent,
    TREE_NODE
} from 'smarteditcommons';
import { NavigationTreeActions } from '../../../../../navigation/navigationEditor/types';

@SeDowngradeComponent()
@Component({
    selector: 'se-product-node',
    templateUrl: './ProductNodeComponent.html',
    styleUrls: ['../ProductRowContainer.scss', '../../ProductRow.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductNodeComponent {
    public dropdownItems: IDropdownMenuItem[];

    constructor(
        @Inject(TREE_NODE) public node: ITreeNodeItem<NavigationNode>,
        @Inject(forwardRef(() => TreeComponent))
        private parent: TreeComponent<NavigationNodeItem, NavigationNodeItemDTO>
    ) {
        const { getDropdownItems } = (this.parent.nodeActions as unknown) as NavigationTreeActions;

        this.dropdownItems = getDropdownItems();
    }
}
