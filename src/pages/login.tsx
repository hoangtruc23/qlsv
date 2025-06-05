import { Button, Form, Input } from 'antd';
import { loginAPI } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authentication/authSlice';
import { toast } from 'react-toastify';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values: FieldType) => {
        if (!values.username || !values.password) {
            toast.error('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
            return;
        }
        try {
            const res = await loginAPI(values.username, values.password);
            if (res.success) {
                toast.success(res.message);
                const data = res.data;
                localStorage.setItem('user', JSON.stringify(data));
                dispatch(setUser({
                    id: data.id,
                    full_name: data.full_name,
                    card_id: data.card_id,
                    role: data.role
                }));
                navigate('/');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
                    Đăng nhập vào hệ thống
                </h2>

                <Form
                    name="login-form"
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;