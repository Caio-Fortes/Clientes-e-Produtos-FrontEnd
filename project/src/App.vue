<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PostService from "./api/PostService";
import Header from "./components/templates/Header.vue";
</script>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.getAllClientes();
  },
  methods:{
    async getAllClientes(){
      const teste = await PostService.getPosts("http://localhost:8081/clientes");
      //console.log(teste)
    }
  }
}
</script>

<template>
  <Header />
  <RouterView />
</template>
