import { Form, Input, Button, message, Spin } from "antd";
import styles from "./login.module.scss";
import Logo from "../../components/logo";
import { LoginOutlined } from "@ant-design/icons";
import { AiMonitorContext } from "../../context";
import { useContext, useState, useEffect } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const defaultState = {
  spinLoading: false,
  submitLoading: false,
};

const LoginStates = {
  no: {
    ...defaultState,
  },
  initial: {
    ...defaultState,
    spinLoading: true,
  },
  logging: {
    ...defaultState,
    submitLoading: true,
  },
  done: defaultState,
  error: defaultState,
};

const LoginForm = ({ onComplete }) => {
  const aiMonitorAPI = useContext(AiMonitorContext);
  const [loginState, setLoginState] = useState(LoginStates.initial);

  useEffect(() => {
    // loading user from local db
    let id = setTimeout(() => {
      // if user found call on complete
      onComplete();

      //else set next state
      // setLoginState(LoginStates.no);
    }, 500);

    return () => clearTimeout(id);
  }, []);

  const onFinish = (values) => {
    setLoginState(LoginStates.logging);
    aiMonitorAPI
      .login(values.email, values.password)
      .then(() => {
        setLoginState(LoginStates.done);
        onComplete();
      })
      .catch(() => {
        setLoginState(LoginStates.error);
        message.error("Login Failed! Try again.", 5);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={loginState.spinLoading}>
      <div className={styles.formContainer}>
        <Logo />
        <Form
          labelAlign="left"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="pas5w0rd" />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button
              loading={loginState.submitLoading}
              type="primary"
              htmlType="submit"
            >
              Login <LoginOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default LoginForm;
