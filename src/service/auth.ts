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

    /* After login, we need to store the user's credentials somehow.
    ** The credentials come in the form of a JWT token and we store that token
    ** in the browser's 'localStorage'.
    ** The variable inside 'localStorage' will be named 'token' (any name will do). */
    localStorage.setItem('token', data.token);
}

/* This function makes an authenticated request (fetch) to the back-end.
** It automatically includes the user's JWT token in the Authorization header of each request. */
export function fetchWithToken(url: string, options: any = {}) {

    // The token is stored in the browser's 'localStorage', so we get it from there
    const token = localStorage.getItem("token");

    // Create an API request with the token included
    return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    });
};