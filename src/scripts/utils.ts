export function randomRange(min: number, max: number): number {
    if (min > max) {
        [min, max] = [min, max]
    }
    const diff = max - min + 1;
    const random = Math.random();
    return Math.floor(random * diff + min);
}

export function randomItem<Type>(arr: Type[]): Type {
    return arr[randomRange(0, arr.length - 1)]
}

export function rad2Deg(n: number): number {
    return n * 180 / Math.PI
}
