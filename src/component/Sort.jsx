import React, { useState } from 'react';
import styles from '../css/Sort.module.css';
import { ReactComponent as SortIcon } from '../svg/SortIcon.svg';

export default function Sort() {
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sort') || '');

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        localStorage.setItem('sort', order);
        printLocalStorage();
    };
    const printLocalStorage = () => {
        console.log('Current Local Storage:', JSON.stringify(localStorage, null, 2));
    };

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.filterContainer}>
                    <SortIcon className={styles.icon} />
                    <p className={styles.filterLabel}>정렬</p>
                </div>
                <div className={styles.buttonGroup}>
                    <div
                        className={`${styles.button} ${sortOrder === '조회순' ? styles.active : ''}`}
                        onClick={() => handleSortOrderChange('notice_views')}
                    >
                        조회순
                    </div>
                    <div
                        className={`${styles.button} ${sortOrder === '최신순' ? styles.active : ''}`}
                        onClick={() => handleSortOrderChange('notice_date')}
                    >
                        최신순
                    </div>
                </div>
            </div>
        </div>
    );
}
