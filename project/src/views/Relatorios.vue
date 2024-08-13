<script setup>
import TitlePage from "../components/TitlePage.vue";
import Card from "../components/Card.vue";
import VendaService from "@/services/VendaService.js"
</script>

<script>
export default {
    data() {
        return {
            cardArray: [
                { title: "VENDAS NO ANO", description: "Teste", icon: "attach_money" },
                { title: "CLIENTES COM MAIS VENDAS NO MÊS", description: "Teste 1", icon: "chart_data" },
                { title: "CLIENTE COM MAIOR FATURAMENTO (MÊS)", description: "Teste 2", icon: "attach_money" },
                { title: "CLIENTE COM MAIOR FATURAMENTO (ANO)", description: "Teste 3", icon: "attach_money" }
            ],
            dadosRelatorio: {}
        };
    },
    mounted() {
        this.buscarDadosRelatorio()
    },
    methods: {
        async buscarDadosRelatorio() {
            this.dadosRelatorio = await VendaService.buscarRelatorioVendas("2024")
        }
    }
};
</script>

<template>
    <main>
        <div id="containerBody">
            <TitlePage title="Relatórios" />
        </div>
        <div>
            <Card :cardArray=cardArray :dados="dadosRelatorio" />
        </div>
    </main>
</template>

