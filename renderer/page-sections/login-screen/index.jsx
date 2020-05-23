import { Form, Input, Button, Spin } from "antd";
import styles from "./login.module.scss";
import React from "react";
import Logo from "../../components/logo";
import { LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouterContext } from "../../context/router";
import { ROUTES } from "../../../constants";

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
  loading: {
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

const LoginForm = () => {
  const [loginState, setLoginState] = useState(defaultState);
  const { setPath } = useRouterContext();

  const onFinish = (values) => {
    console.log(values);
    setLoginState(LoginStates.logging);
    setTimeout(() => {
      setPath(ROUTES.HOME);
    }, 5000);
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
