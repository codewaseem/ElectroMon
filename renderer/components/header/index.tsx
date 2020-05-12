import { PageHeader, Button, Statistic, Descriptions, Row, Col } from "antd";
import styles from "./header.module.scss";
import { TimerContext } from "../../context";
import React, { useContext, useState, useEffect } from "react";
import { WORK_TIMER } from "../../../constants";
import ApplyLeaveModal from "../leave-model";
import Logo from "../Logo";
import moment from "moment-timezone";

const getEstTime = () => moment.tz("America/Panama").format("HH:mm:ss");

const Prefix = ({ children }) => {
  return <span className={styles.prefix}>{children}</span>;
};

const StatsTitle = ({ children }) => {
  return <span className={styles.statsTitle}>{children} </span>;
};

export default function AppHeader() {
  const timersManager = useContext(TimerContext);
  const [totalWorkTime, setTotalWorkTime] = useState(
    timersManager.getTotalTimeObjectFor(WORK_TIMER)
  );
  const [allTimersTotal, setAllTimersTotal] = useState(
    timersManager.getTotalTimeObject()
  );

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [estTime, setEstTime] = useState(getEstTime());
  useEffect(() => {
    let id = setTimeout(() => {
      setTotalWorkTime(timersManager.getTotalTimeObjectFor(WORK_TIMER));
      setAllTimersTotal(timersManager.getTotalTimeObject());
      setEstTime(getEstTime());
    });

    return () => clearTimeout(id);
  });

  return (
    <div>
      <PageHeader
        className={styles.removeSpacing}
        title={<Logo />}
        subTitle="Dashboard"
        extra={[
          <Button onClick={() => setVisible(true)} key="3">
            Apply Leave
          </Button>,
          <Button key="2">View Logs</Button>,
          <Button key="1" type="primary">
            Exit
          </Button>,
        ]}
      >
        <ApplyLeaveModal
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={() => {}}
          onCancel={() => setVisible(false)}
        />
        <Row align="middle" justify="space-between">
          <Col span={12}>
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="Date">
                {new Date().toDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Time (EST)">
                {estTime}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          {/* <Statistic title="Status" value="Active" /> */}
          <Col>
            <Row className={styles.statsTitle}>
              <Statistic
                title={<StatsTitle>Time Worked</StatsTitle>}
                prefix={<Prefix>⧗</Prefix>}
                value={`${totalWorkTime.hours}:${totalWorkTime.minutes}`}
                style={{
                  marginRight: 36,
                }}
              />
              <Statistic
                title={<StatsTitle>Total Time</StatsTitle>}
                prefix={<Prefix>⧗</Prefix>}
                value={`${allTimersTotal.hours}:${allTimersTotal.minutes}`}
                valueStyle={{ textAlign: "right" }}
              />
            </Row>
          </Col>
        </Row>
      </PageHeader>
    </div>
  );
}
