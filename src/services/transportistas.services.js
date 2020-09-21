import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class TransportistasService extends BaseHttpService {
  fetchTransportistas({ nif, codProvincia, search}) {
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
    return this.get('transportistas' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCliente(id) {
    await this.delete(`transportistas/${id}`);
  }

  updateTransportistastatus(id, nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`transportistas/${id}`, { nombre, nif, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createCliente(nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.post(`transportistas`, { nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }
}
