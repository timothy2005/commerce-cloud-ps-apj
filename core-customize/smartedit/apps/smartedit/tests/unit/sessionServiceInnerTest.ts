/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';
import { SessionService } from 'smartedit/services';
import { annotationService, GatewayProxied } from 'smarteditcommons';

describe('inner sessionService', () => {
    let sessionService: SessionService;

    beforeEach(() => {
        sessionService = new SessionService();
    });

    it('initializes and invokes gatewayProxy', function () {
        expect(annotationService.getClassAnnotation(SessionService, GatewayProxied)).toEqual([]);
    });

    it('leaves all interface functions unimplemented', function () {
        expect(sessionService.getCurrentUsername).toBeEmptyFunction();
        expect(sessionService.getCurrentUserDisplayName).toBeEmptyFunction();
        expect(sessionService.hasUserChanged).toBeEmptyFunction();
        expect(sessionService.resetCurrentUserData).toBeEmptyFunction();
        expect(sessionService.setCurrentUsername).toBeEmptyFunction();
    });
});
