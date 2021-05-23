import React, { useState, useContext, useEffect } from "react";
import "./layout.scss";
import { Context } from "../../../Context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//Components
import Login from "../../Client/login/login";
import Score from "../../Client/score/score";
import SearchScore from "../../Client/search-score/search-score";
import Info from "../../Client/info/info";
import SearchScoreDetail from "../../Client/search-score-detail/search-score-detail";
import StudentAdd from "../../Admin/student-add/student-add";
import Student from "../../Admin/student/student";
import SubjectAdd from "../../Admin/subject-add/subject-add";
import Subject from "../../Admin/subject/subject";
import InputScore from "../../Admin/input-score/input-score";

import { Layout, Menu, Button } from "antd";
import { PieChartOutlined, FileSearchOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MainLayout() {
  const { logout, user } = useContext(Context);
  const [select, setSelect] = useState("1");
  const [info, setInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("info"));
  });
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleSelect = (e) => {
    console.log(e.key);
    setSelect(e.key + "");
  };

  useEffect(() => {
    async function fetchInfo() {
      try {
        const requestURL = "http://localhost/damh-project-1/api/getProfile.php";
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };
        const response = await fetch(requestURL, requestOption);
        const responseJSON = await response.json();
        const data = responseJSON;
        if (Object.keys(data).length > 0) {
          setInfo(data);
          localStorage.setItem("info", JSON.stringify(data));
        }
      } catch (error) {
        console.log("fetch search score detail component error: ", error);
      }
    }

    fetchInfo();
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div
            className="logo"
            style={{ backgroundImage: "url(/logo.png)" }}
          ></div>
          <Menu theme="dark" defaultSelectedKeys={[select]} mode="inline">
            <Menu.Item
              key={1}
              icon={<PieChartOutlined />}
              onClick={handleSelect}
            >
              <Link to="/search-score" className="menu__link">
                Tra cứu điểm
              </Link>
            </Menu.Item>

            <Menu.Item
              key={2}
              icon={<PieChartOutlined />}
              disabled={user != null && !user.admin ? false : true}
            >
              <Link to="/score" className="menu__link">
                Xem điểm
              </Link>
            </Menu.Item>
            <Menu.Item
              key={3}
              icon={<PieChartOutlined />}
              disabled={user != null ? false : true}
            >
              <Link to="/my-info" className="menu__link">
                Trang cá nhân
              </Link>
            </Menu.Item>
            <SubMenu
              key="4"
              icon={<PieChartOutlined />}
              title="Dashboard"
              disabled={user != null && user.admin ? false : true}
            >
              <SubMenu key="5" title="Sinh viên">
                <Menu.Item key="6">
                  <Link to="/student-add" className="menu__link">
                    Thêm sinh viên
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/student" className="menu__link">
                    quản lí sinh viên
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="8" title="Môn học">
                <Menu.Item key="9">
                  <Link to="/subject-add" className="menu__link">
                    Thêm môn học
                  </Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/subject" className="menu__link">
                    Quản lí môn học
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="11">
                <Link to="/input-score" className="menu__link">
                  nhập điểm
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            {user != null ? (
              <Button className="header__btn" type="primary" ghost>
                <a
                  className="menu__link"
                  onClick={() => {
                    window.location.replace("/");
                    logout();
                  }}
                >
                  Đăng xuất
                </a>
              </Button>
            ) : (
              <Button className="header__btn" type="primary" ghost>
                <Link
                  to="/login"
                  className="menu__link"
                  key="0"
                  onClick={() => handleSelect({ key: 0 })}
                >
                  Đăng nhập
                </Link>
              </Button>
            )}
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Switch>
              <Route exact path="/">
                <SearchScore />
              </Route>
              <Route exact path="/login">
                {user != null ? (
                  <>
                    <Redirect to="/search-score" />
                  </>
                ) : (
                  <>
                    <Login />
                  </>
                )}
              </Route>
              <Route exact path="/search-score">
                <SearchScore />
              </Route>
              <Route exact path="/search-score-detail/:id">
                <SearchScoreDetail />
              </Route>
              {user != null ? (
                <>
                  <Route exact path="/my-info">
                    <Info info={info} admin={user.admin} />
                  </Route>
                  {user.admin ? (
                    <>
                      <Route exact path="/student">
                        <Student />
                      </Route>
                      <Route exact path="/student-add">
                        <StudentAdd />
                      </Route>
                      <Route exact path="/subject">
                        <Subject />
                      </Route>
                      <Route exact path="/subject-add">
                        <SubjectAdd />
                      </Route>
                      <Route exact path="/input-score">
                        <InputScore />
                      </Route>
                    </>
                  ) : (
                    <>
                      <Route exact path="/score">
                        <Score />
                      </Route>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </Switch>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              fontSize: "12px",
              backgroundColor: "#ccc",
            }}
          >
            Nguyễn Ngọc Lễ - 1811546634 &amp; Huỳnh Kỳ Khôi Nguyên - 1811546506
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}
export default MainLayout;
