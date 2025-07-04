import { API_URL } from '../api/config';

export const registration = async (formData) => {

    const response = await fetch(`${API_URL}/api/v1/auth/register/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });


    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }
};