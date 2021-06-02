import { IconDefinition } from "@fortawesome/fontawesome-common-types"

export type MultiActionButtonProps = {
    onPressMainAction: (event: GestureResponderEvent) => void,
    onPressSecondaryAction: (event: GestureResponderEvent) => void,
    mainTitle: string,
    secondaryTitle: string,
    secondarySymbol: IconDefinition,
}

export type FlexingMultiActionButtonProps = {
    onPressMainAction: (event: GestureResponderEvent) => void,
    onPressSecondaryAction: (event: GestureResponderEvent) => void,
    titles: Array<string>,
    layout: Array<number>,
    secondaryTitle: string,
    secondarySymbol: IconDefinition,
}

export type SearchBoxProps = {
    value: string,
    onChangeText: (text: string) => void
    onFocus?: (focued: boolean) => void;
    classOverride?: NamedStyles,
}

export type InlineTextInputWithLabelProps = {
    label: string
    value: string
    onChangeText: (text: string) => void
}

export type DoubleTextLayoutProps = {
    label: string
    content: string
}

export type SelectableListItemProps = {
    onPress: (event: GestureResponderEvent) => void,
    titles: Array<string>
    flexLayout: Array<number>
}

export type AppButtonProps = {
    onPress: (event: GestureResponderEvent) => void,
    title: string
    styleOverrides?: StyleProp<TextStyle>
}

export type SymbolButtonProps = {
    onPress: (event: GestureResponderEvent) => void,
    title: string,
    symbol: IconDefinition,
}
