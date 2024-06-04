import React, { useState, useEffect } from 'react';
import styles from '../css/Notice.module.css';

export default function NoticeBox() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch(`${baseURL}/api/notice_select`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ count: 3 }) // Sending count as a POST parameter
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch notices');
                }
                const data = await response.json();
                setNotices(data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []); // Empty dependency array to ensure the effect runs only once on component mount

    return (
        <div className={styles.container}>
            {notices.map((notice, index) => (
                <div key={index} className={styles.box}>
                    <p className={`${styles['text-block']} ${styles.title}`}>{notice.title}</p>
                    <p className={styles['text-block']}>{notice.content}</p>
                </div>
            ))}
        </div>
    );
}

let baseURL = '';
if (process.env.NODE_ENV === 'development') {
    // If in development environment, use local IP
    baseURL = 'http://121.139.20.242:5100';
}
