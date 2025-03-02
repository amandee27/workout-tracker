import { Alert, Button, Divider, Form, Input, Row, Typography } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../Logo/loginPage.jpg';
import { useState } from 'react';
import authErrors from '../../data/firebase-error-meassages.js';
import AuthPageLayout from '../AuthPageLayout/AuthPageLayout.js';
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setErrorMessage('');
        const user = userCredential.user;
        localStorage.setItem('token-info', JSON.stringify(user));
        navigate('/');
      })
      .catch((error) => {
        let errorCode = error.code;
        let result = /.+\/(.+)/g.exec(errorCode);
        setErrorMessage(authErrors[result[1]]);
      });
  };

  return (
    <AuthPageLayout url={loginImg}>
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
        <Title>Login</Title>
        <Title level={5}>Hello, Welcome Back!</Title>
        <Text>
          It's time to regain your fitness! Log in to track progress, reach your goals, and access personalized workout
          plans.
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
          label="Email"
          name="email"
          validateTrigger={['onBlur']}
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            { type: 'email', message: 'Email is invalid' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          validateTrigger={['onBlur']}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row>
          <Text style={{ marginBottom: 10 }}>
            <Link to="/forgot-password">Forgot your password?</Link>
          </Text>
        </Row>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
        <Text>
          Don't have an account ? <Link to={'/create-account'}>Create Account!</Link>
        </Text>
      </Form>
    </AuthPageLayout>
  );
};

export default Login;
