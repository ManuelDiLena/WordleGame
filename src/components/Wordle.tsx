import Box from './Box';
import RowCompleted from './RowCompleted';
import RowEmpty from './RowEmpty';

export default function Wordle() {
    return (
        <div>
           <RowCompleted word='sabio' solution='break' />
           <RowEmpty />
           <RowEmpty />
           <RowEmpty />
        </div>
    );
}