import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class RutasService extends BaseHttpService {
  fetchRutas({ fechaDesde, fechaHasta, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, search }) {
    const queryObj = {};

    if (this.isInitialized(fechaDesde)) {
      queryObj.fechaDesde = fechaDesde;
    }
    if (this.isInitialized(fechaHasta)) {
      queryObj.fechaHasta = fechaHasta;
    }
    if (this.isInitialized(clienteId)) {
      queryObj.clienteId = clienteId;
    }
    if (this.isInitialized(transportistaId)) {
      queryObj.transportistaId = transportistaId;
    }
    if (this.isInitialized(destinatarioId)) {
      queryObj.destinatarioId = destinatarioId;
    }
    if (this.isInitialized(vehiculoId)) {
      queryObj.vehiculoId = vehiculoId;
    }
    if (this.isInitialized(remolqueId)) {
      queryObj.remolqueId = remolqueId;
    }
    if (this.isInitialized(mercanciaId)) {
      queryObj.mercanciaId = mercanciaId;
    }
    if (this.isInitialized(search)) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    const response = this.get('rutas' + (queryStr ? `?${queryStr}` : ''));

    return response;
  }

  isInitialized(obj) {
    return obj !== undefined && obj !== null && obj.length;
  }

  async getRuta(id) {
    return this.get(`rutas/${id}`);
  }

  async deleteRuta(id) {
    await this.delete(`rutas/${id}`);
  }

  updateRuta(id, fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, observacionesCargador, observacionesTransportista) {
    return this.put(`rutas/${id}`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, observacionesCargador, observacionesTransportista });
  }

  createRuta(fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, observacionesCargador, observacionesTransportista) {
    return this.post(`rutas`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, observacionesCargador, observacionesTransportista });
  }

  finalizeRuta(id) {
    return this.patch(`rutas/${id}/status`);
  }

  signRuta(id, firma) {
    return this.patch(`rutas/${id}`, { firma });
  }
}

export const rutasService = new RutasService();
