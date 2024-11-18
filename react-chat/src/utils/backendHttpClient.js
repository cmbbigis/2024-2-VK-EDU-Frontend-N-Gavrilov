export class BackendHttpClient {
    static async auth(form) {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            throw new Error('Error occurred!');
        }
        return response;
    }

    static async register(form) {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            throw new Error('Error occurred!');
        }
        return response;
    }
}