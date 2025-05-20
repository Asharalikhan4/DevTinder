export async function fetcher(url: string, options: RequestInit = {}) {
    const res = await fetch(url, {
        ...options,
        credentials: 'include', // Send cookies
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    const data = await res.json();
    if (!res.ok) throw data.message || 'Error';
    return data;
};