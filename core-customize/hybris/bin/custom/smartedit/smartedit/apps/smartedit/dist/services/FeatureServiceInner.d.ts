import { CloneableUtils, IContextualMenuButton, IContextualMenuService, IDecorator, IDecoratorService, IFeatureService, LogService } from 'smarteditcommons';
/** @internal */
export declare class FeatureService extends IFeatureService {
    private logService;
    private decoratorService;
    private contextualMenuService;
    constructor(logService: LogService, decoratorService: IDecoratorService, cloneableUtils: CloneableUtils, contextualMenuService: IContextualMenuService);
    addDecorator(configuration: IDecorator): Promise<void>;
    addContextualMenuButton(item: IContextualMenuButton): Promise<void>;
    protected _remoteEnablingFromInner(key: string): Promise<void>;
    protected _remoteDisablingFromInner(key: string): Promise<void>;
}
