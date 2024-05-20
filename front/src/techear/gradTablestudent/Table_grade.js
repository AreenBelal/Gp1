import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import './hwDetails.css';

const GradesTables = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchColText, setSearchColText] = useState("");
  const [searchedCol, setSearchedCol] = useState("");
  let [filteredInfo, setFilteredInfo] = useState({});
  let [filteredData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const handleDelete = (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setGridData(filteredData);
  };

  const modifiedData = gridData.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    info: ` اسم الطالب ${item.email.split("@")[0]}`,
   }));

  console.log("modifiedData", modifiedData);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`بحث ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 0, display: "block" }}
        />
        <Space>

        <Button
            onClick={() => handleResetCol(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            تراجع
          </Button> 
          
          <Button
            type="primary"
            onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
           
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedCol === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchColText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchColText(selectedKeys[0]);
    setSearchedCol(dataIndex);
  };

  const handleResetCol = (clearFilters) => {
    clearFilters();
    setSearchColText("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
       ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleChange = (_, filters, sorter) => {
    console.log("sorter", sorter);
    console.log("filters", filters);
    const { order, field } = sorter;
    setFilteredInfo(filters);
    setSortedInfo({ columnKey: field, order });
  };

  console.log("filteredInfo", filteredInfo);

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...modifiedData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setGridData(newData);
        setEditingKey("");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `رجاء ادخل ${title}`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "الرقم المتسلسل",
      dataIndex: "id",
    },
    {
      title: "اسم الطالب",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "هوية الطالب",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "الفرع",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "الدورة",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "الشعبة",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "الاختبار القصير",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },

    {
      title: "العلامة المستحقة",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    

    {
      title: "إعدادات",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return modifiedData.length >= 1 ? (
          <Space>
 
              <Button type="primary" disabled={editable} onClick={() => handleDelete(record)} danger>
                حذف
              </Button>

             {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={(e) => save(record.key)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    حفظ
                  </Button>
                     <Button onClick={cancel}>الغاء</Button>
                 </Space>
              </span>
            ) : (
              <Button onClick={() => edit(record)} type="primary">
                تعديل
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const isEditing = (record) => {
    return record.key === editingKey;
  };
 

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      loadData();
    }
  };
  const globalSearch = () => {
    filteredData = modifiedData.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchText.toLowerCase()) ||
        value.email.toLowerCase().includes(searchText.toLowerCase()) 
     
      );
    });
    setGridData(filteredData);
  };

  return (
    <div className="table_courses">
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="اكتب ما تريد البحث عنه"
          onChange={handleSearch}
          type="text"
          allowClear
          value={searchText}
        />
        <Button type="primary" onClick={globalSearch}>
         بحث
        </Button>
       </Space>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.info}</p>
            ),
            rowExpandable: (record) => record.info !== "Not Expandable",
          }}
          dataSource={
            filteredData && filteredData.length ? filteredData : modifiedData
          }
          bordered
          loading={loading}
          onChange={handleChange}
 
        />
      </Form>
    </div>
  );
};

export default GradesTables;
