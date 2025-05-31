import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div className="bg-blue-500 text-white w-60 min-h-screen cursor-pointer">
            <div className="h-20 flex justify-center items-center">
                <Link to='/admin'>Admin</Link>
            </div>
            <div className="item-sidebar">
                <i className="fa-solid fa-book"></i>
                <Link to='/admin/manage-subject'>Quản lý môn học</Link>
            </div>
            <div className="item-sidebar">
                <i className="fa-solid fa-book"></i>
                <p>Phân công giáo viên</p>
            </div>
            <div className="item-sidebar">
                <i className="fa-solid fa-book"></i>
                <Link to='/admin/manage-student'>Quản lý sinh viên</Link>
            </div>
            <div className="item-sidebar">
                <i className="fa-solid fa-book"></i>
                <p>Xếp lớp sinh viên</p>
            </div>
            <div className="item-sidebar">
                <i className="fa-solid fa-arrow-left"></i>
                <Link to='/login'>Đăng xuất</Link>
            </div>
        </div>
    )
}

export default Sidebar
