import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

export default function NewsCategory() {

  const { confirm } = Modal
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then(res => {
      setDataSource(res.data)
    })
  }, [])

  const handleSave = (record) => {
    console.log(record)
    setDataSource(dataSource.map(data => {
      if(data.id === record.id) {
        return {
          id: data.id,
          title: record.title,
          value: record.title,
        }
      }
      return data
    }))
    axios.patch(`http://localhost:5000/categories/${record.id}`, {
      title: record.title,
      value: record.title
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: id => {
        return <b>{id}</b>
      }
    },
    {
      title: 'Category',
      dataIndex: 'title',
      key: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: 'title',
        handleSave: handleSave
      })
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button danger shape='circle' icon={<DeleteOutlined onClick={() => showConfirm(item)} />} style={{ marginLeft: '5px' }} />
          </div>
        )
      }
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
      },
    });
  }

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/categories/${item.id}`)
  }



  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <Table dataSource={dataSource} rowKey={(item) => item.id} columns={columns} components={components} pagination={
        {
          pageSize: 5
        }
      } />;
    </div>
  )
}
