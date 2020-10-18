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
        <span class="text-muted"
          >{{ editMode ? "Actualizar " : "Añadir nuevo " }} registro</span
        >
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitData">
        <vue-form-generator
          tag="div"
          :schema="schema"
          :options="formOptions"
          :model="model"
        />
        <div class="d-flex justify-content-end mt-3 pr-4">
          <button type="submit" class="btn btn-primary">
            {{ isSaving ? "Guardando..." : editMode ? "Actualizar" : "Enviar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import rutaFormSchema from "../forms/rutaFormSchema";
import babelPolyfill from "babel-polyfill";
import { clientesService } from "../services/clientes.service";
import { destinatariosService } from "../services/destinatarios.service";
import { transportistasService } from "../services/transportistas.service";
import { vehiculosService } from "../services/vehiculos.service";
import { remolquesService } from "../services/remolques.service";
import { mercanciasService } from "../services/mercancias.service";
import { rutasService } from '../services/rutas.service';

export default {
  data() {
    return {
      clientes: [],
      transportistas: [],
      destinatarios: [],
      vehiculos: [],
      remolques: [],
      mercancias: [],
      model: {},
      schema: rutaFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      rutaId: null,
    };
  },
  watch: {
      '$route'(to) {
          this.rutaId = to.params.id;
          this.loadModel();
      }
  },
  created() {
      
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {          
          clientesService.fetchClientes({})
            .then(function(clientes) {                
                vm.clientes = clientes.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'cliente');
                fiel.values = vm.clientes;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });

          destinatariosService.fetchDestinatarios({})
            .then(function(destinatarios) {
                vm.destinatarios = destinatarios.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'destinatario');
                fiel.values = vm.destinatarios;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });

          transportistasService.fetchTransportistas({})
            .then(function(transportistas) {                
                vm.transportistas = transportistas.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'transportista');
                fiel.values = vm.transportistas;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });

          vehiculosService.fetchVehiculos({})
            .then(function(vehiculos) {            
                vm.vehiculos = vehiculos.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'vehiculo');
                fiel.values = vm.vehiculos;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });

          remolquesService.fetchRemolques({})
            .then(function(remolques) {
                vm.remolques = remolques.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'remolque');
                fiel.values = vm.remolques;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });

          mercanciasService.fetchMercancias({})
            .then(function(mercancias) {                
                vm.mercancias = mercancias.data.map(({ id, nif, nombre }) => { return {id, name: nombre} });
                var fiel = vm.schema.groups[0].fields.find(field => field.model === 'mercancia');
                fiel.values = vm.mercancias;                
            })
            .catch(function(error) {
                vm.handleError(error);
            });
      });
  },
  mounted() {
      if (this.$route.params.id !== undefined) {
      this.rutaId = this.$route.params.id;
      this.loadModel();
    }
  },
  methods: {
    //   async getClientes() { 
    //     const clientes = await clientesService.fetchClientes({});
    //     console.log('clientes', clientes);
    //     this.clientes = clientes.data.map(({ id, nombre }) => { return {id, name: nombre} });
    //   },
      async loadModel() {                  
        const ruta = await rutasService.getRuta(this.rutaId);
        
        const { origen, destino, fechaEnvio, peso, litros, temperatura, numeroBultos, muestra, clienteId, transportistaId, destinatarioId, vehiculoId, remolqueId, mercanciaId} 
            = ruta.data;

        this.model = ruta.data;   
        this.model.cliente = clienteId;
        this.model.destinatario = destinatarioId;
        this.model.transportista = transportistaId;
        this.model.vehiculo = vehiculoId;
        this.model.remolque = remolqueId;
        this.model.mercancia = mercanciaId;    
      },
      async submitData() {
          //TODO: procesar la creacion/modificacion dee datos
          console.log('Enviar datos...');
          this.isSaving = true;
          try {
              const { 
                  origen = '', 
                  destino = '', 
                  fechaEnvio, 
                  peso = '', 
                  litros = '', 
                  temperatura = '', 
                  numeroBultos = null, 
                  muestra = null, 
                  cliente, 
                  destinatario, 
                  transportista, 
                  vehiculo, 
                  remolque, 
                  mercancia 
                } = this.model;
            
            let ruta = null;

            if (this.editMode) {
                ruta = await rutasService.updateRuta(
                    this.rutaId,
                    fechaEnvio,
                    origen,
                    destino,
                    peso,
                    litros,
                    muestra,
                    temperatura,
                    numeroBultos,
                    cliente,
                    transportista,
                    destinatario,
                    vehiculo,
                    remolque,
                    mercancia
                );
            } else {
                console.log('jar');
              ruta = await rutasService.createRuta(
                    new Date(fechaEnvio),
                    origen,
                    destino,
                    peso,
                    litros,
                    muestra,
                    temperatura,
                    numeroBultos,
                    cliente,
                    transportista,
                    destinatario,
                    vehiculo,
                    remolque,
                    mercancia
                );
            }
            this.isSaving = false;

            console.info("Datos ruta: ", ruta);

            const msg = this.editMode ? 'Ruta modificada' : 'Ruta creada';
            this.$toast.success(msg);
            setTimeout(() => {
                this.$router.push("/rutas");
            }, 1500);

          } catch (error) {
            this.error = true;
            this.isSaving = false;
            const msg = this.editMode ? 'No se pudo modificar la ruta' : 'No se pudo crear la ruta';
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
        this.$router.push("/");
      }
    },
  },
  computed: {
      editMode: function () {
      return this.rutaId !== null;
    },
  },
};
</script>

<style>
</style>