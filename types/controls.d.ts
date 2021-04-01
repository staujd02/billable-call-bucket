export type MultiActionButtonProps = {
    onPressMainAction: (event: GestureResponderEvent) => void,
    onPressSecondaryAction: (event: GestureResponderEvent) => void,
    mainTitle: string,
    secondaryTitle: string,
    secondarySymbol: string,
}

export type SearchBoxProps = {
    value: string,
    onChangeText: (text: string) => void
}

export type SelectableListItemProps = {
    onPress: (event: GestureResponderEvent) => void,
    titles: Array<string>
    flexLayout: Array<number>
}

export type AppButtonProps = {
    onPress: (event: GestureResponderEvent) => void,
    title: string
}

export type SymbolButtonProps = {
    onPress: (event: GestureResponderEvent) => void,
    title: string,
    symbol: string,
}
