import Box from './Box';
import RowCompleted from './RowCompleted';
import RowCurrent from './RowCurrent';
import RowEmpty from './RowEmpty';

export default function Wordle() {
    return (
        <div>
           <RowCompleted word='sabio' solution='break' />
           <RowCurrent word='saba' />
           <RowEmpty />
           <RowEmpty />
           <RowEmpty />
        </div>
    );
}