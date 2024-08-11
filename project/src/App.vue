<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PostService from "./api/PostService";
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
  <header>
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
  </header>
  <h1>Lista de Clientes</h1>
  <h3>dadasdas</h3>
  <p>dasdasdasdasdasdasdasdasdas</p>
  <RouterView />
</template>
