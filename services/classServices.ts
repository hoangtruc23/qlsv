import rootApi from './baseServices';

async function getListClass() {
    const response = await fetch(`${rootApi}/classes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function assignClass(subject_id: number, teacher_id: number, semester: number) {
    const response = await fetch(`${rootApi}/assign_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id, teacher_id, semester }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function postNewClasses(subject_id: string, teacher_id: string, semester: string, max_students: string) {
    const response = await fetch(`${rootApi}/add_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id, teacher_id, semester, max_students }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function postAssignStudentToClass(class_id: number, student_id: number) {
    const response = await fetch(`${rootApi}/assign_student_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id, student_id }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function postStudentInClass(class_id: number) {
    const response = await fetch(`${rootApi}/student_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}





export { getListClass, assignClass, postNewClasses, postAssignStudentToClass,postStudentInClass }