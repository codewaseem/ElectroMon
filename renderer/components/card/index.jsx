import React from "react";
import { Card, Typography } from "antd";
import styles from "./card.module.scss";
import PropTypes from "prop-types";

const CardHead = ({ icon: Icon, title = "" }) => {
  return (
    <div className={styles.cardHead}>
      <span>
        <Icon />
      </span>
      <Typography.Text
        type="secondary"
        style={{ fontSize: "1rem", lineHeight: 1 }}
      >
        {title}
      </Typography.Text>
    </div>
  );
};

CardHead.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

const CardContent = ({ children }) => {
  return <div className={styles.cardContent}>{children}</div>;
};

const OptionsCard = ({ icon: Icon, title, children, invert, ...props }) => {
  return (
    <Card
      style={{ width: 210 }}
      {...props}
      className={`${styles.cardOveride} ${invert && styles.invertColors}`}
    >
      <div className={styles.container}>
        <CardHead icon={Icon} title={title} />
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  );
};

OptionsCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  invert: PropTypes.bool,
};

export default OptionsCard;
