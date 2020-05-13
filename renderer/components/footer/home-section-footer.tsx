import React, { useContext, useState, useEffect } from "react";
import { Row, Button, Col } from "antd";
import { ApplyLeaveModal, AddTimeModal } from "../form-model";
import { AiMonitorContext } from "../../context";

export default function HomeSectionFooter() {
  const aiMonitorApi = useContext(AiMonitorContext);
  const [canAddManualTime, setCanAddManualTime] = useState(false);

  const [onApplyVisible, setApplyVisible] = useState(false);
  const [confirmApplyLoading, setConfirmApplyLoading] = useState(false);

  const [onAddTimeVisible, setAddTimeVisible] = useState(false);
  const [confirmAddTimeLoading, setConfirmAddTimeLoading] = useState(false);

  useEffect(() => {
    aiMonitorApi.canAddManualTime().then((value) => {
      setCanAddManualTime(value);
    });
  }, []);

  return (
    <div>
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

      <Row justify="space-between" align="middle">
        <Col>
          {canAddManualTime && (
            <Button
              style={{
                marginRight: 12,
              }}
              onClick={() => {
                console.log("apply");
                setAddTimeVisible(true);
              }}
            >
              Add Time
            </Button>
          )}

          <Button onClick={() => setApplyVisible(true)}>Apply Leave</Button>
        </Col>
        <Col>
          <Button danger type="primary">
            Exit
          </Button>
        </Col>
      </Row>
    </div>
  );
}
