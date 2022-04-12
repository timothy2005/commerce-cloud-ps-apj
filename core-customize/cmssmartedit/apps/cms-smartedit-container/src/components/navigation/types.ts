/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSItem } from 'cmscommons';
import { TypedMap } from 'smarteditcommons';

export { NavigationNode, NavigationNodeEntry } from 'smarteditcommons';

export interface NavigationNodeCMSItem extends CMSItem {
    catalogVersion: string;
    visible: boolean;
    title: TypedMap<string>;
    uuid: string;
    uid: string;
    entries: string[];
    pages: number[];
    itemType: string;
    modifiedtime: Date;
    children: NavigationNodeCMSItem[];
    name: string;
    links: string[];
    creationtime: Date;
}
