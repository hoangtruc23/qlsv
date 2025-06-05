import { useState } from 'react';
import { createUser } from '../../services/authServices';
import { toast } from 'react-toastify';

const RegisterUser = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    card_id: '',
    role: 3,
  });

  const [isroleTeacher, setIsRoleTeacher] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.value == 2) {
      setIsRoleTeacher(true)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(form.full_name, form.role, form.username);
    if (res.success) {
      toast.success(res.message)
      setForm({
        full_name: '',
        email: '',
        username: '',
        password: '',
        card_id: '',
        role: 3,
      })
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6 h-fit m-10"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Đăng ký tài khoản</h2>

        <div>
          <label className="block mb-1 font-medium">Họ và tên</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Nhập họ tên"
          />
        </div>

        {isroleTeacher &&
          <div>
            <label className="block mb-1 font-medium">Tài khoản</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Nhập tài khoản"
            />
          </div>
        }


        {/* <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="example@email.com"
          />
        </div> */}

        {/* <div>
          <label className="block mb-1 font-medium">Mã số</label>
          <input
            type="text"
            name="card_id"
            value={form.card_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="VD: GV001 hoặc SV001"
          />
        </div> */}

        <div>
          <label className="block mb-1 font-medium">Vai trò</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="3">Sinh viên</option>
            <option value="2">Giảng viên</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;