import { Input, Table } from 'antd';
const { Search } = Input;
import { getListStudent } from '../../services/userServices';
import { useEffect, useState } from 'react';

type User = {
    id: number;
    full_name: string;
    card_id: number;
}
function ManageStudent() {
    const [listData, setListData] = useState<User[]>([]);

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

    const dataSource = listData.map((item, key) => ({
        key: item.id,
        id: key + 1,
        name: item.full_name,
        card_id: item.card_id,
    }))

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
            title: 'Mã số sinh viên',
            dataIndex: 'card_id',
            key: 'card_id',
        },

    ];

    return (
        <div className="p-10">
            <h1 className="title-page">Quản lý sinh viên</h1>
            <div className="w-52 text-center bg-red-400 p-3 rounded-2xl text-white">
                <p>Tổng số sinh viên</p>
                <p>{listData.length}</p>
            </div>

            <div className="flex gap-2 w-1/3 ml-auto">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"

                // onSearch={onSearch}
                />
            </div>


            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ManageStudent
