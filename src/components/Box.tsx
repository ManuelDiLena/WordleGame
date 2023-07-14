import { BoxStatus } from './types';
import styles from '../styles/box.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const classes = classNames.bind(styles);

interface BoxProps {
    value: string;
    status: BoxStatus;
    animate?: boolean;
    pos?: number;
}

export default function Box({ value='', status, animate=false, pos }: BoxProps) {

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