import { Type } from '@angular/core';
import { IFeature } from './IFeature';
import { IPrioritized } from './IPrioritized';
/**
 * Interface for ToolbarItemInternal
 */
export interface IToolbarItem extends IFeature, IPrioritized {
    /**
     * List of classes used to display icons from fonts
     */
    iconClassName?: string;
    /**
     * A list of image URLs for the icon images to be displayed in the toolbar for the items. The images are only available for ACTION and HYBRID_ACTION toolbar items.
     */
    icons?: string[];
    /**
     * Component responsible for rendering the template
     */
    component?: Type<any>;
    /**
     * **Deprecated since 2005, use {@link IToolbarItem.component}.**
     *
     * The URL to the HTML template. By default, templates are available for TEMPLATE and HYBRID_ACTION toolbar items.
     *
     * @deprecated
     */
    include?: string;
    /**
     * **Deprecated since 2005, use {@link IToolbarItem.contextComponent}.**
     *
     * The template of the context to be displayed.
     *
     * @deprecated
     */
    contextTemplate?: string;
    /**
     * **Deprecated since 2005, use {@link IToolbarItem.contextComponent}.**
     *
     * The templateUrl that prints the context associated to the toolbar item.
     *
     * @deprecated
     */
    contextTemplateUrl?: string;
    /**
     * Component that represents the context associated to the toolbar item.
     */
    contextComponent?: Type<any>;
    /**
     * Keeps the dropdown content in the DOM on close.
     */
    keepAliveOnClose?: boolean;
    /**
     * Determines the sections(left, middle or right) of the item in the toolbar.
     */
    section?: string;
    /**
     * Determines the position(left, middle or right) of the dropdown menu.
     */
    dropdownPosition?: string;
    /**
     * The key that uniquely identifies the toolbar that the feature is added to.
     */
    toolbarId: string;
    /**
     * The type of toolbar item. The possible value are: TEMPLATE, ACTION, and HYBRID_ACTION.
     */
    type: string;
    /**
     * The callback that is triggered when the toolbar action item is clicked.
     */
    callback?: () => void;
}
