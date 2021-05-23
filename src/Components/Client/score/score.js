import { Link } from "react-router-dom";
import Info from "../info/info";
import { Row, Col, Table, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./score.scss";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../Context";

const Score = () => {
  const { user } = useContext(Context);
  const [list, setList] = useState(() => {
    const initialValues = JSON.parse(localStorage.getItem("list"));
    return initialValues;
  });
  console.log("list: ", list);
  useEffect(() => {
    async function fetchResult() {
      try {
        const requestURL = "http://localhost/damh-project-1/api/getResult.php";
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.id),
        };
        const response = await fetch(requestURL, requestOption);
        const responseJSON = await response.json();
        const temp = responseJSON;
        const tempData = [];
        temp.forEach((item, index) => {
          tempData.push({ ...item, key: index });
        });
        if (tempData.length > 0) {
          setList(tempData);
          localStorage.setItem("list", JSON.stringify(tempData));
        }
      } catch (error) {
        console.log("fetch search score detail component error: ", error);
      }
    }
    fetchResult();
  }, []);

  const columns = [
    {
      key: "SubjectName",
      title: "Tên môn học",
      dataIndex: "SubjectName",
    },
    {
      key: "scores1",
      title: "Điểm thường kỳ",
      dataIndex: "scores1",
    },
    {
      key: "scores2",
      title: "Điểm giữa kỳ",
      dataIndex: "scores2",
    },
    {
      key: "scores3",
      title: "Điểm kết môn",
      dataIndex: "scores3",
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Xem điểm MSSSV: {user.id}</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Info id={user.id} admin={false}/> */}
      <Row justify="center" className="animation__show">
        <Col xl={20} lg={20} md={20} sm={24} xs={24}>
          <h3 className="score__heading">KẾT QUẢ HỌC Tập</h3>
          <Table
            className="table__responsive"
            size="small"
            columns={columns}
            dataSource={list}
          />
        </Col>
      </Row>
    </>
  );
};
export default Score;
