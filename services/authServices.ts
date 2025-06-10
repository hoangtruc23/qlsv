const rootApi = import.meta.env.VITE_API_ROOT;


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

export async function changePassword(user_id: number, old_password: string, new_password: string) {
    const response = await fetch(`${rootApi}/change_password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, old_password, new_password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}




