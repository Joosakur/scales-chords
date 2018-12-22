export interface RootState {
    readonly scale: ScaleState
}

export interface ScaleState {
    readonly search: ScaleSearchState
}

export interface ScaleSearchState {
    readonly value: string,
    readonly results: ScaleListEntry [],
    readonly isLoading: boolean
}

export interface ScaleListEntry {
    readonly name: string
    readonly scaleNumber: number
}
