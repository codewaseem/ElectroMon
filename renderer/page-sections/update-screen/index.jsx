import React from "react";
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
import { getIpcRenderer, isDev } from "../../hooks/useMainProcess";
import { useRouterContext } from "../../context-providers/router";
import { UPDATER_EVENTS, ROUTES } from "../../../constants";

const { Step } = Steps;

const UpdateStates = {
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
  downloadUpdatesError: {
    status: {
      check: "finish",
      update: "error",
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

export default function UpdateScreen() {
  const [currentStep, setCurrentStep] = useState(defaultState);
  const [message, setMessage] = useState("");
  const ipcRenderer = getIpcRenderer();
  const { setPath } = useRouterContext();

  const updateStatus = async (_, data) => {
    if (
      data.event == UPDATER_EVENTS.DOWNLOAD_PROGRESS ||
      data.event == UPDATER_EVENTS.UPDATE_AVAILABLE
    ) {
      setCurrentStep(UpdateStates.downloadUpdates);
    }

    if (
      data.event == UPDATER_EVENTS.UPDATE_NOT_AVAILABLE ||
      data.event == UPDATER_EVENTS.UPDATE_DOWNLOADED
    ) {
      setPath(ROUTES.LOGIN);
    }

    if (data.event == UPDATER_EVENTS.ERROR) {
      setCurrentStep(UpdateStates.downloadUpdatesError);
    }
    setMessage(data.text);
  };

  useEffect(() => {
    if (isDev()) {
      console.log("In dev mode, skip checking for update");
      setPath(ROUTES.LOGIN);
    } else {
      ipcRenderer.on("message", updateStatus);
      return () => ipcRenderer.removeListener("message", updateStatus);
    }
  }, []);

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
      <h3>{message}</h3>
    </div>
  );
}
