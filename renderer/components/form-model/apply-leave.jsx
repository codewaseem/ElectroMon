import { Form, Button, DatePicker, Select, Modal, message, Spin } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { aiMonitorApi } from "../../../ai-monitor-core/exec";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ApplyLeaveModal({
  visible,
  onOk = () => {},
  onCancel = () => {},
}) {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);

  const onFinish = (values) => {
    let {
      reason,
      time: [startTime, endTime],
    } = values;
    setSpinning(true);
    aiMonitorApi
      .addLeave({
        reason,
        startTime: +startTime.startOf("date"), // convert moment object to milliseconds
        endTime: +endTime.endOf("date"),
      })
      .then(() => {
        setSpinning(false);
        message.success("Applied Successfully", 5);
        form.resetFields();
        onCancel();
      })
      .catch(() => {
        setSpinning(false);
        message.error("Something went wrong! Try again!");
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const [dates, setDates] = useState([]);

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return current && current < moment().endOf("day");
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return tooEarly || tooLate;
  };

  return (
    <Modal
      title="Apply For Leave"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      centered={true}
      footer={false}
    >
      <Spin spinning={spinning}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="apply-leave"
          onFinish={onFinish}
        >
          <Form.Item name="reason" rules={[{ required: true }]}>
            <Select placeholder={"Reason"}>
              <Option value="sick">Sick</Option>
              <Option value="vacation">Vacation</Option>
              <Option value="unpaid">Unpaid</Option>
            </Select>
          </Form.Item>

          <Form.Item name="time" rules={[{ required: true }]}>
            <RangePicker
              placeholder={["From", "To"]}
              disabledDate={disabledDate}
              onCalendarChange={(value) => {
                setDates(value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{ marginRight: 8 }}
            >
              Reset
            </Button>
            <Button loading={spinning} type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

ApplyLeaveModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
