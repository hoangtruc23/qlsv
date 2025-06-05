import { Button, Form, Input, Modal, Select, Table } from 'antd';
const { Search } = Input;
import { getListStudent } from '../../services/userServices';
import { useEffect, useState } from 'react';
import { getListClass, postStudentInClass } from '../../services/classServices';
import { getGradeHistory, postUpdateGrades } from '../../services/gradesServices';
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

type Grades = {
    process_score?: string;
    midterm_score?: string;
    final_score?: string;
    score_avg: string,
    updated_at: number,
    updated_by_name:string,
};

function EnterScore() {
    const currentUser = useSelector((state: RootState) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalHistory, setIsModalHistory] = useState(false);
    const [listData, setListData] = useState<User[]>([]);
    const [listClass, setListClass] = useState<Class[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentclassID, setStudentclassID] = useState(0);
    const [gradeHistory, setGradeHistory] = useState<Grades>();

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
            render: (_: unknown, record: User) => (
                <>
                    <Button type="link" onClick={() => handleOpenModalEnterScore(record)}>
                        <i className="fa-solid fa-plus"></i>

                    </Button>
                    <Button type="link" onClick={() => handleOpenModalHistory(record)}>
                        <i className="fa-solid fa-clock"></i>
                    </Button>
                </>
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

    const handleSelectedClass = async (value: number) => {
        try {
            const res = await postStudentInClass(value)
            const data = res.data.map((item: User, index: number) => ({
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

    const handleOpenModalEnterScore = (item: User) => {
        setIsModalOpen(true)
        setStudentclassID(item.id)
    }

    const handleOpenModalHistory = async (item: User) => {
        setIsModalHistory(true);
        setStudentclassID(item.id);

        try {
            const history = await getGradeHistory(item.id);
            setGradeHistory(history?.[0]);
        } catch (e) {
            console.error(e);
        }
    };


    const handleSubmitScore = async (value: Grades) => {
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

                        <Form.Item<Grades>
                            label="Điểm quá trình"
                            name="process_score"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Grades>
                            label="Điểm giữa kỳ"
                            name="midterm_score"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Grades>
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



                <Modal
                    title="Lịch sử nhập điểm"
                    open={isModalHistory}
                    onCancel={() => setIsModalHistory(false)}
                    footer={null}
                >
                    {gradeHistory ? (
                        <div className="space-y-2">
                            <p><strong>Điểm quá trình:</strong> {gradeHistory.process_score}</p>
                            <p><strong>Điểm giữa kỳ:</strong> {gradeHistory.midterm_score}</p>
                            <p><strong>Điểm cuối kỳ:</strong> {gradeHistory.final_score}</p>
                            <p><strong>Điểm trung bình:</strong> {gradeHistory.score_avg}</p>
                            <p><strong>Người cập nhật:</strong> {gradeHistory.updated_by_name}</p>
                            <p><strong>Ngày cập nhật:</strong> {new Date(gradeHistory.updated_at).toLocaleString()}</p>
                        </div>
                    ) : (
                        <p>Chưa có dữ liệu điểm.</p>
                    )}
                </Modal>


            </div>
        </>
    )
}

export default EnterScore
