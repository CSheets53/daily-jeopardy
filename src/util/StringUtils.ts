const findCommonAlphanumericChars = (str1: string, str2: string) => {
    const regex = /[^A-Za-z0-9]+/g;
    const set1 = str1.replace(regex, '').split('');
    const set2 = str2.replace(regex, '').split('');

    return [...set1].filter((char) => set2.includes(char));
}

export const removeTags = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '');
}

export const underscoreString = (guessedAnswer: string, realAnswer: string) => {
    // get matching alphanumeric characters between strings
    const matchingChars = findCommonAlphanumericChars(guessedAnswer, realAnswer);

    // matches any alphanumeric character except for ones user guessed
    const regex = new RegExp(`(?![${matchingChars.join('')}])[A-Za-z0-9]`, 'g');

    // make all words split into _ _ _
    const words = realAnswer.split(' ');
    const underscoredWords = words.map(word => word.replace(regex, " _"));
    return underscoredWords.join(" | ");
}
