import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class RutasService extends BaseHttpService {
  fetchRutas({ fechaDesde, fechaHasta, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, search }) {
    const queryObj = {};

    if (this.isInitialize(fechaDesde)) {
      queryObj.fechaDesde = fechaDesde;
    }
    if (this.isInitialize(fechaHasta)) {
      queryObj.fechaHasta = fechaHasta;
    }
    if (this.isInitialize(clienteId)) {
      queryObj.clienteId = clienteId;
    }
    if (this.isInitialize(transportistaId)) {
      queryObj.transportistaId = transportistaId;
    }
    if (this.isInitialize(destinatarioId)) {
      queryObj.destinatarioId = destinatarioId;
    }
    if (this.isInitialize(vehiculoId)) {
      queryObj.vehiculoId = vehiculoId;
    }
    if (this.isInitialize(remolqueId)) {
      queryObj.remolqueId = remolqueId;
    }
    if (this.isInitialize(mercanciaId)) {
      queryObj.mercanciaId = mercanciaId;
    }
    if (this.isInitialize(search)) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    const response = this.get('rutas' + (queryStr ? `?${queryStr}` : ''));

    return response;
  }

  isInitialize(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }

  async getRuta(id) {
    return this.get(`rutas/${id}`);
  }

  async deleteCliente(id) {
    await this.delete(`rutas/${id}`);
  }

  updateRuta(id, fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId) {
    return this.patch(`rutas/${id}`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId });
  }

  createRuta(fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId) {
    return this.post(`rutas`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId });
  }
}

export const rutasService = new RutasService();
