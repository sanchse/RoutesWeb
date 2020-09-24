import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class VehiculosService extends BaseHttpService {
  fetchVehiculos({ matricula, search }) {
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

  async getVehiculo(id) {
    return this.get(`vehiculos/${id}`);
  }

  async deleteVehiculo(id) {
    await this.delete(`vehiculos/${id}`);
  }

  updateVehiculo(id, nombre, matricula, marca, modelo) {
    return this.patch(`vehiculos/${id}`, { nombre, matricula, marca, modelo });
  }

  createVehiculo(nombre, matricula, marca, modelo) {
    return this.post(`vehiculos`, { nombre, matricula, marca, modelo });
  }
}
