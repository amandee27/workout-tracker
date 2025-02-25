import { Col, Row } from "antd";

const formHalf = {
  height: "100vh",
};

const AuthPage = ({ children, url }) => {
  var imageHalf = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };
  return (
    <Row className="container">
      <Col span={24} md={12} style={imageHalf}></Col>
      <Col span={24} md={12}>
        <Row justify="space-around" align="middle" style={formHalf}>
          <>{children}</>
        </Row>
      </Col>
    </Row>
  );
};

export default AuthPage;
