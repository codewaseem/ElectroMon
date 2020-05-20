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
import {
  useIPCRenderer,
  useAuthLogin,
  isDev,
} from "../../hooks/useMainProcess";
import { UPDATER_EVENTS } from "../../../constants";
import PropTypes from "prop-types";

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
  loginError: {
    status: {
      check: "finish",
      update: "finish",
      login: "error",
    },
  },
};

const defaultState = UpdateStates.checkUpdates;

export default function PreCheckScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(defaultState);
  const [message, setMessage] = useState("");
  const ipcRenderer = useIPCRenderer();
  const login = useAuthLogin();

  async function tryLogin() {
    setCurrentStep(UpdateStates.login);
    try {
      const token = await login();
      console.log(token);
      onComplete();
    } catch (e) {
      console.log("login failed");
      setCurrentStep(UpdateStates.loginError);
    }
  }

  const updateStatus = async (_, data) => {
    if (data.event == UPDATER_EVENTS.DOWNLOAD_PROGRESS) {
      setCurrentStep(UpdateStates.downloadUpdates);
    }

    if (
      data.event == UPDATER_EVENTS.UPDATE_NOT_AVAILABLE ||
      data.event == UPDATER_EVENTS.UPDATE_DOWNLOADED
    ) {
      await tryLogin();
    }

    if (data.event == UPDATER_EVENTS.ERROR) {
      setCurrentStep(UpdateStates.downloadUpdatesError);
    }
    setMessage(data.text);
  };

  useEffect(() => {
    if (isDev()) {
      console.log("In dev mode, skip checking for update");
      tryLogin();
    } else {
      ipcRenderer.on("message", updateStatus);
      return () => ipcRenderer.removeListener("message", updateStatus);
    }
  });

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

PreCheckScreen.propTypes = {
  onComplete: PropTypes.func,
};
