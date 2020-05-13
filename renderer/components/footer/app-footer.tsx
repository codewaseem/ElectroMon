import React from "react";
import styles from "./app-footer.module.scss";
import { Descriptions } from "antd";
import { Label } from "../utils";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <Descriptions size="small" column={3}>
        <Descriptions.Item label={<Label>Version</Label>}>
          0.0.1
        </Descriptions.Item>
        <Descriptions.Item label={<Label>Status</Label>}>
          Online
        </Descriptions.Item>
        <Descriptions.Item label={<Label>Last updated at</Label>}>
          few seconds ago
        </Descriptions.Item>
      </Descriptions>
    </footer>
  );
}
