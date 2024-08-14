<script>
export default{
    data(){
        return{
            selectNav: 1
        }
    },
    methods:{
        selectNavItem(index) {
            this.selectNav = index;
        }
    }
}
</script>

<template>
    <main>
        <div id="containerBody"> 
            <TitlePage title="Relatórios" />
            <CardsRelatorios />
            <nav class="nav nav-pills nav-fill">
                <a 
                  class="nav-link" :class="{ 'active': selectNav === 1 }" 
                  @click="selectNavItem(1)" aria-current="page" href="#">
                    Localização dos Clientes
                </a>
                <a 
                  class="nav-link" 
                  :class="{ 'active': selectNav === 2 }" 
                  @click="selectNavItem(2)" 
                  href="#">
                    Faturamento por mês
                </a>
            </nav>
            <div class="card"> 
                <MapClientes v-show="selectNav === 1" />
                <FaturamentoVendas v-show="selectNav === 2" />
            </div>
        </div>
    </main>
</template>

<script setup>
    import TitlePage from "@/components/TitlePage.vue";
    import CardsRelatorios from "@/components/CardRelatorios.vue";
    import MapClientes from "@/components/MapClientes.vue";
    import FaturamentoVendas from "@/components/FaturamentoVendas.vue";
</script>
