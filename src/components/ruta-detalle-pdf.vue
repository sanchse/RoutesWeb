<template>
  <div class="container">
    <div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <!-- PDF Content Here -->
          <div style="display: inline-block">
            <h5>
              DOCUMENTO DE CONTROL ADMINISTRATIVO PARA LA REALIZACIÓN DE
              TRANSPORTE PÚBLICO DE MERCANCÍAS POR CARRETERA
            </h5>
            <strong style=""
              >(Orden FOM/2861/2012, BOE nº 5, de 5 de enero de 2013)</strong
            >
          </div>
          <div class="container-fluid">
            <md-content>
              <md-card>
                <md-card-header>
                  <div class="md-title">Datos del cargador contractual</div>
                  <span
                    >(cargador efectivo u otro operador que contrate el
                    transporte o intermidie en su contratación)</span
                  >
                </md-card-header>

                <md-card-content>
                  <div class="wrapper">
                    <div>
                      <label for="nombrecliente"
                        >Nombre o denominación social</label
                      >
                    </div>
                    <div class="dato">
                      <span class="" id="nombrecliente">{{
                        ruta.cliente.nombre
                      }}</span>
                    </div>
                  </div>

                  <div class="wrapper">
                    <div class="col-sm-4">
                      <label for="nifcliente">NIF</label>
                    </div>
                    <div class="col-sm-4 dato">
                      <span>{{ ruta.cliente.nif }}</span>
                    </div>
                    <div>
                      <label for="provinciacliente">Provincia</label>
                    </div>
                    <div class="dato">
                      <span>{{
                        this.provinciaString(ruta.cliente.codProvincia)
                      }}</span>
                    </div>
                  </div>

                  <div class="wrapper">
                    <div>
                      <label for="codpostalcliente">Código postal</label>
                    </div>
                    <div class="dato">
                      <span>{{ ruta.cliente.codPostal }}</span>
                    </div>
                    <div>
                      <label for="localidadcliente">Poblacion</label>
                    </div>
                    <div class="dato">
                      <span>{{ ruta.cliente.localidad }}</span>
                    </div>
                  </div>

                  <div class="wrapper">
                    <div>
                      <label for="observacionescliente"
                        >Observaciones del cargador</label
                      >
                    </div>
                  </div>

                  <div class="wrapper">
                    <div class="dato" style="height: 100px">
                      <span>{{ ruta.observacionesCargador }}</span>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </md-content>

            <md-card>
              <md-card-header>
                <div class="md-title">Datos del transportista efectivo</div>
                <span>(titular de la autorización de transporte)</span>
              </md-card-header>

              <md-card-content>
                <div class="wrapper">
                  <div>
                    <label for="nombretransportista"
                      >Nombre o denominación social</label
                    >
                  </div>
                  <div class="dato">
                    <span id="nombretransportista">{{
                      ruta.transportista.nombre
                    }}</span>
                  </div>
                </div>
                <div class="wrapper">
                  <div>
                    <label for="niftransportista">NIF</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.transportista.nif }}</span>
                  </div>
                  <div>
                    <label for="provinciatransportista">Provincia</label>
                  </div>
                  <div class="dato">
                    <span>{{
                      this.provinciaString(ruta.transportista.codProvincia)
                    }}</span>
                  </div>
                </div>
                <div class="wrapper">
                  <div>
                    <label for="codpostaltransportista">Código postal</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.transportista.codPostal }}</span>
                  </div>
                  <div>
                    <label for="localidadtransportista">Poblacion</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.transportista.localidad }}</span>
                  </div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="observacionestransportista"
                      >Observaciones del transportista</label
                    >
                  </div>
                </div>
                <div class="wrapper">
                  <div class="dato" style="height: 100px">
                    <span>{{ ruta.observacionesTransportista }}</span>
                  </div>
                </div>
              </md-card-content>
            </md-card>

            <md-card>
              <md-card-header>
                <div class="md-title">Datos del transporte</div>
              </md-card-header>

              <md-card-content>
                <div class="wrapper">
                  <div>
                    <label for="origen">Origen</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.origen }}</span>
                  </div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="destino">Destino</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.destino }}</span>
                  </div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="fecha">Fecha de envío</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.fechaEnvio | formatDate }}</span>
                  </div>
                </div>
              </md-card-content>
            </md-card>

            <md-card>
              <md-card-header>
                <div class="md-title">Datos de la mercancía</div>
              </md-card-header>

              <md-card-content>
                <div class="wrapper">
                  <div>
                    <label for="naturaleza">Naturaleza</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.mercancia.nombre }}</span>
                  </div>
                </div>

                <div v-if="ruta.peso" class="wrapper">
                  <div>
                    <label for="perso">Peso (kg.)</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.peso | formatNumber }}</span>
                  </div>
                  <div>
                    <label for="numBultos">Número de bultos</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.numeroBultos }}</span>
                  </div>
                </div>

                <div v-if="ruta.litros" class="wrapper">
                  <div>
                    <label for="litros">Litros</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.litros }}</span>
                  </div>

                  <div>
                    <label for="temperatura">Temperatura</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.temperatura }}</span>
                  </div>
                </div>
                <div class="wrapper">
                  <div>
                    <md-checkbox v-model="ruta.muestra" class="md-primary">
                      <strong>Muestra</strong>
                    </md-checkbox>
                  </div>
                </div>
              </md-card-content>
            </md-card>

            <md-card>
              <md-card-header>
                <div class="md-title">
                  Matrículas de los vehículos que intervienen en el transporte
                </div>
              </md-card-header>

              <md-card-content>
                <div class="wrapper">
                  <div>
                    <label for="tractor">Vehículo tractor</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.vehiculo.matricula }}</span>
                  </div>
                  <div>
                    <label for="remolque">Remolque o semiremolque</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.remolque.matricula }}</span>
                  </div>
                </div>
                <strong>
                  Otros vehículos que intervienen en el transporte
                </strong>

                <div class="wrapper">
                  <div>
                    <label for="otro1">Vehículo tractor</label>
                  </div>
                  <div class="dato"></div>
                  <div>
                    <label for="otro1">Remolque o semiremolque</label>
                  </div>
                  <div class="dato"></div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="otro1">Vehículo tractor</label>
                  </div>
                  <div class="dato"></div>
                  <div>
                    <label for="otro1">Remolque o semiremolque</label>
                  </div>
                  <div class="dato"></div>
                </div>
              </md-card-content>
            </md-card>

            <md-card>
              <md-card-header>
                <strong> Otra información no obligatoria </strong>
                <div class="md-title">Destinatario</div>
              </md-card-header>

              <md-card-content>
                <div class="wrapper">
                  <div>
                    <label for="nombredestinatario"
                      >Nombre o denominación social</label
                    >
                  </div>
                  <div class="dato">
                    <span id="nombredestinatario">{{
                      ruta.destinatario.nombre
                    }}</span>
                  </div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="nifdestinatario">NIF</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.destinatario.nif }}</span>
                  </div>
                  <div>
                    <label for="provinciadestinatario">Provincia</label>
                  </div>
                  <div class="dato">
                    <span>{{
                      this.provinciaString(ruta.destinatario.codProvincia)
                    }}</span>
                  </div>
                </div>

                <div class="wrapper">
                  <div>
                    <label for="localidaddestinatario">Poblacion</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.destinatario.localidad }}</span>
                  </div>
                  <div>
                    <label for="codpostaldestinatario">Código postal</label>
                  </div>
                  <div class="dato">
                    <span>{{ ruta.destinatario.codPostal }}</span>
                  </div>
                </div>
              </md-card-content>
            </md-card>

            <md-card>
              <md-card-content>
                <div class="wrapper">
                  <div style="background-color: white">
                    <p>Firma del cargador</p>
                    <div>
                      
                      
                      <div
                        v-if="
                          ruta.firmaDataUrl !== null && ruta.firmaDataUrl !== ''
                        "
                      >
                        <img
                          :src="ruta.firmaDataUrl"
                          alt="Firma"
                          width="300px"
                          height="200px"
                        />
                      </div>

                    </div>
                  </div>
                  <div style="background-color: white">
                    <p>Firma del transportista</p>
                    <img
                      src="../assets/images/sello-500x300.png"
                      alt="Firma del transportista"
                      sizes="(max-width: 165px) 150px,
                         (max-width: 330px) 300px,
                         500px"
                      srcset="
                        ../assets/images/sello-165x99.png  165w,
                        ../assets/images/sello-330x198.png,
                        330w,
                        ../assets/images/sello-500x300.png 500w
                      "
                    />
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </section>
      </vue-html2pdf>
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
      signatureOptions: {
        penColor: "#000000",
      },
      rutaId: null,
      from: "home",
      ruta: {
        cliente: {
          nombre: "",
          nif: "",
        },
        transportista: {
          nombre: "",
          nif: "",
        },
        destinatario: {
          nombre: "",
          nif: "",
        },
        mercancia: {
          nombre: "",
        },
        vehiculo: {
          matricula: "",
        },
        remolque: {
          matricula: "",
        },
        firma: null,
        firmaDataUrl: null,
        finalizado: false,
      },
      provincias: provinciasFile.provincias,
    };
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.rutaId = this.$route.params.id;
      this.getRuta(this.$route.params.id);
    }

    if (this.$route.params.from !== undefined) {
      this.from = this.$route.params.from;
    }

    console.log('Ruta :', this.rutaId);
    this.generateReport();
    console.log('generateReport');
  },
  watch: {
    $route(to) {
      this.rutaId = to.params.id;
      this.from = to.params.from !== undefined ? to.params.from : this.from;
      this.getRuta(this.id);
    },
  },
  methods: {
    
    generateReport() {
      this.$refs.html2pdf.generatePdf()
    },
    saveRutaToLocalStorage() {
      var rutasStr = localStorage.getItem("RutasHabiles");
      if (rutasStr !== undefined && rutasStr !== null) {
        var rutas = JSON.parse(rutasStr);

        var ruta = rutas.find((ruta) => ruta.id === this.rutaId * 1);
        if (ruta !== undefined) {
          ruta.firmaDataUrl = this.ruta.firmaDataUrl;
          localStorage.setItem("RutasHabile", JSON.stringify(rutas));
        }
      }
    },
    getRuta(id) {
      const vm = this;

      //Obtenemos el dato del LocalStorage
      var rutasStr = localStorage.getItem("RutasHabiles");
      if (rutasStr !== undefined && rutasStr !== null) {
        var rutas = JSON.parse(rutasStr);
        var ruta = rutas.find((ruta) => ruta.id === id * 1);

        if (ruta !== undefined) {
          vm.ruta = ruta;
        }
      }

      rutasService.getRuta(id).then((result) => {
        vm.ruta = result.data;        
      });
    },
    provinciaString(id) {
      if (id === undefined || id === null) {
        return "";
      }
      const provincia = this.provincias.filter(function (data) {
        return data.id == id;
      });

      return provincia || provincia.length ? provincia[0].name : "";
    },
  },

  components: {
    
  }
}
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

.wrapper > div > label {
  font-weight: bold;
}

.wrapper > div > span {
  background-color: white;
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

.dato {
  border-style: solid;
  border-width: thin;
  background: rgb(255, 255, 255) !important;
}
</style>