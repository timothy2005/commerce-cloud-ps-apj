/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
window.sfConfigManager.registerLayout('TEST_CMS_LAYOUT', {
    pageId: 'test_CMS_layout_page_id',
    catalogVersion: 'test_CMS_layout-catalog-version',
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
