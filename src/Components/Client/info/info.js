import "./info.scss";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

Info.propTypes = {
  info: PropTypes.any,
  admin: PropTypes.bool,
};

Info.defaultProps = {
  info: {},
  admin: false,
};

function Info(props) {
  const { info } = props;
  return (
    <Row justify="center">
      <Col xl={12} lg={20} md={20} sm={24} xm={24}>
        <div className="info animation__show">
          <h3 className="info__name">Thông tin</h3>
          <div className="info__body">
            <div
              className="info__image"
              style={{
                backgroundImage: `url(/images/students/${info.id}/${info.image})`,
              }}
            ></div>

            <div className="info__desc">
              <div className="info__item">ID: {info.id}</div>
              <div className="info__item info__item--name">
                Tên: {info.name}
              </div>
              <div className="info__item">SĐT: {info.tel}</div>
              <div className="info__item">
                {info.admin ? <>GV Lớp</> : <>HS Lớp</>}: {info.class}
              </div>
              <div className="info__item">Địa chỉ: {info.address}</div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Info;
