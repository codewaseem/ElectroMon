import React, { useState } from "react";

import { Modal, DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default function ApplyLeaveModal({
  visible,
  onOk,
  confirmLoading,
  onCancel,
}) {
  const [dates, setDates] = useState([]);
  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return tooEarly || tooLate;
  };

  return (
    <Modal
      title="Apply For Leave"
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <RangePicker
        disabledDate={disabledDate}
        onCalendarChange={(value) => {
          setDates(value);
        }}
      />
    </Modal>
  );
}
