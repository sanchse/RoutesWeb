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

  async deleteCliente(id) {
    await this.delete(`clientes/${id}`);
  }

  updateClientestatus(id, nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`clientes/${id}`, { nombre, nif, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createCliente(nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.post(`clientes`, { nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }
}
