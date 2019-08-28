import Api from './Api';

export default {
    async getMessages() {
        let messages = await Api().get('contact_us');
        return messages.data;
    },
}