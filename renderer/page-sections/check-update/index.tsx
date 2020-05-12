import { Steps } from "antd";
import {
  UserOutlined,
  CloudDownloadOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Logo from "../../components/logo";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

const { Step } = Steps;

export default function CheckForUpdates() {
  const [currentStep, setCurrentStep] = useState("check-update");

  useEffect(() => {
    setTimeout(() => {
      setCurrentStep("done");
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <Logo />
      <Steps>
        <Step status="finish" title="Login" icon={<UserOutlined />} />
        <Step
          status={currentStep == "check-update" ? "process" : "finish"}
          title="Updating"
          icon={
            currentStep == "check-update" ? (
              <LoadingOutlined />
            ) : (
              <CloudDownloadOutlined />
            )
          }
        />
        <Step
          status={currentStep == "done" ? "finish" : "wait"}
          title="Done"
          icon={<CheckOutlined />}
        />
      </Steps>
    </div>
  );
}
