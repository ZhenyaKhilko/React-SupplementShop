import React from 'react';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not Found
      </h1>
      <p className={styles.description}>Sorry, this page is not available in our shop.</p>
    </div>
  );
};

export default NotFound;
