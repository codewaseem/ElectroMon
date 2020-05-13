import { Steps } from "antd";
import {
  ScanOutlined,
  CloudDownloadOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Logo from "../../components/logo";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

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
  step1: {
    status: {
      check: "process",
      update: "wait",
      done: "wait",
    },
  },
  step2: {
    status: {
      check: "finish",
      update: "process",
      done: "wait",
    },
  },
  step3: {
    status: {
      check: "finish",
      update: "finish",
      done: "process",
    },
  },
  step4: {
    status: {
      check: "finish",
      update: "finish",
      done: "finish",
    },
  },
};

const defaultState = UpdateStates.step1;

export default function CheckForUpdates({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(defaultState);

  useEffect(() => {
    let id1 = setTimeout(() => {
      setCurrentStep(UpdateStates.step2);
    }, 1500);

    let id2 = setTimeout(() => {
      setCurrentStep(UpdateStates.step3);
    }, 3000);

    let id3 = setTimeout(() => {
      setCurrentStep(UpdateStates.step4);
    }, 4500);

    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(id3);
    };
  }, []);

  if (currentStep.status.done == "finish") {
    onComplete();
  }

  return (
    <div className={styles.container}>
      <Logo />
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
          status={currentStep.status.done}
          title="Done"
          icon={<CheckOutlined />}
        />
      </Steps>
    </div>
  );
}
