import React, { useState, useEffect } from "react";
import { Descriptions, Row, Col } from "antd";
import { Label } from "../utils";
import { WORK_TIMER, COFFEE_TIMER, LUNCH_TIMER } from "../../../constants";
import moment from "moment-timezone";
import { useTimerHandlerContext } from "../../context-providers/timerHandler";

const getEstTime = () => moment.tz("America/New_York").format("hh:mm:ss A");

export default function TimerInfo() {
  const { timersManager } = useTimerHandlerContext();

  const [totalWorkTime, setTotalWorkTime] = useState(
    timersManager.getTotalTimeObjectFor(WORK_TIMER)
  );

  const getTotalBreak = () =>
    timersManager.getTotalTimeObjectFrom([COFFEE_TIMER, LUNCH_TIMER]);

  const [totalBreak, setTotalBreak] = useState(getTotalBreak);

  const [allTimersTotal, setAllTimersTotal] = useState(
    timersManager.getTotalTimeObject()
  );

  const [estTime, setEstTime] = useState(getEstTime());

  useEffect(() => {
    let id = setTimeout(() => {
      setTotalWorkTime(timersManager.getTotalTimeObjectFor(WORK_TIMER));
      setAllTimersTotal(timersManager.getTotalTimeObject());
      setTotalBreak(getTotalBreak());
      setEstTime(getEstTime());
    }, 500);

    return () => clearTimeout(id);
  });

  return (
    <Row align="middle" justify="space-between">
      <Col span={24}>
        <Descriptions layout="vertical" size="small" column={5}>
          <Descriptions.Item label={<Label>Date</Label>}>
            {new Date().toDateString()}
          </Descriptions.Item>
          <Descriptions.Item label={<Label>Time (EST)</Label>}>
            {estTime}
          </Descriptions.Item>
          <Descriptions.Item label={<Label>Time Worked</Label>}>
            {`${totalWorkTime.hours}:${totalWorkTime.minutes}:${totalWorkTime.seconds}`}
          </Descriptions.Item>
          <Descriptions.Item label={<Label>Total Break</Label>}>
            {`${totalBreak.hours}:${totalBreak.minutes}:${totalBreak.seconds}`}
          </Descriptions.Item>
          <Descriptions.Item label={<Label>Total Time</Label>}>
            {`${allTimersTotal.hours}:${allTimersTotal.minutes}:${allTimersTotal.seconds}`}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}
