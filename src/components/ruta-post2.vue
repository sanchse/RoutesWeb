<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/rutas" class="btn btn-sm btn-outline-secondary"
        >Volver</router-link
      >
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{ editMode ? "Modificar " : "Crear " }} Ruta</h2>
        <!-- <span class="text-muted"
          >{{ editMode ? "Actualizar " : "Añadir nuevo " }} registro</span
        > -->
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">      
      <legend>Datos de la ruta</legend>

      <b-form @submit="checkForm" :novalidate=true>
        <div class="row">
          <div class="col-6">
            <b-form-group
              id="input-group-1"
              label="Origen"
              label-for="input-origen"
              class="required"
            >
              <b-form-input
                id="input-origen"
                v-model="model.origen"
                required
                placeholder="Origen del transporte"    
                class="ancho_100_por_100"        
              ></b-form-input>
            </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Destino"
          label-for="input-destino"
          class="required"
        >
          <b-form-input
            id="input-destino"
            v-model="model.destino"
            required
            placeholder="Destino del transporte"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-fechaEnvio"
          label="Fecha de envío"
          label-for="input-fechaEnvio"
          class="required"
        >
          <b-form-datepicker
            id="input-fechaEnvio"
            v-model="model.fechaEnvio"
            v-bind="datepickerFormat.labels[datepickerFormat.locale] || {}"
            :state="isValidSendDate"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :start-weekday="datepickerFormat.weekday"
            locale="es"
            required
            placeholder="Fecha del transporte"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group 
          id="input-group-3" 
          label="Peso" 
          label-for="input-peso"
        >
          <b-form-input
            id="input-peso"
            type="number"
            min="0"
            max="35000"
            v-model="model.peso"
            placeholder="Peso de la mercancia"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Número de bultos" label-for="input-numero-bultos">
          <b-form-input
            id="input-numero-bultos"
            type="number"
            min="0"
            max="9999"
            v-model="model.numeroBultos"
            placeholder="Número de bultos"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Litros"
          label-for="input-litros"
        >
          <b-form-input
            id="input-litros"
            type="number"
            min="0"
            max="35000"
            v-model="model.litros"
            placeholder="Litros de la mercancia"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Temperatura"
          label-for="input-temperatura"
        >
          <b-form-input
            id="input-temperatura"
            type="number"
            min="0"
            max="99"
            v-model="model.temperatura"
            placeholder="Temperatura de la mercancia"
          ></b-form-input>
        </b-form-group>        

        <b-form-group
          id="input-group-7"
          label="Muestra"
          label-for="input-muestra"
        >
          <b-form-checkbox
            id="input-muestra"
            v-model="model.muestra"
          ></b-form-checkbox>
        </b-form-group>

          </div>
          <div class="col-6">
            
        <b-form-group v-show="!conductorIdParam"
          id="input-group-conductor"
          label="Conductor"
          label-for="input-conductor"  
          class="required"        
        >
          <b-form-select v-model="model.conductorId" :options="conductores" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-cliente"
          label="Cliente"
          label-for="input-cliente"  
          class="required"        
        >
          <b-form-select v-model="model.clienteId" :options="clientes" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
            id="input-group-observaciones-cliente"
            label="Observaciones del cargador"
            label-for="observaciones-cargador"
            class=""
        >
          <b-form-textarea
            id="observaciones-cargador"
            v-model="model.observacionesCargador"
            placeholeder="Observaciones..."
            rows="3"
            no-resize
          >
          </b-form-textarea>
        </b-form-group>

        
        <b-form-group
          id="input-group-destinatario"
          label="Destinatario"
          label-for="input-destinatario"
          class="required"
        >
          <b-form-select v-model="model.destinatarioId" :options="destinatarios">
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-transportista"
          label="Transportista"
          label-for="input-transportista"   
          class="required"       
        >
          <b-form-select v-model="model.transportistaId" :options="transportistas" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
            id="input-group-observaciones-transportista"
            label="Observaciones del transportista"
            label-for="observaciones-transportista"
            class=""
        >
          <b-form-textarea
            id="observaciones-transportista"
            v-model="model.observacionesTransportista"
            placeholeder="Observaciones..."
            rows="3"
            no-resize
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group
          id="input-group-vehiculo"
          label="Vehículo"
          label-for="input-vehiculo"
          class="required"
        >
          <b-form-select v-model="model.vehiculoId" :options="vehiculos" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-remolque"
          label="Remolque"
          label-for="input-remolque"  
          class="required"        
        >
          <b-form-select v-model="model.remolqueId" :options="remolques" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-mercancia"
          label="Mercancia"
          label-for="input-mercancia"
          class="required"
        >
          <b-form-select v-model="model.mercanciaId" :options="mercancias" required>
            <b-form-select-option value="" disabled>-- Seleccione una opción --</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <p v-if="errors.length">
          <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
          <ul>
            <li v-for="error in errors" :key=error>{{ error }}</li>
          </ul>
        </p>
          </div>
        </div>

        <b-button type="submit" variant="primary">
          {{ isSaving ? "Guardando..." : editMode ? "Actualizar" : "Enviar" }}
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
//import rutaFormSchema from "../forms/rutaFormSchema";
import babelPolyfill from "babel-polyfill";
import moment from "moment";
import { conductoresService } from "../services/conductores.service";
import { clientesService } from "../services/clientes.service";
import { destinatariosService } from "../services/destinatarios.service";
import { transportistasService } from "../services/transportistas.service";
import { vehiculosService } from "../services/vehiculos.service";
import { remolquesService } from "../services/remolques.service";
import { mercanciasService } from "../services/mercancias.service";
import { rutasService } from "../services/rutas.service";

export default {
  data() {
    return {
      errors: [],
      datepickerFormat: {
        weekday: 1,
        locale: "es",
        labels: {
          es: {
            labelPrevDecade: "Década anterior",
            labelPrevYear: "Año anterior",
            labelPrevMonth: "Mes anterior",
            labelCurrentMonth: "Mes actual",
            labelNextMonth: "Mes siguiente",
            labelNextYear: "Año siguiente",
            labelNextDecade: "Década siguiente",
            labelToday: "Hoy",
            labelSelected: "Fecha seleccionada",
            labelNoDateSelected: "Sin selección",
            labelCalendar: "Calendario",
            labelNav: "Navagación de calendario",
            labelHelp: "Navegar por el calendario con las teclas de flecha",
          },
        },
      },
      conductores: [],
      clientes: [],
      transportistas: [],
      destinatarios: [],
      vehiculos: [],
      remolques: [],
      mercancias: [],
      model: {
        origen: null,
        destino: null,
        peso: null,
        litros: null,
        numeroBultos: null,
        temperatura: null,
        muestra: false,
        fechaEnvio: new Date().toISOString(),
        conductorId: "",
        clienteId: "",
        destinatarioId: "",
        transportistaId: "",
        vehiculoId: "",
        remolqueId: "",
        mercanciaId: "",
        finalizado: 0,
        //fechaEnvio: new Date().valueOf(),
      },      
      isSaving: false,
      error: false,
      rutaId: null,
      conductorIdParam: false,
    };
  },
  watch: {
    $route(to) {
      this.rutaId = to.params.id;
      this.loadModel();
    },
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      conductoresService
        .fetchConductores({})
        .then(function (conductores) {
          const notSelectedItem = [];
          const mapConductores = conductores.data.map(
            ({ id, nif, nombre, apellido1, apellido2 }) => {
              return {
                value: id,
                text: nombre + " " + apellido1 + " " + apellido2,
              };
            }
          );
          vm.conductores = notSelectedItem.concat(mapConductores);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      clientesService
        .fetchClientes({})
        .then(function (clientes) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapClientes = clientes.data.map(({ id, nif, nombre }) => {
            return { value: id, text: nombre };
          });
          vm.clientes = notSelectedItem.concat(mapClientes);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      destinatariosService
        .fetchDestinatarios({})
        .then(function (destinatarios) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapDestinatarios = destinatarios.data.map(
            ({ id, nif, nombre }) => {
              return { value: id, text: nombre };
            }
          );
          vm.destinatarios = notSelectedItem.concat(mapDestinatarios);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      transportistasService
        .fetchTransportistas({})
        .then(function (transportistas) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapTransportistas = transportistas.data.map(
            ({ id, nif, nombre }) => {
              return { value: id, text: nombre };
            }
          );
          vm.transportistas = notSelectedItem.concat(mapTransportistas);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      vehiculosService
        .fetchVehiculos({})
        .then(function (vehiculos) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapVehiculos = vehiculos.data.map(({ id, nif, nombre }) => {
            return { value: id, text: nombre };
          });
          vm.vehiculos = notSelectedItem.concat(mapVehiculos);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      remolquesService
        .fetchRemolques({})
        .then(function (remolques) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapRemolques = remolques.data.map(({ id, nif, nombre }) => {
            return { value: id, text: nombre };
          });
          vm.remolques = notSelectedItem.concat(mapRemolques);
        })
        .catch(function (error) {
          vm.handleError(error);
        });

      mercanciasService
        .fetchMercancias({})
        .then(function (mercancias) {
          //const notSelectedItem = [{ value: null, text: "Sin seleccionar" }];
          const notSelectedItem = [];
          const mapMercancias = mercancias.data.map(({ id, nif, nombre }) => {
            return { value: id, text: nombre };
          });
          vm.mercancias = notSelectedItem.concat(mapMercancias);
        })
        .catch(function (error) {
          vm.handleError(error);
        });
    });
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.rutaId = this.$route.params.id;
      this.loadModel();
    }
    else if (this.$route.params.conductorId !== undefined) {
      this.conductorIdParam = true;
      this.model.conductorId = this.$route.params.conductorId;
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (this.model.origen === undefined || !this.model.origen) {
        this.errors.push("El campo Origen es obligatorio.");
      }
      if (this.model.destino === undefined || !this.model.destino) {
        this.errors.push("El campo Destino es obligatorio.");
      }

      if (this.model.conductorId === undefined || !this.model.conductorId) {
        this.errors.push("Debe seleccionar un Conductor.");
      }

      if (this.model.clienteId === undefined || !this.model.clienteId) {
        this.errors.push("Debe seleccionar un Cliente.");
      }

      if (
        this.model.destinatarioId === undefined ||
        !this.model.destinatarioId
      ) {
        this.errors.push("Debe seleccionar un Destinatario.");
      }

      if (
        this.model.transportistaId === undefined ||
        !this.model.transportistaId
      ) {
        this.errors.push("Debe seleccionar un Transportista.");
      }

      if (this.model.vehiculoId === undefined || !this.model.vehiculoId) {
        this.errors.push("Debe seleccionar un Vehículo.");
      }

      if (this.model.remolqueId === undefined || !this.model.remolqueId) {
        this.errors.push("Debe seleccionar un Remolque.");
      }

      if (this.model.mercanciaId === undefined || !this.model.mercanciaId) {
        this.errors.push("Debe seleccionar un Mercancia.");
      }

      if (!this.errors.length) {
        this.submitData();
        return true;
      }

      e.preventDefault();
    },
    async loadModel() {
      const ruta = await rutasService.getRuta(this.rutaId);

      const {
        origen,
        destino,
        fechaEnvio,
        peso,
        litros,
        temperatura,
        numeroBultos,
        muestra,
        conductorId,
        clienteId,
        transportistaId,
        destinatarioId,
        vehiculoId,
        remolqueId,
        mercanciaId,
        finalizado,
        firmaDataUrl,
      } = ruta.data;

      this.model = ruta.data;
      this.model.conductor = conductorId;
      this.model.cliente = clienteId;
      this.model.destinatario = destinatarioId;
      this.model.transportista = transportistaId;
      this.model.vehiculo = vehiculoId;
      this.model.remolque = remolqueId;
      this.model.mercancia = mercanciaId;
    },
    async submitData() {
      this.isSaving = true;
      try {
        const {
          origen = "",
          destino = "",
          fechaEnvio,
          peso = "",
          litros = "",
          temperatura = "",
          numeroBultos = null,
          muestra = null,
          conductorId,
          clienteId,
          destinatarioId,
          transportistaId,
          vehiculoId,
          remolqueId,
          mercanciaId,
          observacionesCargador = "",
          observacionesTransportista = "",
          finalizado = 0,
        } = this.model;

        let ruta = null;

        if (this.editMode) {
          ruta = await rutasService.updateRuta(
            this.rutaId,
            new Date(fechaEnvio),
            origen,
            destino,
            peso,
            litros,
            muestra,
            temperatura,
            numeroBultos == null ? numeroBultos : numeroBultos.toString(),
            conductorId,
            clienteId,
            transportistaId,
            destinatarioId,
            vehiculoId,
            remolqueId,
            mercanciaId,
            observacionesCargador,
            observacionesTransportista
          );
        } else {
          ruta = await rutasService.createRuta(
            new Date(fechaEnvio),
            origen,
            destino,
            peso,
            litros,
            muestra,
            temperatura,
            numeroBultos == null ? numeroBultos : numeroBultos.toString(),
            conductorId,
            clienteId,
            transportistaId,
            destinatarioId,
            vehiculoId,
            remolqueId,
            mercanciaId,
            observacionesCargador,
            observacionesTransportista
          );
        }
        this.isSaving = false;

        console.info("Datos ruta: ", ruta);

        const msg = this.editMode ? "Ruta modificada" : "Ruta creada";
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/rutas");
        }, 1500);
      } catch (error) {
        console.log(error);
        this.error = true;
        this.isSaving = false;
        const msg = this.editMode
          ? "No se pudo modificar la ruta"
          : "No se pudo crear la ruta";
        this.$toast.error(msg);
        this.handleError(error);
      }
    },
    handleError(error) {
      const { statusCode } = error.response.data;
      console.info("status code: ", statusCode);

      if (statusCode !== 401) {
        console.log(error);
      } else {
        console.error("error 401");
        this.$emit("renove-token");
        this.$router.push("/").catch((err) => {});
      }
    },
  },
  computed: {
    editMode: function () {
      return this.rutaId !== null;
    },
    isValidSendDate: function () {
      var aDate = moment(
        this.model.fechaEnvio.substring(0, 10),
        "YYYY-MM-DD",
        true
      );
      return aDate.isValid();
    },
  },
};
</script>

<style scoped>
input,
textarea,
select,
button {
  width: 200px;
  margin: 0;

  -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
  -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
  box-sizing: border-box;
}

.btn-primary {
  color: #407ad9;
}
.btn-primary:hover {
  color: white;
}
</style>>
