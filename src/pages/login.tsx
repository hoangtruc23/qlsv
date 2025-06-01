// import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

import { loginAPI } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const handleLogin = async (values: FieldType) => {
        if (!values.username || !values.password) {
            console.error('Username and password are required');
            return;
        }

        try {
            const res = await loginAPI(values.username, values.password);
            if (res.success) {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    };



    return (
        <div className="screen-center gap-6 h-screen">
            <h2 className="bg-w text-2xl font-semibold">Đăng nhập vào hệ thống</h2>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleLogin}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
