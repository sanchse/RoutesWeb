import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class ClientesService extends BaseHttpService {
  fetchClientes({ nif, codProvincia, search}) {
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
    return this.get('clientes' + (queryStr ? `?${queryStr}` : ''));
  }

  async getCliente(id) {
     return this.get(`clientes/${id}`);
  }

  async deleteCliente(id) {
    await this.delete(`clientes/${id}`);
  }

  updateCliente(id, nombre, nif, email, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`clientes/${id}`, { nombre, nif, email, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createCliente(nif, nombre, email, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.post(`clientes`, { nif, nombre, email, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }
}

export const clientesService = new ClientesService();
