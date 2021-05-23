import { useParams, Link } from "react-router-dom";
import Info from "../info/info";
import { Row, Col, Table, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./search-score-detail.scss";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../Context";

const Score = () => {
  const id = useParams();

  const [list, setList] = useState([]);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    async function fetchResult() {
      try {
        const requestURL = "http://localhost/damh-project-1/api/getResult.php";
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id.id),
        };
        const response = await fetch(requestURL, requestOption);
        const responseJSON = await response.json();
        const temp = responseJSON;
        const tempData = [];
        temp.forEach((item, index) => {
          tempData.push({ ...item, key: index });
        });
        setList(tempData);
      } catch (error) {
        console.log("fetch search score detail component error: ", error);
      }
    }
    fetchResult();
  }, []);
  useEffect(() => {
    const values = {
      id: id.id,
      admin: false,
    };
    async function fetchInfo() {
      try {
        const requestURL = "http://localhost/damh-project-1/api/getProfile.php";
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const response = await fetch(requestURL, requestOption);
        const responseJSON = await response.json();
        setInfo(responseJSON);
      } catch (error) {
        console.log("fetch search score detail component error: ", error);
      }
    }

    fetchInfo();
  }, []);
  const columns = [
    {
      key: "SubjectName,",
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
        <Breadcrumb.Item>
          <Link to="/search-score">Tra Cứu Điểm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết điểm MSSSV: {id.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Info info={info} admin={false} className="animation__show" />
      <Row justify="center" className="animation__show">
        <Col xl={20} lg={20} md={20} sm={24} xs={24}>
          <h3 className="score__heading">KẾT QUẢ HỌC Tập</h3>
          <Table
            className="table__responsive"
            columns={columns}
            dataSource={list}
            size="small"
          />
        </Col>
      </Row>
    </>
  );
};
export default Score;
