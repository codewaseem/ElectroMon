import React from "react";
import styles from "./utils.module.scss"

export const Label = ({ children }) => {
    return <span className={styles.label}>{children}</span>;
};
