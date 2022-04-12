/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SimpleChange } from '@angular/core';
import { MediaFormatComponent } from 'cmssmarteditcontainer/components/genericEditor/media/components';
import { Media, MediaService } from 'cmssmarteditcontainer/components/genericEditor/media/services';
import { createSimulateNgOnChanges } from 'testhelpers';

describe('MediaFormatComponent', () => {
    const media = {} as Media;
    let mediaService: jasmine.SpyObj<MediaService>;

    let component: MediaFormatComponent;

    type Input = Partial<Pick<typeof component, 'mediaUuid'>>;
    let simulateNgOnChanges: ReturnType<typeof createSimulateNgOnChanges>;
    beforeEach(() => {
        mediaService = jasmine.createSpyObj<MediaService>('mediaService', ['getMedia']);
        mediaService.getMedia.and.returnValue(Promise.resolve(media));

        component = new MediaFormatComponent(mediaService);

        simulateNgOnChanges = createSimulateNgOnChanges<Input>(component);
    });

    it('GIVEN mediaUuid WHEN initialized THEN it fetches and sets the media', async () => {
        const uuid = '123';
        component.mediaUuid = uuid;

        await component.ngOnInit();

        expect(component.media).toBe(media);
        expect(mediaService.getMedia).toHaveBeenCalledWith(uuid);
    });

    it('GIVEN mediaUuid has changed AND is first change THEN should not fetch and set the media', () => {
        simulateNgOnChanges({
            mediaUuid: new SimpleChange(undefined, '123', true)
        });

        expect(component.media).toBeNull();
        expect(mediaService.getMedia).not.toHaveBeenCalled();
    });

    it('GIVEN mediaUuid has changed AND it is not a first change THEN it fetches and sets the media properly', async () => {
        const uuid = '123';
        await simulateNgOnChanges({
            mediaUuid: new SimpleChange(undefined, uuid, false)
        });

        expect(component.media).toBe(media);
        expect(mediaService.getMedia).toHaveBeenCalledWith(uuid);
    });
});
