import { Button, Checkbox, Flex, Form, Input } from "antd";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import {  auth  } from '../../ firebase';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        signInWithEmailAndPassword(auth, values.username, values.password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log(user);
            navigate("/home");
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return ( 
        <div id="container">
        <Flex justify='center'>
            <h1>Login</h1>
        </Flex>
        <Flex justify='center'>
            <Form name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    </div>
     );
}
 
export default Login;