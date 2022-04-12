import { IGenericEditorDropdownSelectedOptionEventData } from 'smarteditcommons';
export declare enum LinkToOption {
    content = "content",
    product = "product",
    category = "category",
    external = "external"
}
export interface SelectOption {
    id: LinkToOption;
    structureApiMode: string;
    hasCatalog?: boolean;
}
export declare type SelectedOption = IGenericEditorDropdownSelectedOptionEventData<SelectOption>;
export interface CmsLinkToSelectOption {
    currentSelectedOptionValue: LinkToOption;
    external: boolean;
    linkTo: LinkToOption;
    category?: string;
    product?: string;
    productCatalog?: string;
    contentPage?: string;
    url?: string;
}
