/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
unit.mockData.cmsItems = {};
unit.mockData.cmsItems.componentItems = [
    {
        typeCode: 'ContentPage',
        itemtype: 'ContentPage',
        uid: 'somepage1uid',
        uuid: 'somepage1uuid',
        label: 'add-edit-address',
        restrictions: ['someRestriction1Uuid', 'someRestriction2Uuid']
    },
    {
        typeCode: 'SomeCMSRestriction1',
        itemtype: 'SomeCMSRestriction1',
        uid: 'someRestriction1Uid',
        uuid: 'someRestriction1Uuid',
        label: 'add-edit-address'
    },
    {
        typeCode: 'SomeCMSRestriction2',
        itemtype: 'SomeCMSRestriction2',
        uid: 'someRestriction2Uid',
        uuid: 'someRestriction2Uuid',
        label: 'add-edit-address'
    }
];
