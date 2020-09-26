import BaseHttpService from "./base-http.service";

export default class HealthService extends BaseHttpService {
    async checkHealth() {
        return this.get('health');
    }
}

export const healthService = new HealthService();
