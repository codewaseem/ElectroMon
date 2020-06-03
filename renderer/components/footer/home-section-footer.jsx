import React, { useState } from "react";
import { useRouterContext } from "../../context-providers/router";
import { useTimerHandlerContext } from "../../context-providers/timerHandler";
import { ROUTES } from "../../../constants";
import { aiMonitorApi } from "../../../ai-monitor-core/exec";

import { Row, Button, Col } from "antd";
import { ApplyLeaveModal, AddTimeModal } from "../form-model";
import PropTypes from "prop-types";

export default function HomeSectionFooter({ onExitClick }) {
  const [canAddManualTime] = useState(true);

  const [onApplyVisible, setApplyVisible] = useState(false);

  const [onAddTimeVisible, setAddTimeVisible] = useState(false);

  const { setPath } = useRouterContext();
  const { stopAndPushTimerData } = useTimerHandlerContext();
  const [loading, setLoading] = useState(false);

  async function handleLogoutClick() {
    setLoading(true);
    await stopAndPushTimerData();
    setLoading(false);
    aiMonitorApi.logout();
    setPath(ROUTES.LOGIN);
  }

  return (
    <div>
      <AddTimeModal
        visible={onAddTimeVisible}
        onOk={() => {}}
        onCancel={() => setAddTimeVisible(false)}
      />
      <ApplyLeaveModal
        visible={onApplyVisible}
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
          <Button
            loading={loading}
            style={{
              marginRight: 10,
            }}
            danger
            htmlType="button"
            onClick={handleLogoutClick}
          >
            Log out
          </Button>
          <Button danger type="primary" onClick={onExitClick}>
            Exit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

HomeSectionFooter.propTypes = {
  onExitClick: PropTypes.func,
};
