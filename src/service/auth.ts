import { getBackendBaseApiUrl } from "./api-url";

const API_URL = getBackendBaseApiUrl() + "/auth";

export async function login(username: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
}