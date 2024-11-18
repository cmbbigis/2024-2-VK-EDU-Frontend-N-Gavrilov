export class BackendHttpClient {
    static async auth(form) {
        const formData = new FormData(form);

        return await fetch(form.action, {
            method: 'POST',
            body: formData
        })
    }

    static async register(form) {
        const formData = new FormData(form);
        return await fetch(form.action, {
            method: 'POST',
            body: formData
        });
    }
}