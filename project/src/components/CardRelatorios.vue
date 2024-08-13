<script>
export default {
    data() {
        return {
            cards: [],
            relatorioMensal: {},
            relatorioAnual: {}
        };
    },
    mounted() {
        this.buscarDadosRelatorio()
    },
    methods: {
        async buscarDadosRelatorio() {
            const result = await VendaService.buscarRelatorioVendas("2024");
            this.relatorioAnual = result.data.vendasAnuais;
            this.relatorioMensal = result.data.vendasMensais[0];
            this.setCards();
        },
        setCards(){
            this.cards = [
                {
                    title: "VENDAS NO ANO", icon: "attach_money",
                    description: this.formatarMoeda(this.relatorioAnual.totalValorClienteMaisValorAno), 
                },
                {
                    title: "CLIENTES COM MAIS VENDAS NO MÊS", icon: "attach_money",
                    description: this.relatorioMensal.clienteMaisNumeroVendas, 
                },
                {
                    title: "CLIENTE COM MAIOR FATURAMENTO (MÊS)", icon: "attach_money",
                    description: `
                        ${this.relatorioMensal.clienteMaisValorVendas} 
                        (${this.formatarMoeda(this.relatorioMensal.totalVendasClienteMaiorNumero)})
                    ` 
                },
                {
                    title: "CLIENTE COM MAIOR FATURAMENTO (ANO)", icon: "attach_money",
                    description: `
                        ${this.relatorioAnual.clienteMaisNumeroVendasAno} 
                        (${this.formatarMoeda(this.relatorioAnual.totalValorClienteMaisValorAno)})
                    ` 
                },
            ]
        },
        formatarMoeda(value){
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }
};
</script>

<template>
    <div class="cards-container">
      <div class="card" v-for="card in cards">
        <h3 class="titles">{{ card.title }}</h3>
        <div id="contentCards">
            <span class="material-symbols-outlined">{{ card.icon }}</span>
            <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
    import VendaService from "@/services/VendaService.js"
</script>