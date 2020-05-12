import React, { useState } from "react";

import { Modal, DatePicker } from "antd";
import ApplyLeaveForm from "./form";

export default function ApplyLeaveModal({
  visible,
  onOk,
  confirmLoading,
  onCancel,
}) {
  return (
    <Modal
      title="Apply For Leave"
      visible={visible}
      onOk={onOk}
      okText="Submit"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      centered={true}
    >
      <ApplyLeaveForm />
    </Modal>
  );
}
