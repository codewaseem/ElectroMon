import { Form, Input, Button, Select, DatePicker } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;

const ApplyLeaveForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
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

export default ApplyLeaveForm;
