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

const Label = ({ children }) => {
  return <span className={styles.label}>{children}</span>;
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
        className={styles.headerOveride}
        title={<Logo />}
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
          <Col span={24}>
            <Descriptions size="small" column={4}>
              <Descriptions.Item label={<Label>Date</Label>}>
                {new Date().toDateString()}
              </Descriptions.Item>
              <Descriptions.Item label={<Label>Time (EST)</Label>}>
                {estTime}
              </Descriptions.Item>
              <Descriptions.Item label={<Label>Time Worked</Label>}>
                {`${totalWorkTime.hours}:${totalWorkTime.minutes}`}
              </Descriptions.Item>
              <Descriptions.Item label={<Label>Total Time</Label>}>
                {`${allTimersTotal.hours}:${allTimersTotal.minutes}`}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </PageHeader>
    </div>
  );
}
