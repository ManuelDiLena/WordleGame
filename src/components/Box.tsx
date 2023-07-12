import { BoxStatus } from './types';
import styles from '../styles/box.module.scss';
import classNames from 'classnames/bind';

const classes = classNames.bind(styles);

interface BoxProps {
    value: String;
    status: BoxStatus;
}

export default function Box({ value, status }: BoxProps) {

    const boxStatus = classes({
        correct: status === 'correct',
        present: status === 'present',
        absent: status === 'absent',
        empty: status === 'empty',
        edit: status === 'edit',
    });

    return (
        <div className={boxStatus}>{value}</div>
    );
}