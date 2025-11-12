export function substrAtWhitespace(str, m) {
    if (!str||!m) {
        throw new Error('substrAtWhitespace requires 2 variables')
    }
    if (str.length <= m) {
        return str;
    }
    let index = -1;
    for (let i = 0; i < m; ++i) {
        if (str.charAt(i) === ' ') {
            console.log(`"${str.charAt(i)}" is not a space`)
            index = i + 1; //bc substring is exclusive
        }
    }
    if (index == -1) {
        return str.substring(0, m-3).concat("...");
    } 
    else {
        return str.substring(0, index);
    }
}
//  // TEST
//     const strings = ["Biography", "Tutoring Available Now", "Spelling Bee Helper", "Tic Tac Toe", "Desmos Algebra", "Porter: Figma App", "Optics", "Internet Addiction Presentation", "Wordle", "Physics-Diff Eq"];
//     for (let i = 0; i < strings.length; ++i) {
//        console.log(substrAtWhitespace(strings[i], 20));
//     }
