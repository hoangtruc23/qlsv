import { Input, Table, Button, Modal, Select, List, Avatar, Dropdown, Space, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { getListStudent, getListTeacher } from '../../../services/userServices';
import { getListSubject } from '../../../services/subjectServices';
import { getListClass, getStudentsByClass, postAssignStudentToClass, postNewClasses, postUpdateClassStatus } from '../../../services/classServices';

const { Search } = Input;


type Subject = {
    subject_id: number;
    subject_name: string;
    credit: number;
    teacher_name: string;
    teacher_id: number;
};

type Class = {
    class_id: number;
    class_name: string;
    subject_id: number;
    subject_name: string;
    semester: number;
    teacher_id: number;
    teacher_name: string;
    max_students: number,
    current_students: number,
    status: string;
};

type User = {
    id: number;
    full_name: string;
    card_id: number;
}

function ManageClasses() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAssign, setIsModalAssign] = useState(false);
    const [isViewStudentOpen, setIsViewStudentOpen] = useState(false);
    const [listSubject, setListSubject] = useState<Subject[]>([]);
    const [listClass, setListClass] = useState<Class[]>([]);
    const [listTeacher, setListTeacher] = useState<User[]>([]);
    const [listStudent, setListStudent] = useState<User[]>([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [semester, setSemester] = useState('');
    const [maxStudent, setMaxStudent] = useState('');
    const [currentClass, setCurrentClass] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [listStudentsInClass, setListStudentsInClass] = useState<User[]>([]);
    const statusOptions = ['active', 'closed'];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Lớp học',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: 'Giáo viên',
            dataIndex: 'teacher_name',
            key: 'teacher_name',
        },
        {
            title: 'Max Sinh viên',
            dataIndex: 'max_students',
            key: 'max_students',
        },
        {
            title: 'Sinh viên',
            dataIndex: 'current_students',
            key: 'current_students',
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        // },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_: unknown, record: Class) => renderStatusDropdown(record),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: unknown, record: Class) => (
                <>
                    <Button type="link" onClick={() => handleAssignStudent(record)}>
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                    <Button type="link" onClick={() => handleViewStudents(record)}>
                        <i className="fa-solid fa-eye"></i>
                    </Button>
                </>
            ),
        }
    ];

    const renderStatusDropdown = (record: Class) => {
        const items: MenuProps['items'] = statusOptions.map(status => ({
            key: status,
            label: (
                <span onClick={() => handleChangeStatus(record.class_id, status)}>
                    {status === 'active' && 'Lớp mở'}
                    {status === 'closed' && 'Lớp đóng'}
                </span>
            )
        }));

        return (
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {record.status === 'active' ? 'Lớp mở' : 'Lớp đóng'}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        );
    };

    const handleChangeStatus = async (classId: number, newStatus: string) => {
        const res = await postUpdateClassStatus(classId, newStatus);
        if (res.success) {
            toast.success("Cập nhật trạng thái thành công");
            loadGetListClass();
        } else {
            toast.error("Cập nhật trạng thái thất bại");
        }
    };

    const handleViewStudents = async (item: Class) => {
        setIsViewStudentOpen(true)
        const res = await getStudentsByClass(item.class_id);
        if (res.success) {
            setListStudentsInClass(res.data)
        }
    }
    // const dataSource = listClass.map((item, key) => ({
    //     stt: key + 1,
    //     class_id: item.class_id,
    //     class_name: item.class_name,
    //     subject_id: item.subject_id,
    //     subject_name: item.subject_name,
    //     teacher_name: item.teacher_name,
    //     teacher_id: item.teacher_id,
    //     max_students: item.max_students,
    //     current_students: item.current_students,
    //     status: item.status
    // }));

    const dataSource = listClass
        .filter(item =>
            item.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) || ""
        ).map((item, index) => ({
            stt: index + 1,
            class_id: item.class_id,
            class_name: item.class_name,
            subject_id: item.subject_id,
            subject_name: item.subject_name,
            teacher_name: item.teacher_name,
            teacher_id: item.teacher_id,
            max_students: item.max_students,
            current_students: item.current_students,
            status: item.status,
            semester: item.semester,
        }));

    const handleSearch = (value: string) => {
        setSearchTerm(value.trim().toLowerCase());
    };

    const handleAssignClass = async () => {
        const res = await postNewClasses(selectedSubject, selectedTeacher, semester, maxStudent);
        if (res.success) {
            setIsModalOpen(false);
            loadGetListClass();
            toast.success(res.message);
        }
    }

    const loadGetListSubject = async () => {
        try {
            const res = await getListSubject();
            setListSubject(res)
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

    const loadDataTeacher = async () => {
        try {
            const res = await getListTeacher();
            setListTeacher(res)
        } catch (e) {
            console.log(e)
        }
    }

    const loadDataStudent = async () => {
        try {
            const res = await getListStudent();
            setListStudent(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadGetListClass();
        loadGetListSubject();
        loadDataTeacher();
        loadDataStudent();
    }, [])




    const handleAssignStudent = (item: Class) => {
        setIsModalAssign(true)
        setCurrentClass(item.class_id)
    }


    const handleSubmitAssign = async () => {
        setIsModalAssign(false);
        try {
            // selectedStudentIds.map(async (item) => {
            //     const res = await postAssignStudentToClass(currentClass, item)
            //     console.log(res)
            // })

            await Promise.all(
                selectedStudentIds.map((item) =>
                    postAssignStudentToClass(currentClass, item)
                )
            );

            toast.success("Cập nhật thành công");
            loadGetListClass();
        } catch {
            toast.error("Cập nhật thất bại");
        }
    }

    return (
        <div className="p-10">
            <h1 className="title-page">Quản lý lớp học</h1>
            <div className="w-52 text-center bg-red-400 p-3 rounded-2xl text-white">
                <p>Tổng số lớp học</p>
                <p>{listClass.length}</p>
            </div>
            <div className="flex gap-2 w-1/3 ml-auto">
                <Search
                    placeholder="Nhập tên môn học"
                    allowClear
                    enterButton="Tìm kiếm"
                    onSearch={handleSearch}
                />
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm lớp học</Button>
            </div>


            <Table dataSource={dataSource} columns={columns} className="my-7" />


            <Modal
                title="Thêm lớp học"
                closable={true}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => handleAssignClass()}
            // footer={null}
            >
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <p>Chọn môn học</p>
                        <Select
                            placeholder="Chọn môn học"
                            className="w-full"
                            value={selectedSubject}
                            onChange={(value) => setSelectedSubject(value)}
                        >
                            {listSubject.map((item) => (
                                <Select.Option key={item.subject_id} value={item.subject_id}>
                                    {item.subject_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <p>Chọn giáo viên</p>
                        <Select
                            placeholder="Chọn giáo viên"
                            className="w-full"
                            value={selectedTeacher}
                            onChange={(value) => setSelectedTeacher(value)}
                        >
                            {listTeacher.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.full_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    {/* Nhập học kỳ */}
                    <div className="flex-1 min-w-[200px]">
                        <p>Học kỳ</p>
                        <input
                            type="number"
                            min={1}
                            className="border rounded px-2 py-1 w-full border-[#d9d9d9]"
                            placeholder="Nhập học kỳ"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        />
                    </div>


                    {/* Nhập max */}
                    <div className="flex-1 min-w-[200px]">
                        <p>Tối đa sinh viên</p>
                        <input
                            type="number"
                            min={1}
                            className="border rounded px-2 py-1 w-full border-[#d9d9d9]"
                            value={maxStudent}
                            onChange={(e) => setMaxStudent(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>


            <Modal
                title="Thêm sinh viên vào lớp"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalAssign}
                onCancel={() => setIsModalAssign(false)}
                onOk={() => handleSubmitAssign()}
            >
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p>Chọn sinh viên</p>
                    <Select mode="multiple" placeholder="Chọn sinh viên" className="w-full"
                        value={selectedStudentIds}
                        onChange={(value) => setSelectedStudentIds(value)}
                    >
                        {listStudent.map((teacher) => (
                            <Select.Option key={teacher.id} value={teacher.id} >
                                {teacher.full_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>


            <Modal
                title="Danh sách sinh viên trong lớp"
                open={isViewStudentOpen}
                onCancel={() => setIsViewStudentOpen(false)}
                footer={null}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={listStudentsInClass}
                    renderItem={(student) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={student.full_name}
                                description={student.card_id}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </div >
    )
}

export default ManageClasses
