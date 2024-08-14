<template>
    <main>
        <div id="containerBody"> 
            <TitlePage title="Relatórios" />
            <CardsRelatorios />
            <nav class="nav nav-pills nav-fill">
                <a class="nav-link active" aria-current="page" href="#">Localização dos Clientes</a>
                <a class="nav-link" href="#">Faturamento por mês</a>
            </nav>
            <div class="card"> 
               <MapClientes />
            </div>
        </div>
    </main>
</template>

<script setup>
    import TitlePage from "@/components/TitlePage.vue";
    import CardsRelatorios from "@/components/CardRelatorios.vue";
    import MapClientes from "@/components/MapClientes.vue";
</script>

