import { Alert, Button, Divider, Form, Input, Row, Typography } from "antd";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import CreateAccountImg from "../../Logo/CreateAccount.jpg";
import "./CreateAccount.css";
import { useState } from "react";
import authErrors from "../../data/firebase-error-meassages.js";
import AuthPage from "../AuthPage/AuthPage.js";
const { Title, Text } = Typography;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: values.name,
        }).then(() => {
          localStorage.setItem("token-info", JSON.stringify(user));
          navigate("/home");
        });
      })
      .catch((error) => {
        let errorCode = error.code;
        let result = /.+\/(.+)/g.exec(errorCode);
        setErrorMessage(authErrors[result[1]]);
      });
  };

  return (
    <AuthPage url={CreateAccountImg}>
      <Form
        name="basic"
        layout="vertical"
        style={{
          maxWidth: 400,
        }}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Title>Sign In</Title>
        <Title level={5}>Welcome to Fitness Tracker!</Title>
        <Text>
          Join us to kickstart your fitness journey! Set goals, customize
          workouts, and track progress—all in one place.
        </Text>
        <Divider />
        {errorMessage && (
          <Row justify="center">
            <Alert
              type="error"
              message={errorMessage}
              style={{
                marginBottom: 10,
                width: 400,
              }}
              banner
            />
          </Row>
        )}
        <Form.Item
          label="Name"
          name="name"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
        <Text>
          Already have an account? <Link to={"/login"}>Login!</Link>
        </Text>
      </Form>
    </AuthPage>
  );
};

export default CreateAccount;
