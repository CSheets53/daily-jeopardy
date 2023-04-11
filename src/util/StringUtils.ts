export const underscoreString = (str: string) => {
    // matches any alphanumeric character
    const regex = /[A-Za-z0-9]/g;

    // get all punctuation marks
    const underscoredStr = str.replace(regex, '_');

    // TODO: spaces aren't preserved between words
    return underscoredStr.split('').join(' ');
}
