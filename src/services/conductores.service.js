import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class ConductoresService extends BaseHttpService {
  fetchConductores({ nif, search}) {
    const queryObj = {};

    if (this.isInitialize(nif)) {
      queryObj.nif = nif;
    }

    if (this.isInitialize(search)) {  
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('conductores' + (queryStr ? `?${queryStr}` : ''));
  }

  async getConductor(id) {
     return this.get(`conductores/${id}`);
  }

  async deleteConductor(id) {
    await this.delete(`conductores/${id}`);
  }

  updateConductor(id, nif, nombre, apellido1, apellido2, observaciones) {
    return this.patch(`conductores/${id}`, { nif, nombre, apellido1, apellido2, observaciones });
  }

  createConductor(nif, nombre, apellido1, apellido2, observaciones) {
    return this.post(`conductores`, { nif, nombre, apellido1, apellido2, observaciones });
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }
}

export const conductoresService = new ConductoresService();
