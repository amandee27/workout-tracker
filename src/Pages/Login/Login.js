import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../Logo/LoginCover.jpg";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";

const imgStyle = {
  display: "block",
  width: "100%",
  opacity: 0.3,
};

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setLoginError(false);
        const user = userCredential.user;
        localStorage.setItem("token-info", JSON.stringify(user));
        navigate("/home");
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  return (
    <Layout>
      <Content>
        <Row>
          <Col span={12} style={{ minHeight: 800 }}>
            <Row
              align="middle"
              justify="center"
              style={{ minHeight: 800 }}
              //span={12}
            >
              <Col style={{ width: "100%" }}>
                <Row justify="center">
                  <Typography.Title
                    level={1}
                    style={{ justifyContent: "center" }}
                  >
                    Login
                  </Typography.Title>
                </Row>
                <Row
                  justify="center"
                  style={{
                    marginTop: -20,
                    marginBottom: 20,
                  }}
                >
                  <Typography.Paragraph>
                    It's time to regain your fitness!
                  </Typography.Paragraph>
                </Row>
                {loginError && (
                  <Row justify="center">
                    <Typography.Paragraph
                      style={{
                        whiteSpace: "break-spaces",
                        width: "350px",
                        marginTop: -20,
                      }}
                      type="danger"
                    >
                      The email and password you entered did not match our
                      records.Please check and try again.
                    </Typography.Paragraph>
                  </Row>
                )}

                <Row justify="center">
                  <Col style={{ width: "90%", marginLeft: -80 }}>
                    <Form
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      autoComplete="off"
                      requiredMark={false}
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        validateTrigger={["onBlur"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                          { type: "email", message: "Email is invalid" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Row
                        justify="center"
                        style={{
                          paddingBottom: 10,
                          marginLeft: 55,
                          position: "relative",
                        }}
                      >
                        <Link to="/forgot-password">Forgot your password?</Link>
                      </Row>
                      <Form.Item
                        style={{ justifyItems: "center" }}
                        label={null}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                      <Row
                        justify="center"
                        style={{
                          paddingBottom: 10,
                          marginTop: -15,
                          marginLeft: 55,
                          position: "relative",
                        }}
                      >
                        <Typography.Paragraph>
                          Don't have an account ?{" "}
                          <Link to="/create-account">
                            <u>Sign up!</u>
                          </Link>
                        </Typography.Paragraph>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <img alt="avatar" src={LoginImg} style={imgStyle} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
