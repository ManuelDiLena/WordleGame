import { useEffect, useState } from 'react';
import { useWindow } from '../hooks/useWindow';
//import Box from './Box';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';
import { GameStatus } from './types';
import { getWordOfTheDay, isValidWord } from '../service/request';
import styles from '../styles/wordle.module.scss';
import Keyboard from './Keyboard';
import Modal from './Modal';

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


    // Function to get a word
    useEffect(() => {
        setWordOfTheDay(getWordOfTheDay())
    }, [])

    function handleKeydown(event:KeyboardEvent) {
        const key = event.key.toUpperCase()

        onKeyPressed(key)
    }

    function onKeyPressed(key:string) {
        // Validate if the game ended so you can't enter anymore
        if (gameStatus !== GameStatus.Playing) {
            return
        }

        // Valid when deleted
        if (key === 'BACKSPACE' && currentWord.length > 0) {
            onDelete()
            return
        }

        // Validates when we hit enter
        if (key === 'ENTER' && currentWord.length === 5 && turn <= 6) {
            onEnter()
            return
        }

        if (currentWord.length >= 5) {
            return
        }

        // Enter letter to state
        if (keys.includes(key)) {
            onInput(key)
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

    // Function that analyzes all the possibilities when pressing enter
    async function onEnter() {
        // Player won
        if (currentWord === wordOfTheDay) {
            setCompletedWords([...completedWords, currentWord])
            setGameStatus(GameStatus.Won)
            return
        }

        // Player lost
        if (turn === 6) {
            setCompletedWords([...completedWords, currentWord])
            setGameStatus(GameStatus.Lost)
            return
        }

        // Check if the word exists
        const validWord = await isValidWord(currentWord)

        if (currentWord.length === 5 && !validWord) {
            alert('Not a valid word')
            return
        }

        // Else
        setCompletedWords([...completedWords, currentWord])
        setTurn(turn + 1)
        setCurrentWord('')
    }

    return (
        <>
            {
                gameStatus === GameStatus.Won ? (
                    <Modal 
                        type='won'
                        completedWords={completedWords}
                        solution={wordOfTheDay}
                    />
                ) : gameStatus === GameStatus.Lost ? (
                    <Modal 
                        type='lost'
                        completedWords={completedWords}
                        solution={wordOfTheDay}
                    />
                ) : null
            }
            <div className={styles.mainContainer}>
                {
                    completedWords.map((word, i) => (
                        <RowCompleted
                            key={i}
                            word={word}
                            solution={wordOfTheDay}
                            animate={true}
                        />
                    ))
                }
                {
                    gameStatus === GameStatus.Playing ? (
                        <RowCurrent word={currentWord} />
                    ) : null
                }
                {
                    Array.from(Array(6 - turn)).map((_, i) => (
                        <RowEmpty key={i} />
                    ))
                }
            </div>
            <Keyboard keys={keys} onKeyPressed={onInput} />
        </>
    );
}