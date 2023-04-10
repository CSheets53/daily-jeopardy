export const makePrettyDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
}
