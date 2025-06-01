import rootApi from './baseServices';



async function loginAPI(username: string, password: string) {
    const response = await fetch(`${rootApi}/api/login/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


export { loginAPI }