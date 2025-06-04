import { Input, Table, Button, Modal, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getListSubject, addSubject, assignTeacher } from '../../services/subjectServices';
import { getListTeacher } from '../../services/userServices';
import { toast } from 'react-toastify';

const { Search } = Input;

type Subject = {
    subject_id: number;
    subject_name: string;
    credit: number;
    teacher_name: string;
    teacher_id: number;
};

type User = {
    id: number;
    full_name: string;
    card_id: number;
}


function ManageSubject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAssign, setIsModalAssign] = useState(false);
    const [listSubject, setListSubject] = useState<Subject[]>([]);
    const [listTeacher, setListTeacher] = useState<User[]>([]);
    const [subjectID, setSubjectID] = useState(0);

    const loadGetListSubject = async () => {
        try {
            const res = await getListSubject();
            setListSubject(res)
        } catch (e) {
            console.log(e)
        }
    }

    const loadDataTeacher = async () => {
        try {
            const res = await getListTeacher();
            setListTeacher(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadGetListSubject();
        loadDataTeacher();
    }, [])

    const dataSource = listSubject.map((item, key) => ({
        subject_id: item.subject_id,
        stt: key + 1,
        name: item.subject_name,
        credit: item.credit,
        teacher_name: item.teacher_name,
        teacher_id: item.teacher_id
    }));

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Môn học',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số tín chỉ',
            dataIndex: 'credit',
            key: 'credit',
        },
        // {
        //     title: 'Giáo viên',
        //     dataIndex: 'teacher_name',
        //     key: 'teacher_name',
        // },
        // {
        //     title: 'Thao tác',
        //     key: 'action',
        //     render: (_: unknown, record: object) => (
        //         <Button type="link" onClick={() => handleAssignTeacher(record)}>
        //             <i className="fa-solid fa-plus"></i>
        //         </Button>
        //     ),
        // }
    ];

    const handleSubmitAdd = async (values: Subject) => {
        try {
            const res = await addSubject(values.subject_name, values.credit);
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSelectedTeacher = async (teacher_id: number) => {
        const res = await assignTeacher(teacher_id, subjectID);
        if (res.success) {
            setIsModalAssign(false);
            loadGetListSubject();
            toast.success(res.message);
        }
    };

    return (
        <div className="p-10">
            <h1 className="title-page">Quản lý môn học</h1>
            <div className="w-52 text-center bg-red-400 p-3 rounded-2xl text-white">
                <p>Tổng số môn học</p>
                <p>{listSubject.length}</p>
            </div>
            <div className="flex gap-2 w-1/3 ml-auto">
                <Search
                    placeholder="Nhập tên môn học"
                    allowClear
                    enterButton="Tìm kiếm"

                // onSearch={onSearch}
                />
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm môn học</Button>
            </div>


            <Table dataSource={dataSource} columns={columns} className="my-7" />

            <Modal
                title="Thêm môn học"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, marginTop: 30 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={handleSubmitAdd}
                >
                    <Form.Item<Subject>
                        label="Tên môn học"
                        name="subject_name"
                        rules={[{ required: true, message: 'Hãy nhập tên môn học!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Subject>
                        label="Số tín chỉ"
                        name="credit"
                        rules={[{ required: true, message: 'Hãy nhập số tín chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null} className="text-right">
                        <Button type="primary" htmlType="submit">
                            Thêm môn học
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal
                title="Gán môn học cho giáo viên"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalAssign}
                onCancel={() => setIsModalAssign(false)}
                footer={null}
            >
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p>Chọn giáo viên</p>
                    <Select placeholder="Chọn giáo viên" onChange={handleSelectedTeacher}>
                        {listTeacher.map((teacher) => (
                            <Select.Option key={teacher.id} value={teacher.id}>
                                {teacher.full_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </div >
    )
}

export default ManageSubject
