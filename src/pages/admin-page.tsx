
function AdminPage() {
    return (
        <>
            <h2 className="text-xl font-semibold my-3">Welcome to Admin Dashboard</h2>
            <div className="flex gap-5">
                <div className="text-center bg-red-400 p-3 rounded-2xl text-white">
                    <p>Tổng số sinh viên</p>
                    <p>340 sinh viên</p>
                </div>
                <div className="text-center bg-red-400 p-3 rounded-2xl text-white">
                    <p>Tổng số môn học</p>
                    <p>10</p>
                </div>
                <div className="text-center bg-red-400 p-3 rounded-2xl text-white">
                    <p>Điểm trung bình</p>
                    <p>8.5</p>
                </div>
            </div>
        </>
    )
}

export default AdminPage
