import React from "react";
import { Card, Typography, Switch } from "antd";
import styles from "./styles.module.scss";
import { CardProps } from "antd/lib/card";
import useAsyncWithNotification from "../../hooks/useAsyncWithNotification";

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
  const result = useAsyncWithNotification(
    () => {
      return Promise.resolve();
    },
    {
      success: {
        message: "Success",
        description: "Well done",
      },
    }
  );
  return (
    <Card
      hoverable={true}
      style={{ width: 210 }}
      {...props}
      className={styles.cardOveride}
    >
      <div className={styles.container}>
        <CardHead icon={Icon} title={title} />
        <CardContent>
          <Switch onChange={() => {}} />
          {children}
        </CardContent>
      </div>
    </Card>
  );
};

export default OptionsCard;
