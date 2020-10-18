import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class MercanciasService extends BaseHttpService {
  fetchMercancias({ search}) {
    const queryObj = {};

    if (this.isInitialize(search)) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('mercancias' + (queryStr ? `?${queryStr}` : ''));
  }

  async getMercancia(id) {
    return this.get(`mercancias/${id}`);
 }

  async deleteMercancia(id) {
    await this.delete(`mercancias/${id}`);
  }

  updateMercancia(id, nombre, observaciones) {
    return this.patch(`mercancias/${id}`, { nombre, observaciones });
  }

  createMercancia(nombre, observaciones) {
    return this.post(`mercancias`, { nombre, observaciones });
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }
}

export const mercanciasService = new MercanciasService();
