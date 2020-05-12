import React from "react";

import { Modal } from "antd";
import { ApplyLeaveForm, AddTimeForm } from "./form";

export function ApplyLeaveModal({ visible, onOk, confirmLoading, onCancel }) {
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

export function AddTimeModal({ visible, onOk, confirmLoading, onCancel }) {
  return (
    <Modal
      title="Add Manual Time"
      visible={visible}
      onOk={onOk}
      okText="Add"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      centered={true}
    >
      <AddTimeForm />
    </Modal>
  );
}
