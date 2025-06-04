import { Button, Form, Input, Modal, Select, Table } from 'antd';
const { Search } = Input;
import { getListStudent } from '../../services/userServices';
import { useEffect, useState } from 'react';
import { getListClass, postStudentInClass } from '../../services/classServices';
import { postUpdateGrades } from '../../services/gradesServices';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { toast } from 'react-toastify';

type User = {
    id: number;
    full_name: string;
    card_id: string;
}

type Class = {
    class_id: number;
    class_name: string;
    subject_id: number;
    subject_name: string;
    semester: number;
    teacher_id: number;
    teacher_name: string;
    max_students: number,
    status: string;
};

type FieldType = {
    process_score?: string;
    midterm_score?: string;
    final_score?: string;
};

function EnterScore() {
    const currentUser = useSelector((state: RootState) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listData, setListData] = useState<User[]>([]);
    const [listClass, setListClass] = useState<Class[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentclassID, setStudentclassID] = useState('');


    const loadData = async () => {
        try {
            const res = await getListStudent();

            setListData(res)
        } catch (e) {
            console.log(e)
        }
    }

    const loadGetListClass = async () => {
        try {
            const res = await getListClass();
            setListClass(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadData();
        loadGetListClass();
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Họ tên',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'card_id',
            key: 'card_id',
        },
        {
            title: 'Nhập điểm',
            // dataIndex: 'card_id',
            // key: 'card_id',
            render: (_: unknown, record: object) => (
                <Button type="link" onClick={() => handleOpenModalEnterScore(record)}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
            ),
        },

    ];

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim().toLowerCase());
    };

    const filteredData = listData
        .filter(student =>
            student.full_name?.toLowerCase().includes(searchTerm) ||
            student.card_id.includes(searchTerm)
        )
        .map((item, index) => ({
            id: item.id,
            key: index + 1,
            full_name: item.full_name,
            card_id: item.card_id,
        }));

    const handleSelectedClass = async (value) => {
        try {
            const res = await postStudentInClass(value)
            console.log(res)
            const data = res.data.map((item, index) => ({
                key: item.id,
                id: index + 1,
                full_name: item.full_name,
                card_id: item.card_id,
            }));

            setListData(data);

        } catch (e) {
            console.log(e)
        }

    }

    const handleOpenModalEnterScore = (item) => {
        setIsModalOpen(true)
        setStudentclassID(item.id)
    }

    const handleSubmitScore = async (value) => {
        // student_class_id: number, process_score: number, midterm_score: number, final_score: number, updated_by: number)

        const res = await postUpdateGrades(studentclassID, value.process_score, value.midterm_score, value.final_score, currentUser.id);
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }


    return (
        <>
            <div className="p-10">
                <h1 className="title-page">Nhập điểm</h1>

                <div className="">
                    <div className="flex gap-2 w-1/3 ml-auto">
                        <Search
                            placeholder="Nhập tên hoặc mã số sinh viên"
                            allowClear
                            enterButton="Tìm kiếm"
                            onSearch={handleSearch}
                        />
                    </div>

                    <Select placeholder="Chọn lớp học" onChange={handleSelectedClass} className="w-1/3">
                        {listClass.map((item) => (
                            <Select.Option key={item.class_id} value={item.class_id}>
                                {item.class_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                <Table dataSource={filteredData} columns={columns} className="my-5" />


                <Modal
                    title="Nhập điểm"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    // onOk={() => handleSubmitScore()}
                    footer={null}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={handleSubmitScore}
                        autoComplete="off"
                    >

                        <Form.Item<FieldType>
                            label="Điểm quá trình"
                            name="process_score"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Điểm giữa kỳ"
                            name="midterm_score"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Điểm cuối kỳ"
                            name="final_score"

                        >
                            <Input />
                        </Form.Item>


                        <Form.Item label={null} className="text-right">
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default EnterScore
