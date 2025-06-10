import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Modal } from "antd";
import { useState } from "react";
import { changePassword } from "../../../services/authServices";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const handleSubmitChange = async () => {
    const res = await changePassword(currentUser.id, passwordOld, passwordNew)
    
    if (res.success) {
      toast.success(res.message)
      setIsModalOpen(false)
    } else {
      toast.error(res.message)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left: Avatar & Basic Info */}
          <div className="md:w-1/3 bg-gray-200 p-6 flex flex-col items-center text-center">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              src={currentUser.avatar || 'https://i.pravatar.cc/150?img=3'}
              alt="Avatar"
            />
            <h2 className="mt-4 text-xl font-semibold">{currentUser.full_name}</h2>
            <p className="text-sm text-gray-600">{currentUser.role == 3 ? 'Sinh viên' : (currentUser.role == 2 ? 'Giảng viên' : "Admin")}</p>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-1 rounded" onClick={() => setIsModalOpen(true)}>
              Đổi mật khẩu
            </button>
          </div>

          <Modal
            title="Đổi mật khẩu"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleSubmitChange}
            onCancel={() => setIsModalOpen(false)}
          >
            <div>
              <label className="block mb-1 font-medium">Mật khẩu hiện tại</label>
              <input
                type="password"
                name="password_old"
                onChange={(e) => setPasswordOld(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div className="my-2">
              <label className="block mb-1 font-medium">Mật khẩu mới</label>
              <input
                type="password"
                name="password_new"
                onChange={(e) => setPasswordNew(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
          </Modal>

          {/* Right: Detailed Info */}
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Thông tin cá nhân</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <span className="font-medium text-gray-600">Họ và tên:</span>
                <span>{currentUser.full_name}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span>{currentUser.email}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium text-gray-600">Mã số:</span>
                <span>{currentUser.card_id}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium text-gray-600">Giới tính:</span>
                <span>{currentUser.gender || 'Chưa cập nhật'}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium text-gray-600">Ngày sinh:</span>
                <span>{currentUser.birthday || 'Chưa cập nhật'}</span>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;