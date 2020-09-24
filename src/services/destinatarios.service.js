import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class DestinatariosService extends BaseHttpService {
  fetchDestinatarios({ nif, codProvincia, search}) {
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
    return this.get('destinatarios' + (queryStr ? `?${queryStr}` : ''));
  }

  async getDestinatario(id) {
    return this.get(`destinatarios/${id}`);
 }

  async deleteDestinatario(id) {
    await this.delete(`destinatarios/${id}`);
  }

  updateDestinatario(id, nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.patch(`destinatarios/${id}`, { nombre, nif, domicilio, localidad, codProvincia, codPostal, observaciones });
  }

  createDestinatario(nombre, nif, domicilio, localidad, codProvincia, pais, codPostal, observaciones) {
    return this.post(`destinatarios`, { nif, nombre, domicilio, localidad, codProvincia, pais, codPostal, observaciones });
  }
}

export const destinatariosService = new DestinatariosService();