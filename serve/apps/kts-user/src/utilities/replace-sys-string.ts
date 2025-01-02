export function replaceSysString(val: string, first: string = '\\', second: string = '/'): string {
    const valReturn: string = val.replaceAll(first, second);
    return valReturn
}
