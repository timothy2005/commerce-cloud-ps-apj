/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import { NG_ROUTE_PREFIX } from '../utils';
import { AuthenticationManager } from './AuthenticationManager';
import { SmarteditRoutingService } from './routing';

describe('AuthenticationManager', () => {
    let manager: AuthenticationManager;
    let routingService: jasmine.SpyObj<SmarteditRoutingService>;

    beforeEach(() => {
        routingService = jasmine.createSpyObj('routingService', ['path', 'go', 'reload']);
        manager = new AuthenticationManager(routingService);
    });

    it('will reload current page if current page is landing page', () => {
        routingService.path.and.callFake((arg: any) => {
            if (!arg) {
                return `/${NG_ROUTE_PREFIX}`;
            }
            return null;
        });

        manager.onLogout();

        expect(routingService.path).toHaveBeenCalled();
        expect(routingService.reload).toHaveBeenCalled();
    });

    it('will reload current page if current page is empty', () => {
        routingService.path.and.callFake((arg: any) => {
            if (!arg) {
                return '';
            }
            return null;
        });

        manager.onLogout();

        expect(routingService.path).toHaveBeenCalledWith();
        expect(routingService.reload).toHaveBeenCalled();
    });

    it('will redirect to landing page if current page is not landing page', () => {
        routingService.path.and.callFake((arg: any) => {
            if (!arg) {
                return '/somepage';
            }
            return null;
        });

        manager.onLogout();

        expect(routingService.path).toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalledWith(NG_ROUTE_PREFIX);
    });
});
