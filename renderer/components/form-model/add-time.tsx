import { Form, Button, TimePicker, Select, Modal, message, Spin } from "antd";
import { useState, useEffect } from "react";
import useAiMonitorAPI from "../../hooks/useAiMonitorAPI";
import { WORK_TIMER, LUNCH_TIMER, COFFEE_TIMER } from "../../../constants";
const { RangePicker: TimeRangePicker } = TimePicker;
const { Option } = Select;

export default function AddTimeModal({ visible, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);
  const aiMonitorApi = useAiMonitorAPI();

  const onFinish = (values: {
    logType: string;
    time: [moment.Moment, moment.Moment];
  }) => {
    console.log(values);
    let {
      logType,
      time: [startTime, endTime],
    } = values;
    setSpinning(true);
    aiMonitorApi.canAddManualTime().then(() => {
      aiMonitorApi
        .addManualTime({
          logType,
          startTime: +startTime, // convert moment object to milliseconds
          endTime: +endTime,
        })
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
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const [times, setTimes] = useState([]);
  return (
    <Modal
      title="Add Manual Time"
      visible={visible}
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
          <Button loading={spinning} htmlType="submit">
            Add Time Log
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
}
