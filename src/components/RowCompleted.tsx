import Box from './Box';
import { BoxStatus } from './types';
import styles from '../styles/row.module.scss';

interface RowCompletedProps {
    word:string;
    solution:string;
    animate:boolean;
}

export default function RowCompleted({ word, solution, animate=false }:RowCompletedProps) {

    const arr = Array.from(Array(5));

    // Function to check the letter of each box
    function checkLetter(letter:string, pos:number):BoxStatus {
        if (solution.includes(letter)) {
            if (solution[pos] === letter) {
                return 'correct'
            } else {
                return 'present'
            }
        } else {
            return 'absent'
        }
    }

    return (
        <div className={styles.row}>
            {
               arr.map((_, i) => (
                <Box 
                    key={i}
                    value={word[i]}
                    status={checkLetter(word[i], i)}
                    animate={animate}
                    pos={i}
                />
               ))
            }
        </div>
    );
}