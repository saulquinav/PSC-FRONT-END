import axios from "axios";

import { getBackendBaseApiUrl } from "./api-url";

const API_URL = getBackendBaseApiUrl() + "/auth";

export function getToken(): string | null
{
    return localStorage.getItem('token');
}

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

export async function publicLogin(username: string, password: string) {
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