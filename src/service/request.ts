import { WORDS } from './words';

// Function to get word from array
function getWords() {
    return WORDS
}

// Function to get a different word every day
export function getWordOfTheDay() {
    const words = getWords();
    const wordOfTheDay = words[getRandomNumber()]
    return wordOfTheDay.toUpperCase()
}

console.log(getWordOfTheDay())

// Function to validate that it is an existing word
export async function isValidWord(word:string) {
    try {
        const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        const response = await fetch(URL)
        if (response.status !== 200) throw new Error('Request Failed')
        const json = await response.json()

        return json.length
    } catch (e) {
        console.log(e)
        return false
    }

    // const words = getWords()
    // return words.includes(word.toLowerCase())
}

// Funcion to get a random word
function getRandomNumber():number {
    const currentDay = new Date().getUTCDate();
    const storedDay = localStorage.getItem('randomNumberDay');

    if (storedDay !== currentDay.toString()) {
        const randomNumber = Math.floor(Math.random() * 80) + 1;
        localStorage.setItem('randomNumber', randomNumber.toString());
        localStorage.setItem('randomNumberDay', currentDay.toString());
    }

    return parseInt(localStorage.getItem('randomNumber') || '0');
}
