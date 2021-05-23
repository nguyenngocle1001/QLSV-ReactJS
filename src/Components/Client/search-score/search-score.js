import "./search-score.scss";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Table,
  Space,
  Breadcrumb,
} from "antd";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Context } from "../../../Context";
const SearchScore = () => {
  const [list, setList] = useState([]);
  document.title = "Tra cứu điểm";
  const { search } = useContext(Context);

  const onFinish = (values) => {
    fetch("http://localhost/damh-project-1/api/search.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const columns = [
    {
      key: "StudentID",
      title: "MSSV",
      dataIndex: "StudentID",
    },
    {
      key: "FullName",
      title: "Họ và tên",
      dataIndex: "FullName",
    },
    {
      key: "ClassName",
      title: "Lớp",
      dataIndex: "ClassName",
    },
    {
      key: "Address",
      title: "Địa chỉ",
      dataIndex: "Address",
    },
    {
      key: "PhoneNumber",
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
    },
    {
      key: "action",
      title: "#",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/search-score-detail/${record.StudentID}`}>Xem điểm</Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tra cứu điểm</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="center" className="animation__show">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <div className="search__score">
            <Divider orientation="center">
              <h3 className="heading">Tra cứu điểm</h3>
            </Divider>
            <Form
              layout="vertical"
              className="search__score"
              onFinish={onFinish}
            >
              <Row gutter={24} wrap={true}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="id"
                    label="Mã sinh viên"
                    orientation="vertical"
                  >
                    <Input placeholder="Nhập mã sinh viên" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="fullname"
                    label="Họ và Tên"
                    orientation="vertical"
                  >
                    <Input placeholder="Nhập họ tên" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Form.Item name="class" label="Lớp" orientation="vertical">
                    <Input placeholder="Nhập lớp" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  justify="center"
                  type="primary"
                  icon={<SearchOutlined />}
                  block
                  htmlType="submit"
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xl={20} lg={20} md={20} sm={24} xs={24}>
          <Table
            className="table__responsive animation__show"
            columns={columns}
            dataSource={list}
            size="small"
          />
        </Col>
      </Row>
    </>
  );
};
export default SearchScore;
