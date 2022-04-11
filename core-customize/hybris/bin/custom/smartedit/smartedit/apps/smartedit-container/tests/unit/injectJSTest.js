/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('functionsModule - injectJS', function () {
    let injectorMockHolder;
    let injectJS;
    const appLocations = ['SEContainerLocationForAppA', 'SEContainerLocationForAppB'];

    beforeEach(angular.mock.module('functionsModule'));
    beforeEach(inject(function (_injectJS_) {
        injectJS = _injectJS_;
    }));

    it('injectJS will injects all sources in sequence and then call an optional callback', function () {
        injectorMockHolder = jasmine.createSpyObj('injectorMockHolder', ['scriptJSMock']);
        injectorMockHolder.scriptJSMock.and.callFake(function (url, scriptCallback) {
            scriptCallback();
        });

        const callback = jasmine.createSpy('callback');
        spyOn(injectJS, 'getInjector').and.returnValue(injectorMockHolder.scriptJSMock);
        injectJS.execute({
            srcs: appLocations,
            callback
        });

        expect(injectorMockHolder.scriptJSMock.calls.count()).toBe(2);

        expect(injectorMockHolder.scriptJSMock.calls.argsFor(0)[0]).toEqualData(
            'SEContainerLocationForAppA',
            jasmine.any(Function)
        );
        expect(injectorMockHolder.scriptJSMock.calls.argsFor(1)[0]).toEqualData(
            'SEContainerLocationForAppB',
            jasmine.any(Function)
        );
        expect(callback).toHaveBeenCalled();
    });
});
