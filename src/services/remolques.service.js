import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class RemolquesService extends BaseHttpService {
  fetchRemolques({ matricula, search}) {
    const queryObj = {};

    if (matricula.length) {
      queryObj.nif = matricula;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('remolques' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCliente(id) {
    await this.delete(`remolques/${id}`);
  }

  updateRemolquestatus(id, nombre, matricula, marca, modelo) {
    return this.patch(`remolques/${id}`, { nombre, matricula, marca, modelo });
  }

  createCliente(nombre, matricula, marca, modelo) {
    return this.post(`remolques`, { nombre, matricula, marca, modelo });
  }
}
