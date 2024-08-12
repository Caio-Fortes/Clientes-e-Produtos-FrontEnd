<script setup>
import PostService from "./api/PostService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "./components/Header.vue";
</script>

<script>
export default {
  methods:{
    async getAllClientes(){
      //const teste = await PostService.getPosts("http://localhost:8081/clientes");
      //console.log(teste)
    }
  }
}
</script>

<template>
  <Header />
</template>

