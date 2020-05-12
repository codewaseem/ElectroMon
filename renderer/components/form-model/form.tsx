import { Form, Input, Button, DatePicker, TimePicker, Select } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export const ApplyLeaveForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

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
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      name="apply-leave"
      onFinish={onFinish}
    >
      <Form.Item name="reason" rules={[{ required: true }]}>
        <Input placeholder={"Reason"} />
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

      <Button htmlType="button" onClick={onReset}>
        Reset
      </Button>
    </Form>
  );
};

export const AddTimeForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const [times, setTimes] = useState([]);

  return (
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
      <Form.Item name="log-type" rules={[{ required: true }]}>
        <Select placeholder={"Log Type"}>
          <Option value="work">Work</Option>
          <Option value="lunch">Lunch</Option>
          <Option value="break">Coffee</Option>
        </Select>
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

      <Button htmlType="button" onClick={onReset}>
        Reset
      </Button>
    </Form>
  );
};
