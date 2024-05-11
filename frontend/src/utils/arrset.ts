export function doDiff<Tp>(a: Tp[], b: Tp[]): Tp[] {
    return a.filter(x => !b.includes(x));
}

export function doInter<Tp>(a: Tp[], b: Tp[]): Tp[] {
    return a.filter(e => b.includes(e));
}