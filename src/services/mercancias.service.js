import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class MercanciasService extends BaseHttpService {
  fetchMercancias({ search}) {
    const queryObj = {};

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('mercancias' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCliente(id) {
    await this.delete(`mercancias/${id}`);
  }

  updateMercanciastatus(id, nombre, observaciones) {
    return this.patch(`mercancias/${id}`, { nombre, observaciones });
  }

  createCliente(nombre, observaciones) {
    return this.post(`mercancias`, { nombre, observaciones });
  }
}
