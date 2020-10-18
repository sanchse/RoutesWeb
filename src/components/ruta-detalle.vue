<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/" class="btn btn-sm btn-outline-secondary"
        >Volver</router-link
      >
    </div>

    <h5>DOCUMENTO DE CONTROL DE TRANSPORTE PÚBLICO DE MERCANCÍAS POR CARRETERA</h5>
    <div class="container-fluid">
      <md-content>
        <md-card>
          <md-card-header>
            <div class="md-title">Datos del cargador contractual</div>
          </md-card-header>

          <md-card-content>
              <div class="wrapper">
                  <div>
                    <label for="nombrecliente">Nombre o denominación social</label>
                  </div>
                  <div>
                    <span class="wrapper" id="nombrecliente">{{ruta.cliente.nombre}}</span>
                  </div>
                  <div class="col-sm-4">
                    <label for="nifcliente">NIF</label>
                  </div>
                  <div class="col-sm-4">
                    <span>{{ruta.cliente.nif}}</span>
                  </div>
              </div>
              
              <div class="wrapper">
                  <div>
                    <label for="provinciacliente">Provincia</label>
                  </div>
                <div>
                    <span>{{ this.provinciaString(ruta.cliente.codProvincia)}}</span>
                </div>
                <div>
                    <label for="localidadcliente">Poblacion</label>
                </div>
                <div>
                    <span>{{ruta.cliente.localidad}}</span>
                </div>
              </div>

            <div class="wrapper">
                <div>
                    <label for="codpostalcliente">Código postal</label>
                </div>
                <div>
                    <span>{{ruta.cliente.codPostal}}</span>
                </div>
                <div>
                    <label for="observacionescliente">Observaciones del cargador</label>
                </div>
                <div>
                    <span>{{ruta.cliente.observaciones}}</span>
                </div>
            </div>
        </md-card-content>
        </md-card>
      </md-content>

      <md-card>
          <md-card-header>
            <div class="md-title">Datos del transportista efectivo</div>
          </md-card-header>

          <md-card-content>
              <div>
                <label for="nombretransportista">Nombre o denominación social</label>
                <span id="nombretransportista">{{ruta.transportista.nombre}}</span>
              </div>
              <div>
                <label for="niftransportista">NIF</label>
                <span>{{ruta.transportista.nif}}</span>
              </div>
              <div>
                <label for="provinciatransportista">Provincia</label>
                <span>{{ this.provinciaString(ruta.transportista.codProvincia)}}</span>
              </div>
              <div>
                <label for="localidadtransportista">Poblacion</label>
                <span>{{ruta.transportista.localidad}}</span>
              </div>
              <div>
                <label for="codpostaltransportista">Código postal</label>
                <span>{{ruta.transportista.codPostal}}</span>
              </div>
              <div>
                <label for="observacionestransportista">Observaciones del cargador</label>
                <span>{{ruta.transportista.observaciones}}</span>
              </div>
        </md-card-content>
        </md-card>
  

      <md-card>
          <md-card-header>
            <div class="md-title">Datos del transporte</div>
          </md-card-header>

          <md-card-content>
              <div>
                <label for="origen">Origen</label>
                <span>{{ruta.origen}}</span>
              </div>
              <div>
                <label for="destino">Destino</label>
                <span>{{ruta.destino}}</span>
              </div>
              <div>
                <label for="fecha">Fecha de envío</label>
                <span>{{ruta.fechaEnvio | formatDate}}</span>
              </div>
          </md-card-content>
      </md-card>

      <md-card>
          <md-card-header>
            <div class="md-title">Datos de la mercancía</div>
          </md-card-header>

          <md-card-content>
              <div>
                <label for="naturaleza">Naturaleza</label>
                <span>{{ruta.mercancia.nombre}}</span>
              </div>
              <div v-if="ruta.peso">
                <label for="perso">Peso (kg.)</label>
                <span>{{ruta.peso | formatNumber}}</span>
              </div>
              <div v-if="ruta.numberoBultos">
                <label for="numBultos">Número de bultos</label>
                <span>{{ruta.numberoBultos}}</span>
              </div>
              <div v-if="ruta.litros">
                <label for="litros">Litros</label>
                <span>{{ruta.litros}}</span>
              </div>


              <div v-if="ruta.muestra">
                <md-switch style="" v-model="ruta.muestra" class="md-primary">Muestra</md-switch>
              </div>
              <div v-if="ruta.temperatura">
                <label for="temperatura">Temperatura</label>
                <span>{{ruta.temperatura}}</span>
              </div>
          </md-card-content>
      </md-card>

      <md-card>
          <md-card-header>
            <div class="md-title">Matrículas de los vehiculos que intervienen en el transporte</div>
          </md-card-header>

          <md-card-content>
              <div>
                <label for="tractor">Vehículo tractor</label>
                <span>{{ruta.vehiculo.matricula}}</span>
              </div>
              <div>
                <label for="remolque">Remolque o semiremolque</label>
                <span>{{ruta.remolque.matricula}}</span>
              </div>
          </md-card-content>
      </md-card>


      <md-card>
          <md-card-header>
            <div class="md-title">Destinatario</div>
          </md-card-header>

          <md-card-content>
              <div>
                <label for="nombredestinatario">Nombre o denominación social</label>
                <span id="nombredestinatario">{{ruta.destinatario.nombre}}</span>
              </div>
              <div>
                <label for="nifdestinatario">NIF</label>
                <span>{{ruta.destinatario.nif}}</span>
              </div>
              <div>
                <label for="provinciadestinatario">Provincia</label>
                <span>{{ this.provinciaString(ruta.destinatario.codProvincia)}}</span>
              </div>
              <div>
                <label for="localidaddestinatario">Poblacion</label>
                <span>{{ruta.destinatario.localidad}}</span>
              </div>
              <div>
                <label for="codpostaldestinatario">Código postal</label>
                <span>{{ruta.destinatario.codPostal}}</span>
              </div>
              <div>
                <label for="observacionesdestinatario">Observaciones del cargador</label>
                <span>{{ruta.destinatario.observaciones}}</span>
              </div>
          </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { rutasService } from "../services/rutas.service";
import provinciasFile from "../assets/provincias.json";

export default {
  data() {
    return {
      rutaId: null,
      ruta: {},
      provincias: provinciasFile.provincias,
    };
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.rutaId = this.$route.params.id;
      this.getRuta(this.$route.params.id);
    }
  },
  methods: {
    getRuta(id) {
      const vm = this;
      rutasService.getRuta(id).then((result) => {
        vm.ruta = result.data;
      });
    },
    provinciaString(id) {
      const provincia = this.provincias.filter(function (data) {
        return data.id == id;
      });

      return provincia || provincia.length ? provincia[0].name : "";
    },
  },
};
</script>

<style scoped>
.md-switch {
  display: flex;
}

.md-card {
  margin: 4px;
  vertical-align: top;
}

.md-content {
  /* width: 200px;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center; */
}

.wrapper {
  display: flex;
}

.wrapper > label {
  font-weight: bold;
}

.wrapper > div {
  font-size: 2vh;
  color: gray;
  background: rgb(245, 241, 241);
  margin: 0.1em;
  padding: 0.3em;
  border-radius: 3px;
  flex: 1;
}
</style>