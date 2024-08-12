<script>
export default {
  data() {
    return {
      modalVisible: false,
      flexConfig: "display: flex; justify-content: space-between;",
      UIs: [],
      nome: '',
      CNPJ: '',
      telefone: '',
      email: '',
      uiSelected: '',
      map: null,
      currentMarker: null
    }
  },
  watch:{
    uiSelected(sigla){
      const map = this.map;
      let currentMarker = this.currentMarker;
      if (currentMarker) { map.removeLayer(currentMarker)}

      const stateCoordinates = {
        "AC": [-9.97499, -67.80757],
        "AL": [-9.66599, -36.69455],
        "AM": [-3.41684, -65.85606],
        "AP": [0.902, -52.003],
        "BA": [-12.9714, -38.5014],
        "CE": [-3.71722, -38.5434],
        "DF": [-15.7801, -47.9292],
        "ES": [-20.3155, -40.3128],
        "GO": [-16.6869, -49.2648],
        "MA": [-2.52972, -44.3028],
        "MT": [-15.6014, -56.0979],
        "MS": [-20.4428, -54.6464],
        "MG": [-19.9167, -43.9345],
        "PA": [-1.45583, -48.5044],
        "PB": [-7.12107, -34.8761],
        "PR": [-25.4296, -49.2713],
        "PE": [-8.04756, -34.877],
        "PI": [-5.08921, -42.8016],
        "RJ": [-22.9068, -43.1729],
        "RN": [-5.79448, -35.211],
        "RO": [-8.76194, -63.9039],
        "RR": [2.8235, -60.6753],
        "RS": [-30.0346, -51.2177],
        "SC": [-27.5954, -48.548],
        "SP": [-23.5505, -46.6333],
        "SE": [-10.9472, -37.0731],
        "TO": [-10.1842, -48.3336]
      };
      function updateMapView(coordinates) {
        const latLng = L.latLng(coordinates);
        currentMarker = L.marker(latLng).addTo(map);
        map.setView(latLng, 5);
      }
      updateMapView(stateCoordinates[sigla]);
      this.currentMarker = currentMarker;
    }
  },
  mounted(){
    this.getUI();
  },
  methods: {
    modalCadastrar() {
      this.modalVisible = !this.modalVisible;
      setTimeout(() => {
        this.map = L.map('map').setView([-19.9167, -43.9345], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(this.map);
      }, 200);
    },
    async getUI(){
      this.UIs = await PostService.getPosts("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      console.log(this.UIs)
    },
    salvar(){
      console.log()
    }
  }
}
</script>

<template>
  <main>
    <div id="containerBody">
      <TitlePage title="Lista de Clientes" />

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" 
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        >
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>

      <button type="button" class="btn btn-primary" id="buttonDefault" @click="modalCadastrar">
        <i class="fa-solid fa-plus"></i> Cadastrar Cliente
      </button>

      <Modal title="Cadastrar Cliente" v-if="modalVisible">
        <template #content> 
          <div>
          Nome *
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="nome">
          </div>
        </div>
        <div :style="flexConfig">
          <div>
            CNPJ *
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="CNPJ">
            </div>
          </div>
          <div>
            Telefone *
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="telefone">
            </div>
          </div>
        </div>
        <div>
          Email *
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="email">
          </div>
        </div>
        <div>
          UF *
          <div class="input-group mb-3">
            <select class="form-control" v-model="uiSelected">
              <option v-for="ui in UIs" :value="ui.sigla">{{ ui.sigla }}</option>
            </select>
          </div>
        </div>
        <div id="map" style="height: 150px; width: 450px;"></div>
      </template>
      <template #buttons>
        <button type="button" 
          class="btn btn-primary" @click="modalCadastrar" 
          style="background-color: gray"
        >
          Cancelar
        </button>
        <button type="button" class="btn btn-primary" @click="salvar">
          Salvar
        </button>
      </template>
      </Modal>
    </div>
  </main>
</template>

<script setup>
import TitlePage from "../components/TitlePage.vue";
import Modal from "../components/Modal.vue";
import PostService from "../api/PostService";
</script>
