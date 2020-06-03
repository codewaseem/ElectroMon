import {
  Form,
  Button,
  TimePicker,
  DatePicker,
  Select,
  Modal,
  message,
  Spin,
} from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { WORK_TIMER, LUNCH_TIMER, COFFEE_TIMER } from "../../../constants";
import moment from "moment";
import { aiMonitorApi } from "../../../ai-monitor-core/exec";

const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export default function AddTimeModal({
  visible,
  onOk = () => {},
  onCancel = () => {},
}) {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  }

  const onFinish = (values) => {
    let {
      logType,
      time: [startTime, endTime],
      date,
    } = values;
    startTime.set({
      year: date.get("year"),
      month: date.get("month"),
      date: date.get("date"),
    });

    endTime.set({
      year: date.get("year"),
      month: date.get("month"),
      date: date.get("date"),
    });

    setSpinning(true);
    aiMonitorApi
      .addTime([
        {
          logType,
          startTime: +startTime, // convert moment object to milliseconds
          endTime: +endTime,
          duration: +endTime - +startTime,
          manual: true,
        },
      ])
      .then(() => {
        setSpinning(false);
        message.success("Time added successfully", 5);
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

  const [, setTimes] = useState([]);
  return (
    <Modal
      title="Add Manual Time"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      centered={true}
      footer={false}
    >
      <Spin spinning={spinning}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="add-time"
          onFinish={onFinish}
        >
          {/* <Form.Item name="what-done" rules={[{ required: true }]}>
        <Input placeholder={"What did you do?"} />
      </Form.Item> */}
          <Form.Item name="logType" rules={[{ required: true }]}>
            <Select placeholder={"Log Type"}>
              <Option value={WORK_TIMER}>Work</Option>
              <Option value={LUNCH_TIMER}>Lunch</Option>
              <Option value={COFFEE_TIMER}>Coffee</Option>
            </Select>
          </Form.Item>
          <Form.Item name="date" rules={[{ required: true }]}>
            <DatePicker
              disabledDate={disabledDate}
              placeholder="Date"
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item name="time" rules={[{ required: true }]}>
            <TimeRangePicker
              picker="time"
              format="HH:mm"
              placeholder={["Start Time", "End Time"]}
              onCalendarChange={(value) => {
                console.log(value);
                setTimes(value);
              }}
            />
          </Form.Item>

          <Button
            htmlType="button"
            onClick={onReset}
            style={{
              marginRight: 8,
            }}
          >
            Reset
          </Button>
          <Button loading={spinning} type="primary" htmlType="submit">
            Add Time Log
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
}

AddTimeModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
