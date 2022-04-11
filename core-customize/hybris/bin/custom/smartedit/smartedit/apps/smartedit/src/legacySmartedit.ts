/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { deprecate } from 'smartedit/deprecate';
deprecate();

// eslint-disable-next-line import/order
import * as angular from 'angular';
// eslint-disable-next-line import/order
import { setAngularJSGlobal } from '@angular/upgrade/static';
import { HtmlDirective } from 'smartedit/directives/HtmlDirective';
import { SystemModule } from 'smartedit/modules';
import { LegacySmarteditServicesModule } from 'smartedit/services';
import { instrument, Cloneable, PageSensitiveDirective, SeModule } from 'smarteditcommons';

setAngularJSGlobal(angular);
@SeModule({
    imports: [
        LegacySmarteditServicesModule,
        'templateCacheDecoratorModule',
        'ui.bootstrap',
        'ui.select',
        SystemModule
    ],
    declarations: [HtmlDirective, PageSensitiveDirective],
    config: (
        $provide: angular.auto.IProvideService,
        readObjectStructureFactory: () => (arg: Cloneable) => Cloneable,
        $logProvider: angular.ILogProvider
    ) => {
        'ngInject';

        instrument($provide, readObjectStructureFactory(), 'smartedit');

        $logProvider.debugEnabled(false);
    }
})
export class LegacySmartedit {}
