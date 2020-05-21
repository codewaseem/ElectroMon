import React, { useContext, useState, useEffect } from "react";
import { Descriptions, Row, Col } from "antd";
import { Label } from "../utils";
import { TimerContext } from "../../context";
import { WORK_TIMER } from "../../../constants";
import moment from "moment-timezone";

const getEstTime = () => moment.tz("America/Panama").format("HH:mm:ss");

export default function TimerInfo() {
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
    }, 500);

    return () => clearTimeout(id);
  });

  return (
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
  );
}
