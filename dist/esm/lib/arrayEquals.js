export function arrayEquals(a1, a2) {
    if (a1 === a2) {
        return true;
    }
    if (a1.length !== a2.length) {
        return false;
    }
    return a1
        .map(item => a2.includes(item))
        .reduce((a, c) => a && c, true);
}
