export const underscoreString = (str: string) => {
    // matches any alphanumeric character
    const regex = /[A-Za-z0-9]/g;

    const words = str.split(' ');

    // make all words split into _ _ _
    const underscoredWords = words.map(word => word.replace(regex, " _"));

    // TODO: spaces aren't preserved between words
    return underscoredWords.join(" | ");
}
