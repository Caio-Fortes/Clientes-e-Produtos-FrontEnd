<script>
export default {
    data(){
        return{
            vendasMeses: []
        }
    },
    mounted() {
        this.getAllVendas();
    },
    methods:{
        async getAllVendas(){
            const result = await VendaService.getVendas();
            this.setTotalFaturamentoMeses(result.data)
        },
        setTotalFaturamentoMeses(vendas){
            const meses = [
                "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];

            const vendas2024 = vendas.filter(venda => venda.data.endsWith('2024'));
            const totalPorMes = meses.map(mes => ({
                mes: mes, valorTotal: 0, quantidade: 0
            }));
            vendas2024.forEach(venda => {
                const mesIndex = parseInt(venda.data.split('/')[1], 10) - 1;
                totalPorMes[mesIndex].valorTotal += venda.valor;
                totalPorMes[mesIndex].quantidade += 1;
            });
            this.vendasMeses = totalPorMes;
            this.montarGrafico();
            this.montarTabela();
        },
        montarGrafico(){
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.vendasMeses.map(a => a.mes),
                    datasets: [{
                    label: 'Valor Total Vendas',
                    data: this.vendasMeses.map(a => a.valorTotal),
                    borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        montarTabela(){
            new Grid({
                columns: ['Mês', 'Vendas', 'Total'],
                data: this.mapperDataGrid(),
            }).render(document.getElementById("table"));
        },
        mapperDataGrid(){
            return this.vendasMeses.map(item => [
                item.mes,
                item.quantidade.toString(),
                item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            ]);
        }
    }
}
</script>

<template>
    <div> 
        <canvas id="myChart" width="400" height="200"></canvas>
        <div id="table"></div>
    </div>
</template>

<script setup>
    import VendaService from "@/services/VendaService.js";
    import { Grid, h } from 'gridjs';
    import 'gridjs/dist/theme/mermaid.css';
</script>