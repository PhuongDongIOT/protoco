export function extendLinkImage(val: string) {
    const links = process.env.APP_URL + val;
    return links;
}