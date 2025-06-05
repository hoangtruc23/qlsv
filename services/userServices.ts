const rootApi = import.meta.env.VITE_API_ROOT;

async function getListStudent() {
    const response = await fetch(`${rootApi}/students`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function getListTeacher() {
    const response = await fetch(`${rootApi}/teachers`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getListStudent, getListTeacher }