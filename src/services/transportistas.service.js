import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class TransportistasService extends BaseHttpService {
  fetchTransportistas({ nif, codProvincia, search }) {
    const queryObj = {};

    if (this.isInitialize(nif)) {
      queryObj.nif = nif;
    }

    if (this.isInitialize(codProvincia)) {
      queryObj.codProvincia = codProvincia;
    }

    if (this.isInitialize(search)) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('transportistas' + (queryStr ? `?${queryStr}` : ''));
  }

  async getTransportista(id) {
    return this.get(`transportistas/${id}`);
  }

  async deleteTransportista(id) {
    await this.delete(`transportistas/${id}`);
  }

  updateTransportista(id, nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`transportistas/${id}`, { nombre, nif, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createTransportista(nif, nombre, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.post(`transportistas`, { nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }
}

export const transportistasService = new TransportistasService();