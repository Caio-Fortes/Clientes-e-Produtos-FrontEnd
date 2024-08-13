<script>
export default {
  data() {
    return {
      modalVisible: false,
      actionTitle: '',
      dadosTable: [],
      flexConfig: "display: flex; justify-content: space-between;",
      UIs: [],
      map: null,
      currentMarker: null,
      cliente:{
        nome: '',
        CNPJ: '',
        telefone: '',
        email: '',
        UI: '',
      },
      idClienteSelected: '',
      gridInstance: ''
    }
  },
  watch:{
    'cliente.UI': function (sigla) {
      this.setPointMarkerMap(sigla)
    },
  },
  mounted(){
    this.getUI();
  },
  methods: {
    setVisibleModal(action, rowSelected = null) {  
      switch (action) {
        case 'Create':
          this.actionTitle = "Cadastrar Venda";
          this.limparForms();
          break;
        case 'Edit':
          this.actionTitle = "Editar Venda";
          break;
        case 'Delete':
          this.actionTitle = "Excluir Venda";
          break;
        default: 
          break;
      }
      if(rowSelected){
        const id = rowSelected[4].data;
        const dataSelected = this.dadosTable.filter(a => a.idCliente == id);
        this.cliente.nome = dataSelected[0].nome;
        this.cliente.CNPJ = dataSelected[0].cnpj;
        this.cliente.telefone = dataSelected[0].telefone;
        this.cliente.email = dataSelected[0].email;
        this.cliente.UI = dataSelected[0].ui;
        this.idClienteSelected = id;
      }
      this.modalVisible = !this.modalVisible;
    },
    async getUI(){
      this.UIs = await PostService.getPosts("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    },
    limparForms(){
      this.idClienteSelected = null;
      this.cliente = {
        nome: '',
        CNPJ: '',
        telefone: '',
        email: '',
        UI: '',
      };
    },
    async salvar(){
      if (this.actionTitle === 'Cadastrar Cliente'){
        await ClienteService.createCliente(this.cliente);
      }
      else{
        await ClienteService.updateCliente(this.cliente, this.idClienteSelected);
      }
    },
    async excluir(){
      await ClienteService.deleteCliente(this.idClienteSelected);
    }
  }
}
</script>

<template>
  <main>
    <div id="containerBody">
      <TitlePage title="Lista de Vendas" />
      
      <Table ref="tableComponent"
        titleTable="Vendas Cadastradas"
        urlGet="http://localhost:8081/vendas" 
        :columns="['Cliente', 'Data', 'Status', 'Valor']"
        :keysDatas="['cliente.nome', 'data', 'status', 'valor-money', 'idCliente']"
        filterPlaceholder="Digite o nome do cliente que deseja pesquisar..."
        :filterKeys="['cliente.nome']"
        @actionSelected="setVisibleModal" @dadosTable="(a) => {dadosTable = a}"
        @instanceTable="(instance) => {gridInstance = instance}"
      >
        <button class="btn btn-primary" id="buttonDefault" @click="setVisibleModal('Create')">
          <i class="fa-solid fa-plus"></i> Cadastrar Venda
        </button>
      </Table>

      <Modal :title="actionTitle" v-if="modalVisible">
        <template #content>
          <div v-show="actionTitle === 'Cadastrar Cliente' || actionTitle === 'Editar Cliente'">
            <div>
              Nome *
              <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="cliente.nome">
              </div>
            </div>
            <div :style="flexConfig">
              <div>
                CNPJ *
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="cliente.CNPJ">
                </div>
              </div>
              <div>
                Telefone *
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="cliente.telefone">
                </div>
              </div>
            </div>
            <div>
              Email *
              <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="cliente.email">
              </div>
            </div>
            <div>
              UF *
              <div class="input-group mb-3">
                <select class="form-control" v-model="cliente.UI">
                  <option v-for="ui in UIs" :value="ui.sigla">{{ ui.sigla }}</option>
                </select>
              </div>
            </div>
            <div id="map" style="height: 150px; width: 450px;"></div>
          </div>
          <div v-show="actionTitle === 'Excluir Cliente'">
            Deseja excluir este cliente ? Esta ação é irreversível e todas as vendas vinculadas
            ao cliente serão excluidas.
          </div>
      </template>
      <template #buttons>
        <button type="button" 
          class="btn btn-primary" @click="() => {modalVisible = false}" 
          style="background-color: gray"
        >
          Cancelar
        </button>

        <button v-show="actionTitle == 'Cadastrar Cliente' || actionTitle == 'Editar Cliente'" 
          type="button" class="btn btn-primary" @click="salvar"
        >  Salvar
        </button>

        <button v-show="actionTitle == 'Excluir Cliente'" 
          type="button" class="btn btn-primary" @click="excluir" 
        > Excluir
        </button>
      </template>
      </Modal>
    </div>
  </main>
</template>

<script setup>
import TitlePage from "../components/TitlePage.vue";
import Modal from "../components/Modal.vue";
import PostService from "@/services/PostService";
import ClienteService from "@/services/ClienteService";
import Table from '../components/Table.vue';
</script>
