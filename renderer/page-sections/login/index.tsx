import { Form, Input, Button, message } from "antd";
import styles from "./login.module.scss";
import Logo from "../../components/logo";
import { LoginOutlined } from "@ant-design/icons";
import useAsyncCode from "../../hooks/useAsyncCode";
import { AiMonitorContext } from "../../context";
import { useContext, useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const LoginStates = {
  initial: {
    submitLoading: false,
  },
  logging: {
    submitLoading: true,
  },
  done: {
    submitLoading: false,
  },
  error: {
    submitLoading: false,
  },
};

const defaultState = LoginStates.initial;

const LoginForm = ({ onComplete }) => {
  const aiMonitorAPI = useContext(AiMonitorContext);
  const [loginState, setLoginState] = useState(defaultState);

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
  );
};

export default LoginForm;
