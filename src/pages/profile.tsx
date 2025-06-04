import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.user);
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
          </div>

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