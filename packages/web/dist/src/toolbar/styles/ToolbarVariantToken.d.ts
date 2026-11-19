import { CSSResult } from "lit";
import { ToolbarVariant } from "../ToolbarVariant";
/** @private */
type _ToolbarVariantToken = {
    containerColor: CSSResult;
    buttonContainerColor: CSSResult;
    selectedButtonContainerColor: CSSResult;
    iconColor: CSSResult;
    selectedIconColor: CSSResult;
    labelColor: CSSResult;
    selectedLabelColor: CSSResult;
    disabled: {
        iconColor: CSSResult;
        iconOpacity: CSSResult;
        labelColor: CSSResult;
        labelOpacity: CSSResult;
    };
    hover: {
        stateLayerColor: CSSResult;
        selectedStateLayerColor: CSSResult;
        stateLayerOpacity: CSSResult;
        iconColor: CSSResult;
        selectedIconColor: CSSResult;
        labelColor: CSSResult;
        selectedLabelColor: CSSResult;
    };
    focus: {
        iconColor: CSSResult;
        stateLayerColor: CSSResult;
        stateLayerOpacity: CSSResult;
        selectedStateLayerColor: CSSResult;
        selectedIconColor: CSSResult;
        labelColor: CSSResult;
        selectedLabelColor: CSSResult;
    };
    pressed: {
        iconColor: CSSResult;
        stateLayerColor: CSSResult;
        stateLayerOpacity: CSSResult;
        selectedStateLayerColor: CSSResult;
        selectedIconColor: CSSResult;
        labelColor: CSSResult;
        selectedLabelColor: CSSResult;
    };
};
/**
 * Component design tokens that control the appearance variants of `M3eToolbarElement`.
 * @internal
 */
export declare const ToolbarVariantToken: Record<ToolbarVariant, _ToolbarVariantToken>;
export {};
//# sourceMappingURL=ToolbarVariantToken.d.ts.map