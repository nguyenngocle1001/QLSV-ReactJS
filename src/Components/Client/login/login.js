import { Breadcrumb, Form, Input, Button, Row, Col, Select } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./login.scss";
import React, { useContext } from "react";
import { Context } from "../../../Context";
const { Option } = Select;

const Login = () => {
  const { login, isLogin } = useContext(Context);
  const onFinish = (values) => {
    values = {
      ...values,
      admin: values.admin == undefined ? false : values.admin,
    };
    login(values);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Đăng nhập</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="center">
        <Col xl={12} lg={12} md={18} sm={24} xm={24}>
          <Form
            layout="vertical"
            name="basic"
            className="login__form animation__show"
            onFinish={onFinish}
          >
            <h3 className="form__heading">Đăng nhập</h3>
            <Form.Item
              label="ID"
              name="id"
              rules={[{ required: true, message: "Bạn chưa nhập ID!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Bạn chưa nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="admin">
              <Select placeholder="Sinh Viên">
                <Option value={false}>Sinh Viên</Option>
                <Option value={true}>Giảng Viên</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
