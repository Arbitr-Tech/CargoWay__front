import { API_URL } from '../api/config';

export const registration = async (userType, formData) => {
    console.log(userType)

    const response = await fetch(`${API_URL}/api/v1/auth/register/?profile_type=${userType}`, {
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

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    console.log(data)
    return data;
};