import { Form, Button, TimePicker, Select, Modal } from "antd";
import { useState, useEffect } from "react";
const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export default function AddTimeModal({
  visible,
  onOk,
  confirmLoading,
  onCancel,
}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const [times, setTimes] = useState([]);
  return (
    <Modal
      title="Add Manual Time"
      visible={visible}
      onOk={onOk}
      okText="Add"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      centered={true}
      footer={false}
    >
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
        <Button htmlType="submit">Submit</Button>
      </Form>
    </Modal>
  );
}
