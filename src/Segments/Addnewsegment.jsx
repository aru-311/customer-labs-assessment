import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { PlusOutlined, LineOutlined } from "@ant-design/icons";
const { Option } = Select;

const Addnewsegment = (props) => {
  const {schema, setSchema } = props;
  const initialOptions = [
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
    { key: "gender", label: "Gender" },
    { key: "age", label: "Age" },
    { key: "account_name", label: "Account name" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
  ];
  const [options, setOptions] = useState(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState(schema||[]);
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const handleSelect = (value) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.key !== value)
    );
    setIsSelectVisible(false);

    setSelectedOptions((prevSelected) => [...prevSelected, value]);
    const option = initialOptions.find((option) => option.key === value);
    if (option) {
      setSchema((prevSchema) => [
        ...prevSchema,
        { [option.key]: option.label },
      ]);
    }
  };
  const handleRemove = (key) => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { key, label: initialOptions.find((option) => option.key === key).label },
    ]);

    setSelectedOptions((prevSelected) =>
      prevSelected.filter((selected) => selected !== key)
    );
    const option = initialOptions.find((option) => option.key === key);
    if (option) {
      setSchema((prevSchema) => [
        ...prevSchema,
        { [option.key]: option.label },
      ]);
    }
    if (selectedOptions.length === 1) {
      setIsSelectVisible(true);
    }
  };
  const handleAddSchemaClick = () => {
    setIsSelectVisible(true);
  };
  return (
    <>
      <div>
        {selectedOptions.map((key) => {
          const option = initialOptions.find((option) => option.key === key);
          return (
            <div key={key} style={{ marginBottom: 16 }}>
              <Space>
                <Select
                  placeholder={option.label}
                  style={{ width: 325 }}
                  disabled={true}
                >
                  {options.map((option) => (
                    <Option key={option.key} value={option.key}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <Button onClick={() => handleRemove(key)} type="danger">
                  <LineOutlined />
                </Button>
              </Space>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isSelectVisible && (
          <Select
            placeholder="Add schema to segment"
            onChange={handleSelect}
            style={{ width: "50%", marginBottom: 16 }}
          >
            {options.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
        <Button
          type="link"
          style={{
            color: "#41b494",
            textDecoration: "underline",
            display: "flex",
            justifyContent: "flex-start",
          }}
          icon={<PlusOutlined />}
          onClick={handleAddSchemaClick}
        >
          Add new schema
        </Button>
      </div>
    </>
  );
};

export default Addnewsegment;
