import { CMSItem, IEditorModalService } from 'cmscommons';
interface NestedComponentInfo {
    componentType: string;
    componentUuid: string;
    content: {
        visible?: boolean;
        catalogVersion: string;
    };
}
export declare class NestedComponentManagementService {
    private editorModalService;
    constructor(editorModalService: IEditorModalService);
    openNestedComponentEditor(componentInfo: NestedComponentInfo, editorStackId: string): Promise<CMSItem>;
    private prepareComponentAttributes;
}
export {};
