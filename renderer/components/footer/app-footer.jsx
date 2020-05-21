import React from "react";
import styles from "./app-footer.module.scss";
import { Descriptions } from "antd";
import { Label } from "../utils";
import { getAppVersion } from "../../hooks/useMainProcess";

export default function AppFooter() {
  const appVersion = getAppVersion();
  return (
    <footer className={styles.footer}>
      <Descriptions size="small" column={3}>
        <Descriptions.Item
          className={styles.smallerFonts}
          label={<Label>Version</Label>}
        >
          {appVersion || "0.0.0"}
        </Descriptions.Item>
        {/* <Descriptions.Item
          className={styles.smallerFonts}
          label={<Label>Status</Label>}
        >
          Online
        </Descriptions.Item>
        <Descriptions.Item
          className={styles.smallerFonts}
          label={<Label>Last updated</Label>}
        >
          few seconds ago
        </Descriptions.Item> */}
      </Descriptions>
    </footer>
  );
}
