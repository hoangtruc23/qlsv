import rootApi from './baseServices';



export async function loginAPI(username: string, password: string) {
    const response = await fetch(`${rootApi}/login/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function createUser(full_name: string, role: number, username: string) {
    const response = await fetch(`${rootApi}/create_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, role, username }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


