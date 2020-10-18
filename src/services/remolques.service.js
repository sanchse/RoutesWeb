import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class RemolquesService extends BaseHttpService {
  fetchRemolques({ matricula, search}) {
    const queryObj = {};

    if (this.isInitialize(matricula)) {
      queryObj.nif = matricula;
    }

    if (this.isInitialize(search)) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('remolques' + (queryStr ? `?${queryStr}` : ''));
  }

  async getRemolque(id) {
    return this.get(`remolques/${id}`);
 }

  async deleteRemolque(id) {
    await this.delete(`remolques/${id}`);
  }

  updateRemolque(id, nombre, matricula, marca, modelo) {
    return this.patch(`remolques/${id}`, { nombre, matricula, marca, modelo });
  }

  createRemolque(nombre, matricula, marca, modelo) {
    return this.post(`remolques`, { nombre, matricula, marca, modelo });
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }
}

export const remolquesService = new RemolquesService();