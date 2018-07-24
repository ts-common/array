export type Callback<T, R> = (value: T, index: number, array: ImmutableArray<T>) => R

export interface Filter<T> {
    <S extends T>(
        callbackfn: (value: T, index: number, array: ImmutableArray<T>) => value is S,
        // tslint:disable-next-line:no-any
        thisArg?: any,
    ): S[];
    // tslint:disable-next-line:no-any
    (callbackfn: Callback<T, any>, thisArg?: any): T[];
}

export type ReduceCallback<T, U> = (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: ImmutableArray<T>,
) => U

export interface Reduce<T> {
    (callbackfn: ReduceCallback<T, T>, initialValue?: T): T
    <U>(callbackfn: ReduceCallback<U, T>, initialValue: U): U;
}

// tslint:disable-next-line:no-any
export type ForEach<T, U> = (callbackfn: Callback<T, U>, thisArg?: any) => U

export interface ImmutableArray<T> extends Array<T> {
    readonly [x: number]: T
    readonly push: never
    readonly pop: never
    readonly shift: never
    readonly sort: never
    readonly unshift: never
    readonly every: ForEach<T, boolean>
    readonly some: ForEach<T, boolean>
    readonly forEach: ForEach<T, void>
    // tslint:disable-next-line:no-any
    readonly map: <U>(callbackfn: Callback<T, U>, thisArg?: any) => U[]
    readonly filter: Filter<T>
    readonly reduce: Reduce<T>;
    readonly reduceRight: Reduce<T>
}

export function create<T>(...v: T[]): ImmutableArray<T> {
    return v as ImmutableArray<T>
}
