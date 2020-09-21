import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class RutasService extends BaseHttpService {
  fetchRutas({ fechaDesde, fechaHasta, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId, search}) {
    const queryObj = {};

    if (fechaDesde.length) {
      queryObj.fechaDesde = fechaDesde;
    }

    if (fechaHasta.length) {
        queryObj.fechaHasta = fechaHasta;
      }

    if (clienteId.length) {
        queryObj.clienteId = clienteId;
    }

    if (transportistaId.length) {
        queryObj.transportistaId = transportistaId;
    }

    if (destinatarioId.length) {
        queryObj.destinatarioId = destinatarioId;
    }

    if (vehiculoId.length) {
        queryObj.vehiculoId = vehiculoId;
    }

    if (remolqueId.length) {
        queryObj.remolqueId = remolqueId;
    }

    if (mercanciaId.length) {
        queryObj.mercanciaId = mercanciaId;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get('rutas' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteCliente(id) {
    await this.delete(`rutas/${id}`);
  }

  updateRutastatus(id, fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId) {
    return this.patch(`rutas/${id}`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId });
  }

  createCliente(fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId) {
    return this.post(`rutas`, { fechaEnvio, origen, destino, peso, litros, muestra, temperatura, numeroBultos, clientesId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId });
  }
}
