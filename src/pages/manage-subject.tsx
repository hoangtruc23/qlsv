import { Input, Table,Button } from 'antd';
const { Search } = Input;

function ManageSubject() {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div className="p-10">
             <h1 className="title-page">Quản lý môn học</h1>
            <div className="w-52 text-center bg-red-400 p-3 rounded-2xl text-white">
                <p>Tổng số môn học</p>
                <p>10</p>
            </div>
            <div className="flex gap-2 w-1/3 ml-auto">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"

                // onSearch={onSearch}
                />
                <Button type="primary">Thêm môn học</Button>
            </div>


            <Table dataSource={dataSource} columns={columns} />;

        </div>
    )
}

export default ManageSubject
