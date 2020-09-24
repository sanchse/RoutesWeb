import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class VehiculosService extends BaseHttpService {
  fetchVehiculos({ matricula, search}) {
    const queryObj = {};

    if (matricula.length) {
      queryObj.nif = matricula;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('vehiculos' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCliente(id) {
    await this.delete(`vehiculos/${id}`);
  }

  updateVehiculostatus(id, nombre, matricula, marca, modelo) {
    return this.patch(`vehiculos/${id}`, { nombre, matricula, marca, modelo });
  }

  createCliente(nombre, matricula, marca, modelo) {
    return this.post(`vehiculos`, { nombre, matricula, marca, modelo });
  }
}
