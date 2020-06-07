import { Form, Input, Button, Spin } from "antd";
import styles from "./login.module.scss";
import React from "react";
import Logo from "../../components/logo";
import { LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouterContext } from "../../context-providers/router";
import { ROUTES, IPC_CHANNELS } from "../../../constants";
import { aiMonitorApi } from "ai-monitor-core";
import { getIpcRenderer } from "../../hooks/useMainProcess";

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
  const [loginError, setLoginError] = useState(false);

  const onFinish = async (values) => {
    setLoginState(LoginStates.logging);
    try {
      let { user, profile } = await aiMonitorApi.login(
        values.email,
        values.password
      );
      setPath(ROUTES.HOME);
      console.log("Profile", profile);
      getIpcRenderer().send(IPC_CHANNELS.SET_CURRENT_USER, { user, profile });
    } catch (e) {
      setLoginState(LoginStates.error);
      setLoginError(true);
      console.log(e);
    }
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
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="pas5w0rd" />
          </Form.Item>

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
        {loginError && (
          <p className={styles.errorMessage}>
            <span>Login Failed!</span> Please check your Pulse email and/or
            password or send an email to support@aptask.com
          </p>
        )}
      </div>
    </Spin>
  );
};

export default LoginForm;
