import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class ClientesService extends BaseHttpService {
  fetchClientes({ nif, codProvincia, search}) {
    const queryObj = {};

    if (nif.length) {
      queryObj.nif = nif;
    }

    if (codProvincia.length) {
        queryObj.codProvincia = codProvincia;
    }

    if (search.length) {
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

  updateCliente(id, nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`clientes/${id}`, { nombre, nif, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createCliente(nif, nombre, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    console.log('justo antes de llamar a la API');

    return this.post(`clientes`, { nif, nombre, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }
}

export const clientesService = new ClientesService();
