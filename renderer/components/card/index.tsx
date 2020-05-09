import React from "react";
import { Card, Typography } from "antd";
import styles from "./card.module.scss";
import { CardProps } from "antd/lib/card";

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

const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

const OptionsCard: React.FC<CardProps & { icon: any; title: string }> = ({
  icon: Icon,
  title,
  children,
  ...props
}) => {
  return (
    <Card
      hoverable={true}
      style={{ width: 210 }}
      {...props}
      className={styles.cardOveride}
    >
      <div className={styles.container}>
        <CardHead icon={Icon} title={title} />
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  );
};

export default OptionsCard;
