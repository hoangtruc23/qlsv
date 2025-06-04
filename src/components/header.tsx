import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const currentUser = useSelector((state: RootState) => state.user);

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <div className="min-h-15 shadow-md font-semibold p-3 text-right relative">
            {currentUser.full_name}
            <i
                className="fa-solid fa-user text-xl bg-gray-300 p-2 rounded-full cursor-pointer mx-2"
                onClick={toggleDropdown}
            ></i>

            {showDropdown && (
                <div className="absolute right-0 mt-2 bg-gray-200 mx-5 px-5 py-2 rounded-xl">
                    <div className="p-2">
                        <Link to="/profile">Thông tin cá nhân</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/login">Đăng xuất</Link>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Header
