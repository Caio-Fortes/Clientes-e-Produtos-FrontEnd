<script>
export default {
  data() {
    return {
      modalVisible: false,
      flexConfig: "display: flex; justify-content: space-between;",
      nome: '',
      CNPJ: '',
      telefone: '',
      email: ''
    }
  },
  methods: {
    modalCadastrar() {
      this.modalVisible = !this.modalVisible
    }
  }
}
</script>

<template>
  <main>
    <div id="containerBody">
      <TitlePage title="Lista de Clientes" />

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
          aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>

      <button type="button" class="btn btn-primary" id="buttonDefault" @click="modalCadastrar">
        <i class="fa-solid fa-plus"></i> Cadastrar Cliente
      </button>

      <Modal title="Cadastrar Cliente" v-if="modalVisible">
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
          UF *
          <div class="input-group mb-3">
            <select class="form-control">
              <option selected>Selecione...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div>
          Email *
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="email">
          </div>
        </div>

        <div id="buttonsModal">
          <button type="button" class="btn btn-primary" @click="modalCadastrar" style="background-color: gray">
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="modalCadastrar">
            Salvar
          </button>
        </div>

      </Modal>
    </div>
  </main>
</template>

<script setup>
import TitlePage from "../components/TitlePage.vue";
import Modal from "../components/Modal.vue";
</script>
