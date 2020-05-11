import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from "antd";
import styles from "./header.module.scss";
import { TimerContext } from "../../context";
import React, { useContext, useState, useEffect } from "react";
import { WORK_TIMER } from "../../../constants";
import ApplyLeaveModal from "../leave-model";
import Logo from "../Logo";

const Prefix = ({ children }) => {
  return <span className={styles.prefix}>{children}</span>;
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

  useEffect(() => {
    let id = setTimeout(() => {
      setTotalWorkTime(timersManager.getTotalTimeObjectFor(WORK_TIMER));
      setAllTimersTotal(timersManager.getTotalTimeObject());
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
        {/* <Descriptions size="small" column={3}>
          <Descriptions.Item label="User">Name</Descriptions.Item>
          <Descriptions.Item label="">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
        </Descriptions> */}
        <ApplyLeaveModal
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={() => {}}
          onCancel={() => setVisible(false)}
        />
        <Row>
          {/* <Statistic title="Status" value="Active" /> */}
          <Statistic
            title="Time Worked"
            prefix={<Prefix>⧗</Prefix>}
            value={`${totalWorkTime.hours}:${totalWorkTime.minutes}`}
          />
          <Statistic
            title="Total Time"
            prefix={<Prefix>⧗</Prefix>}
            value={`${allTimersTotal.hours}:${allTimersTotal.minutes}`}
            style={{
              margin: "0 32px",
            }}
          />
        </Row>
      </PageHeader>
    </div>
  );
}
