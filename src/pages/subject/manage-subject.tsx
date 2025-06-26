import { Input, Table, Button, Modal, Form, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { getListSubject, addSubject, removeSubject, updateSubject } from '../../../services/subjectServices';
import { toast } from 'react-toastify';

const { Search } = Input;

type Subject = {
    subject_id: number;
    subject_name: string;
    credit: number;
    teacher_name: string;
    teacher_id: number;
};

function ManageSubject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalRemove, setIsModalRemove] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [listSubject, setListSubject] = useState<Subject[]>([]);
    const [subjectID, setSubjectID] = useState(0);
    const [formUpdate] = Form.useForm();
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const loadGetListSubject = async () => {
        try {
            const res = await getListSubject();
            setListSubject(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadGetListSubject();
    }, [])

    const dataSource = listSubject.map((item, key) => ({
        subject_id: item.subject_id,
        stt: key + 1,
        subject_name: item.subject_name,
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
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Số tín chỉ',
            dataIndex: 'credit',
            key: 'credit',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: unknown, record: Subject) => (
                <>
                    <Button type="link" onClick={() => handleModalUpdate(record)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button type="link" onClick={() => handleModalRemove(record)}>
                        <i className="fa-solid fa-trash text-red-500"></i>
                    </Button>
                </>
            ),
        }
    ];

    const handleSubmitAdd = async (values: Subject) => {
        if (!Number.isInteger(values.credit) || values.credit <= 0) {
            toast.error("Số tín chỉ phải là số nguyên dương!");
            return;
        }

        try {
            const res = await addSubject(values.subject_name, values.credit);
            if (res.success) {
                toast.success(res.message)
                loadGetListSubject();
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleModalRemove = (item: Subject) => {
        setIsModalRemove(true);
        setSubjectID(item.subject_id)
    }

    const handleSubmitRemove = async () => {
        const res = await removeSubject(subjectID);
        if (res.success) {
            setIsModalRemove(false);
            toast.success(res.message)
            loadGetListSubject();
        }
    }


    const handleModalUpdate = (item: Subject) => {
        setSelectedSubject(item);
        formUpdate.setFieldsValue({
            subject_name: item.subject_name,
            credit: item.credit,
        });
        setIsModalUpdate(true);
    };

    const handleSubmitUpdate = async (values: Subject) => {
        console.log(values)
        if (!selectedSubject) return;
        try {
            const res = await updateSubject(selectedSubject.subject_id, values.subject_name, values.credit);
            if (res.success) {
                toast.success("Cập nhật môn học thành công!");
                setIsModalUpdate(false);
                loadGetListSubject();
            }
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi cập nhật!");
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
                    <Form.Item
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
                        <InputNumber
                            min={1}
                            step={1}
                            onKeyDown={(e) => {
                                if (e.key === '.' || e.key === 'e' || e.key === '-' || e.key === '+') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item label={null} className="text-right">
                        <Button type="primary" htmlType="submit">
                            Thêm môn học
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Xác nhận xóa môn học"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalRemove}
                onCancel={() => setIsModalRemove(false)}
                onOk={() => handleSubmitRemove()}
            >
            </Modal>

            <Modal
                title="Sửa thông tin môn học"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdate}
                onCancel={() => setIsModalUpdate(false)}
                footer={null}
            >
                <Form
                    form={formUpdate}
                    onFinish={handleSubmitUpdate}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginTop: 20 }}
                >
                    <Form.Item
                        label="Tên môn học"
                        name="subject_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số tín chỉ"
                        name="credit"

                        rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ' }]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default ManageSubject
