import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from "antd";
import styles from "./header.module.scss";

export default function AppHeader() {
  return (
    <div>
      <PageHeader
        className={styles.removeSpacing}
        title="AiMonitor"
        subTitle="Dashboard"
        extra={[
          <Button key="3">Apply Leave</Button>,
          <Button key="2">View Logs</Button>,
          <Button key="1" type="primary">
            Exit
          </Button>,
        ]}
      >
        {/* <Descriptions size="small" column={3}>
          <Descriptions.Item label="User">Name</Descriptions.Item>
          <Descriptions.Item label="">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
        </Descriptions> */}
        <Row>
          <Statistic title="Status" value="Working" />
          <Statistic
            title="Price"
            prefix="$"
            value={568.08}
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic title="Balance" prefix="$" value={3345.08} />
        </Row>
      </PageHeader>
    </div>
  );
}
