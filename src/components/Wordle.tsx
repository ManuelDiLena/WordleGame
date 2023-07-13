import { useEffect, useState } from 'react';
import Box from './Box';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';
import { GameStatus } from './types';

export default function Wordle() {

    const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
    const [turn, setTurn] = useState<number>(1);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [completedWords, setCompletedWords] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

    useEffect(() => {
        setWordOfTheDay('break')
    })

    return (
        <div>
           <RowCompleted word='sabio' solution={wordOfTheDay} />
           <RowCompleted word='sabio' solution={wordOfTheDay} />
           <RowCurrent word='saba' />
           <RowEmpty />
           <RowEmpty />
           <RowEmpty />
        </div>
    );
}