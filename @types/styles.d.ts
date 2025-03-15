export namespace StyleSheet {
    type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

    /**
     * Creates a StyleSheet style reference from the given object.
     */
    export function create<T extends NamedStyles<T> | NamedStyles<any>>(
        styles: T | NamedStyles<T>,
    ): T;
}