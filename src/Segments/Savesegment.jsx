import React, { useState } from "react";
import axios from "axios";
import "./Savesegment.css";
import { Button, Drawer, Input, theme, Table, Tag } from "antd";
import { createStyles } from "antd-style";
import Addnewsegment from "./Addnewsegment";

const useStyle = createStyles(({ token }) => ({
  "my-drawer-body": {
    background: "#ffffff",
  },
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-drawer-header": {
    background: "#39aebc",
    color: "white",
  },
  "my-drawer-footer": {
    color: token.colorPrimary,
    background: "#f6f6f6",
  },
  "my-drawer-content": {
    borderLeft: "2px dotted #333",
  },
}));

function Savesegment() {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schema, setSchema] = useState([]);

  const showDrawer = () => {
    setOpen(true);
    setSchema([]);
    setSegmentName("");
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle = {
    position: "relative",
    height: '905px',
    padding: 0,
    overflow: "hidden",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
  };

  const { styles } = useStyle();
  const classNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
  };

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
  };

  const handleSaveSegment = (segmentName, schema) => {
    const webhookUrl =
      "https://cors-anywhere.herokuapp.com/https://webhook.site/39981c00-ba80-4f12-aaaf-a2838f35c1cf";

    const data = {
      segment_name: segmentName,
      schema: schema,
    };

    // Send data using axios
    axios
      .post(webhookUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        setOpen(false)
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const columns = [
    {
      title: "Segment Name",
      dataIndex: "segment_name",
      key: "segment_name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Schema",
      dataIndex: "schema",
      key: "schema",
      render: (_, { schema }) => (
        <>
          {schema.map((tag) => {    
            return Object.keys(tag).map((key) => (
              <Tag color="geekblue" key={key}>
                {tag[key]}
              </Tag>
            ));
          })}
        </>
      ),
    }    
  ];
  const data = [
    {
      key: "1",
      schema: schema,
      segment_name: segmentName,
    }
  ];

  return (
    <div style={containerStyle}>
      <h2 style={{background:open?'#226870':'#39aebc', color:'white', margin:0, height:'70px', padding:'10px', display:'flex', alignItems:'center'}}>View Audience</h2>
      <div style={{ margin:'20px' }}>
        <Button type="primary" style={{color:'white', background:'#999999', border:'2px solid white', height:'50px',fontSize:'16px'}} onClick={showDrawer}>
          Save segment
        </Button>
        <Table columns={columns} dataSource={data} />

      </div>

      <Drawer
        title="Save Segment"
        placement="right"
        footer={
          <div style={{ textAlign: "left" }}>
            <Button
              type="primary"
              style={{ backgroundColor: "#42b495", color: "white" }}
              onClick={() => handleSaveSegment(segmentName, schema)}
            >
              Save the segment
            </Button>
            <Button
              onClick={onClose}
              style={{
                backgroundColor: "white",
                color: "#e081a0",
                marginLeft: 8,
              }}
            >
              Cancel
            </Button>
          </div>
        }
        width={700}
        getContainer={false}
        onClose={onClose}
        open={open}
        classNames={classNames}
        styles={drawerStyles}
      >
        <h5>Enter the Name of the Segment</h5>
        <Input
          placeholder="Name of the Segment"
          value={segmentName}
          allowClear
          style={{ width: "50%" }}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <h5>
          To save your segment, you need to add the schemas to build the query
        </h5>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <div style={{ display: "flex", marginRight: "10px" }}>
            <span className="dot" style={{ backgroundColor: "green" }}></span>
            <p style={{ marginTop: 0 }}>- User Tasks</p>
          </div>
          <div style={{ display: "flex" }}>
            <span className="dot" style={{ backgroundColor: "red" }}></span>
            <p style={{ marginTop: 0 }}>- Group Tasks</p>
          </div>
        </div>
        <div style={{ display: "block" }}>
          <Addnewsegment setSchema={setSchema} schema={schema} />
        </div>
      </Drawer>
    </div>
  );
}

export default Savesegment;
