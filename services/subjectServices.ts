const rootApi = import.meta.env.VITE_API_ROOT;

async function getListSubject() {
    const response = await fetch(`${rootApi}/subjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function addSubject(subject_name: string, credit: number) {
    const response = await fetch(`${rootApi}/add_subject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_name, credit }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function assignTeacher(teacher_id: number, subject_id: number) {
    const response = await fetch(`${rootApi}/assign_subject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacher_id, subject_id }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function removeSubject(subjectID: number) {
    const response = await fetch(`${rootApi}/remove_subject/${subjectID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateSubject(subject_id: number, subject_name: string, credit: number) {
    const response = await fetch(`${rootApi}/update_subject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id, subject_name, credit }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getListSubject, addSubject, assignTeacher, removeSubject, updateSubject }