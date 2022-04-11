import * as angular from 'angular';
import '../genericEditor/genericEditor.scss';
/**
 * **Deprecated since 2005, use {@link GenericEditorComponent}.**
 *
 * Component responsible for generating custom HTML CRUD form for any smarteditComponent type.
 *
 * The controller has a method that creates a new instance for the {@link GenericEditorFactoryService}
 * and sets the scope of smarteditComponentId and smarteditComponentType to a value that has been extracted from the original DOM element in the storefront.
 *
 * ### Parameters
 *
 * `id` - Id of the current generic editor.
 *
 * `smarteditComponentType` - The SmartEdit component type that is to be created, read, updated, or deleted.
 *
 * `smarteditComponentId` - The identifier of the SmartEdit component that is to be created, read, updated, or deleted.
 *
 * `structureApi` - The data binding to a REST Structure API that fulfills the contract described in the  {@link GenericEditorFactoryService} service. Only the Structure API or the local structure must be set.
 *
 * `structure` - The data binding to a REST Structure JSON that fulfills the contract described in the {@link GenericEditorFactoryService} service. Only the Structure API or the local structure must be set.
 *
 * `contentApi` - The REST API used to create, read, update, or delete content.
 *
 * `content` - The model for the generic editor (the initial content when the component is being edited).
 *
 * `uriContext` - is an optional parameter and is used to pass the uri Params which can be used in making
 *
 * api calls in custom widgets. It is an optional parameter and if not found, generic editor will find an experience in
 * sharedDataService and set this uriContext.
 * `submit` - It exposes the inner submit function to the invoker scope. If this parameter is set, the directive will not display an inner submit button.
 *
 * `reset` - It exposes the inner reset function to the invoker scope. If this parameter is set, the directive will not display an inner cancel button.
 *
 * `isDirty` - Indicates if the the generic editor is in a pristine state (for example: has been modified).
 *
 * `isValid` - Indicates if all of the containing forms and controls in the generic editor are valid.
 *
 * `getApi` - Exposes the generic editor's api object
 *
 * `updateCallback` - Callback called at the end of a successful submit. It is invoked with two arguments: the pristine object and the response from the server.
 *
 * `customOnSubmit` - It exposes the inner onSubmit function to the invoker scope. If the parameter is set, the inner onSubmit function is overridden by the custom function and the custom function must return a promise in the response format expected by the generic editor.
 *
 * `editorStackId` - When working with nested components, a generic editor can be opened from within another editor. This parameter is used to specify the stack of nested editors.
 *
 * @deprecated
 */
export declare class GenericEditorComponent {
    private $attrs;
    submit: () => void;
    reset: () => void;
    isDirty: () => boolean;
    isValid: () => boolean;
    constructor($attrs: angular.IAttributes);
    $onInit(): void;
}
