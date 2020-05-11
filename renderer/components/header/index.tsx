import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from "antd";
import styles from "./header.module.scss";
import { TimerContext } from "../../context";
import React, { useContext, useState, useEffect } from "react";
import { WORK_TIMER } from "../../../constants";

export default function AppHeader() {
  const timersManager = useContext(TimerContext);
  const [totalWorkTime, setTotalWorkTime] = useState(
    timersManager.getTotalTimeObjectFor(WORK_TIMER)
  );
  const [allTimersTotal, setAllTimersTotal] = useState(
    timersManager.getTotalTimeObject()
  );

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
        title="AiMonitor"
        subTitle="Dashboard"
        extra={[
          <Button key="3">Apply Leave</Button>,
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
        <Row>
          {/* <Statistic title="Status" value="Active" /> */}
          <Statistic
            title="Time Worked"
            prefix="⧗"
            value={`${totalWorkTime.hours}:${totalWorkTime.minutes}`}
          />
          <Statistic
            title="Total Time"
            prefix="⧗"
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
