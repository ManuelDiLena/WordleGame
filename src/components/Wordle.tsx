import { useEffect, useState } from 'react';
import Box from './Box';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';
import { GameStatus } from './types';
import { useWindow } from '../hooks/useWindow';

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
]

export default function Wordle() {

    const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
    const [turn, setTurn] = useState<number>(1);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [completedWords, setCompletedWords] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

    useWindow('keydown', handleKeydown)

    useEffect(() => {
        setWordOfTheDay('break')
    })

    function handleKeydown(event:KeyboardEvent) {
        const letter = event.key.toUpperCase()

        // Valid when deleted
        if (event.key === 'Backspace' && currentWord.length > 0) {
            onDelete()
            return
        }

        if (event.key === 'Enter') {
            return
        }

        if (currentWord.length >= 5) {
            return
        }

        // Enter letter to state
        if (keys.includes(letter)) {
            onInput(letter)
            return
        }
    }

    // Function that writes the letters of the boxes
    function onInput(letter:string) {
        const newWord = currentWord + letter
        setCurrentWord(newWord)
    }

    // Function that deletes the letters of the boxes
    function onDelete() {
        const newWord = currentWord.slice(0, -1)
        setCurrentWord(newWord)
    }

    return (
        <div>
           <RowCompleted word='sabio' solution={wordOfTheDay} />
           <RowCompleted word='sabio' solution={wordOfTheDay} />
           <RowCurrent word={currentWord} />
           <RowEmpty />
           <RowEmpty />
           <RowEmpty />
        </div>
    );
}