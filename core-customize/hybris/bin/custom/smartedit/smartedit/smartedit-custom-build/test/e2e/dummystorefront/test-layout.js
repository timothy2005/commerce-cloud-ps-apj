/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
window.sfConfigManager.registerLayout('SMARTEDIT_EXT_TEST_LAYOUT', {
    pageId: 'test_layout_page_id',
    catalogVersion: 'test_layout-catalog-version',
    nodeType: 'root',
    children: [
        {
            componentId: 'testSlot',
            componentType: 'ContentSlot',
            nodeType: 'slot',
            children: [
                {
                    componentId: 'testComp',
                    componentType: 'someCompType',
                    nodeType: 'component'
                }
            ]
        }
    ]
});
