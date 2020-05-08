import React, { ReactComponentElement } from "react";
import { Card, Row, Col, Typography } from "antd";
import styles from "./styles.module.scss";
import { CardProps } from "antd/lib/card";


const OptionsCard: React.FC<CardProps & { icon: any; title: string }> = ({
  icon: Icon,
  title,
  ...props
}) => {
  return (
    <Card
      hoverable={true}
      className={styles.topNotch}
      style={{ width: 210 }}
      {...props}
    >
      <Row gutter={15} justify="center">
        <Col>
          <Icon />
        </Col>
        <Col>
          <Typography.Text type="secondary"> {title}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default OptionsCard;
