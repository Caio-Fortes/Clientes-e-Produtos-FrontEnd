<script>
export default {
  data() {
    return {
      modalVisible: false,
      actionTitle: '',
      dadosTable: [],
      flexConfig: "display: flex; justify-content: space-between;",
      venda:{
        clienteId: '',
        data: '',
        status: '',
        valor: 0
      },
      idVendaSelected: '',
      gridInstance: '',
      statusVenda: [
        "Aguardando pagamento", "Pagamento aprovado", 
        "Aguardando envio", "À caminho", "Finalizado"
      ],
      formattedValue: ''
    }
  },
  watch: {
    venda: {
      deep: true,
      handler(newValue) {
        // Atualiza o campo formatado quando o valor é alterado programaticamente
        this.formattedValue = this.formatToCurrency(newValue.valor);
      }
    }
  },
  mounted(){
    this.getAllClientes();
  },
  methods: {
    async getAllClientes(){
      const result = await ClienteService.getClientes();
      return this.allClientes = result.data;
    },
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
        this.setDatasSelected(rowSelected);
      }
      this.modalVisible = !this.modalVisible;
    },
    setDatasSelected(rowSelected){
        const id = rowSelected[4].data;
        const dataSelected = this.dadosTable.filter(a => a.idVenda == id);
        this.venda.clienteId = dataSelected[0].cliente.idCliente;
        this.venda.data = dataSelected[0].data;
        this.venda.status = dataSelected[0].status;
        this.venda.valor = dataSelected[0].valor;
        this.idVendaSelected = id;
    },
    limparForms(){
      this.idVendaSelected = null;
      this.venda = {
        clienteId: '',
        data: '',
        status: '',
        valor: 0
      }
    },
    async salvar(){
      if (this.actionTitle === 'Cadastrar Venda'){
        await VendaService.createVendas(this.venda);
      }
      else{
        await VendaService.updateVenda(this.venda, this.idVendaSelected);
      }
    },
    async excluir(){
      await VendaService.deleteVenda(this.idVendaSelected);
    },
    formatToCurrency(value) {
      return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    parseFromCurrency(value) {
      return parseFloat(value.replace(/\D/g, '')) / 100;
    },
    updateValue(event) {
      const numericValue = this.parseFromCurrency(event.target.value);
      this.venda.valor = numericValue;
      this.formattedValue = this.formatToCurrency(numericValue);
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
        :keysDatas="['cliente.nome', 'data', 'status', 'valor-money', 'idVenda']"
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
          <div v-show="actionTitle === 'Cadastrar Venda' || actionTitle === 'Editar Venda'">
            <div>
              Cliente *
              <div class="input-group mb-3">
                <select class="form-control" v-model="venda.clienteId">
                  <option v-for="cliente in allClientes" :value="cliente.idCliente">{{ cliente.nome }}</option>
                </select>
              </div>
            </div>
            <div>
              Data da venda*
              <div class="input-group mb-3">
                <input type="text" v-mask="'##/##/#####'" class="form-control" v-model="venda.data">
              </div>
            </div>
            <div>
              Situação *
              <div class="input-group mb-3">
                <select class="form-control" v-model="venda.status">
                  <option v-for="status in statusVenda" :value="status">{{ status }}</option>
                </select>
              </div>
            </div>
            <div>
              Valor da venda *
              <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="formattedValue" @input="updateValue">
              </div>
            </div>
          </div>
          <div v-show="actionTitle === 'Excluir Venda'">
            Deseja excluir esta venda ? Esta ação é irreversível e não poderá ser desfeita.
          </div>
      </template>
      <template #buttons>
        <button type="button" 
          class="btn btn-primary" @click="() => {modalVisible = false}" 
          style="background-color: gray"
        >
          Cancelar
        </button>

        <button v-show="actionTitle == 'Cadastrar Venda' || actionTitle == 'Editar Venda'" 
          type="button" class="btn btn-primary" @click="salvar"
        >  Salvar
        </button>

        <button v-show="actionTitle == 'Excluir Venda'" 
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
import ClienteService from "@/services/ClienteService";
import VendaService from "@/services/VendaService";
import Table from '../components/Table.vue';
</script>
