import { Input, Table } from 'antd';
const { Search } = Input;
import { getListStudent } from '../../services/userServices';
import { useEffect, useState } from 'react';

type User = {
    id: number;
    full_name: string;
    card_id: string;
    username:string;
}
function ManageStudent() {
    const [listData, setListData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const loadData = async () => {
        try {
            const res = await getListStudent();

            setListData(res)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadData();
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'card_id',
            key: 'card_id',
        },

    ];

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim().toLowerCase());
    };

    const filteredData = listData
        .filter(student =>
            student.full_name.toLowerCase().includes(searchTerm) ||
            student.card_id.includes(searchTerm)
        )
        .map((item, index) => ({
            key: item.id,
            id: index + 1,
            name: item.full_name,
            card_id: item.card_id,
            username:item.username
        }));

    return (
        <div className="p-10">
            <h1 className="title-page">Quản lý sinh viên</h1>
            <div className="w-52 text-center bg-red-400 p-3 rounded-2xl text-white">
                <p>Tổng số sinh viên</p>
                <p>{listData.length}</p>
            </div>

            <div className="flex gap-2 w-1/3 ml-auto">
                <Search
                    placeholder="Nhập tên hoặc mã số sinh viên"
                    allowClear
                    enterButton="Tìm kiếm"
                    onSearch={handleSearch}
                />
            </div>


            <Table dataSource={filteredData} columns={columns} className="my-10" />
        </div>
    )
}

export default ManageStudent
