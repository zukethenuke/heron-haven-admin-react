import Api from './Api';

export default {
    async getMessages() {
        let messages = await Api().get('contact_us');
        return messages.data;
    },
    update(id, data) {
        return Api().put(`contact_us/${id}`, data)
    }
}