import { Steps } from "antd";
import {
  ScanOutlined,
  CloudDownloadOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../../components/logo";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useIPCRenderer from "../../hooks/useIPCRenderer";

const { Step } = Steps;

type Status = "process" | "wait" | "error" | "finish";

interface StepStatus {
  [key: string]: {
    status: {
      [key: string]: Status;
    };
  };
}

const UpdateStates: StepStatus = {
  checkUpdates: {
    status: {
      check: "process",
      update: "wait",
      login: "wait",
    },
  },
  downloadUpdates: {
    status: {
      check: "finish",
      update: "process",
      login: "wait",
    },
  },
  login: {
    status: {
      check: "finish",
      update: "finish",
      login: "process",
    },
  },
};

const defaultState = UpdateStates.checkUpdates;

export default function PreCheckScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(defaultState);
  const [version, setVersion] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuth();
  const ipcRenderer = useIPCRenderer();

  useEffect(() => {
    // Display the current version
    let version = window.location.hash.substring(1);
    setVersion(version);

    // Listen for messages
    ipcRenderer.on("message", function (event, text) {
      setMessage(text);
    });
    // let id1 = setTimeout(() => {
    //   setCurrentStep(UpdateStates.downloadUpdates);
    // }, 1500);

    // let id2 = setTimeout(async () => {
    //   setCurrentStep(UpdateStates.login);
    //   try {
    //     const token = await auth.getToken();
    //     console.log(token);
    //     onComplete();
    //   } catch (e) {
    //     console.log("login failed");
    //   }
    // }, 3000);

    return () => {
      // clearTimeout(id1);
      // clearTimeout(id2);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Logo />
      <h2>{version}</h2>
      <h3>{message}</h3>
      <Steps>
        <Step
          status={currentStep.status.check}
          title="Checking For Updates"
          icon={
            currentStep.status.check == "process" ? (
              <LoadingOutlined />
            ) : (
              <ScanOutlined />
            )
          }
        />
        <Step
          status={currentStep.status.update}
          title="Updating"
          icon={
            currentStep.status.update == "process" ? (
              <LoadingOutlined />
            ) : (
              <CloudDownloadOutlined />
            )
          }
        />
        <Step
          status={currentStep.status.login}
          title="Login"
          icon={
            currentStep.status.login == "process" ? (
              <LoadingOutlined />
            ) : (
              <UserOutlined />
            )
          }
        />
      </Steps>
    </div>
  );
}
