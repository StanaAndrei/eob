export function doDiff<Tp>(a: Tp[], b: Tp[]) {
    return a.filter(x => !b.includes(x));
}
