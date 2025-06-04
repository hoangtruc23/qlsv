import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store";

function Sidebar() {
    const currentUser = useSelector((state: RootState) => state.user);

    const menuItemClass =
        "flex items-center gap-3 px-6 py-3 hover:bg-blue-600 transition rounded-md";

    const sectionTitle = (text: string) => (
        <div className="px-6 py-2 mt-4 text-xs uppercase font-bold text-blue-200 tracking-wider">
            {text}
        </div>
    );

    const roleAdmin = () => (
        <>
            {sectionTitle("Quản trị viên")}

            <Link to="/admin/manage-classes">
                <div className={menuItemClass}>
                    <i className="fa-solid fa-chalkboard-teacher w-5 text-white"></i>
                    Quản lý lớp học
                </div>
            </Link>

            <Link to="/admin/manage-subject">
                <div className={menuItemClass}>
                    <i className="fa-solid fa-book-open w-5 text-white"></i>
                    Quản lý môn học
                </div>
            </Link>

            <Link to="/admin/manage-student">
                <div className={menuItemClass}>
                    <i className="fa-solid fa-user-graduate w-5 text-white"></i>
                    Quản lý sinh viên
                </div>
            </Link>

            <Link to="/admin/register-user">
                <div className={menuItemClass}>
                    <i className="fa-solid fa-user-plus w-5 text-white"></i>
                    Tạo tài khoản
                </div>
            </Link>
        </>
    );

    const roleTeacher = () => (
        <>
            {sectionTitle("Giảng viên")}

            <Link to="/teacher/enter_score">
                <div className={menuItemClass}>
                    <i className="fa-solid fa-pen-to-square w-5 text-white"></i>
                    Nhập điểm
                </div>
            </Link>
        </>
    );

    return (
        <div className="bg-blue-500 text-white w-64 min-h-screen py-4 shadow-lg">
            <Link to="/admin">
                <div className="text-2xl font-bold text-center py-6 border-b border-blue-300 uppercase">
                    Quản lý sinh viên
                </div>
            </Link>

            <div className="mt-4">
                {currentUser.role === 1 && roleAdmin()}
                {currentUser.role === 2 && roleTeacher()}
            </div>

            <div className="mt-auto px-6">
                <Link to="/login">
                    <div className="flex items-center gap-3 py-3 hover:bg-blue-600 transition rounded-md mt-6">
                        <i className="fa-solid fa-right-from-bracket w-5 text-white"></i>
                        Đăng xuất
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;