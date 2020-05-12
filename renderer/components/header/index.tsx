import { PageHeader, Button, Statistic, Descriptions, Row, Col } from "antd";
import styles from "./header.module.scss";
import { TimerContext, AiMonitorContext } from "../../context";
import React, { useContext, useState, useEffect } from "react";
import { WORK_TIMER } from "../../../constants";
import { ApplyLeaveModal, AddTimeModal } from "../form-model";
import Logo from "../Logo";
import moment from "moment-timezone";

const getEstTime = () => moment.tz("America/Panama").format("HH:mm:ss");

const Label = ({ children }) => {
  return <span className={styles.label}>{children}</span>;
};

export default function AppHeader() {
  const timersManager = useContext(TimerContext);
  const aiMonitorApi = useContext(AiMonitorContext);

  const [canAddManualTime, setCanAddManualTime] = useState(false);

  const [totalWorkTime, setTotalWorkTime] = useState(
    timersManager.getTotalTimeObjectFor(WORK_TIMER)
  );
  const [allTimersTotal, setAllTimersTotal] = useState(
    timersManager.getTotalTimeObject()
  );

  const [onApplyVisible, setApplyVisible] = useState(false);
  const [confirmApplyLoading, setConfirmApplyLoading] = useState(false);

  const [onAddTimeVisible, setAddTimeVisible] = useState(false);
  const [confirmAddTimeLoading, setConfirmAddTimeLoading] = useState(false);

  const [estTime, setEstTime] = useState(getEstTime());
  useEffect(() => {
    let id = setTimeout(() => {
      setTotalWorkTime(timersManager.getTotalTimeObjectFor(WORK_TIMER));
      setAllTimersTotal(timersManager.getTotalTimeObject());
      setEstTime(getEstTime());
    });

    return () => clearTimeout(id);
  });

  useEffect(() => {
    aiMonitorApi.canAddManualTime().then((value) => {
      setCanAddManualTime(value);
    });
  }, []);

  return (
    <div>
      <PageHeader
        className={styles.headerOveride}
        title={<Logo />}
        extra={[
          canAddManualTime && (
            <Button
              key="2"
              onClick={() => {
                console.log("apply");
                setAddTimeVisible(true);
              }}
            >
              Add Time
            </Button>
          ),
          <Button onClick={() => setApplyVisible(true)} key="3">
            Apply Leave
          </Button>,
          <Button danger key="1" type="primary">
            Exit
          </Button>,
        ]}
      >
        <AddTimeModal
          visible={onAddTimeVisible}
          confirmLoading={confirmAddTimeLoading}
          onOk={() => {}}
          onCancel={() => setAddTimeVisible(false)}
        />
        <ApplyLeaveModal
          visible={onApplyVisible}
          confirmLoading={confirmApplyLoading}
          onOk={() => {}}
          onCancel={() => setApplyVisible(false)}
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
