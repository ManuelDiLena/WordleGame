import Box from './Box';
import styles from '../styles/row.module.scss';

export default function RowEmpty() {

    const arr = Array.from(Array(5));

    return (
        <div className={styles.row}>
            {
                arr.map((_, i) => (
                    <Box key={i} value='' status='empty' />
                ))
            }
        </div>
    );
}