import { PageHeader, Descriptions, Row, Col } from "antd";
import styles from "./header.module.scss";
import { TimerContext } from "../../context";
import React, { useContext, useState, useEffect } from "react";
import { WORK_TIMER } from "../../../constants";
import Logo from "../logo";
import moment from "moment-timezone";
import { Label } from "../utils";

const getEstTime = () => moment.tz("America/Panama").format("HH:mm:ss");

export default function AppHeader() {
  const timersManager = useContext(TimerContext);

  const [totalWorkTime, setTotalWorkTime] = useState(
    timersManager.getTotalTimeObjectFor(WORK_TIMER)
  );
  const [allTimersTotal, setAllTimersTotal] = useState(
    timersManager.getTotalTimeObject()
  );

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
      <PageHeader className={styles.headerOveride} title={<Logo />}>
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
