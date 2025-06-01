import rootApi from './baseServices';

async function getListStudent() {
    const response = await fetch(`${rootApi}/api/students`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function getListTeacher() {
    const response = await fetch(`${rootApi}/api/teachers`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getListStudent, getListTeacher }