<script>
    export default {
        props:{
            titleTable:{
                type: String,
                required: true,
                default: 'title here'
            },
            urlGet:{
                type: String,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
            },
            keysDatas:{
                type: Array,
                required: true,
            },
            filterPlaceholder:{
                type: String,
                required: true,
                default: 'example...'
            },
            filterKeys:{
                type: Array,
                required: true,
            }
        },
        data(){
            return{
                dados: [],
                dadosGrid: [],
                filter: '',
                gridInstance: null
            }
        },
        mounted(){
            this.setConfigColumns();
            this.getDatas();
        },
        methods:{
            async getDatas(){
                this.dados = await PostService.getPosts(this.urlGet);
                this.$emit("dadosTable", this.dados);
                this.montarTabela();
            },
            mapperDataGrid(dados) {
                return this.dadosGrid = dados.map((a) => {
                    return this.keysDatas.map((key) => {
                        let value;
                        if (key.includes('-money')) {
                            const keysArray = key.split('-');
                            value = a[keysArray[0]].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        }
                        else{
                            const keysArray = key.split('.');
                            value = keysArray.reduce((acc, curr) => {
                                return acc ? acc[curr] : undefined;
                            }, a);
                        }
                        return value;
                    });
                });
            },
            montarTabela(){
                this.gridInstance = new Grid({
                    columns: this.columns,
                    pagination: true,
                    sort: true,
                    data: this.mapperDataGrid(this.dados),
                }).render(document.getElementById("table"));
                this.$emit("instanceTable", this.gridInstance);
            },
            setConfigColumns(){
                this.columns.push({
                    name: "id", 
                    formatter: (cell) => cell, 
                    hidden: true
                });
                this.columns.push({
                    name: "Ações",
                    formatter: (cell, row) => {
                        return h(
                            "div",
                            { className: "dropdown" },
                            [
                            h(
                                "button",
                                {
                                className: "btn btn-primary dropdown-toggle",
                                type: "button",
                                id: `dropdownMenuButton-${row.index}`,
                                "data-bs-toggle": "dropdown",
                                "aria-expanded": "false"
                                },
                                "Ações"
                            ),
                            h(
                                "ul",
                                {
                                className: "dropdown-menu",
                                "aria-labelledby": `dropdownMenuButton-${row.index}`
                                },
                                [
                                h(
                                    "li",
                                    {},
                                    h(
                                    "a",
                                    {
                                        className: "dropdown-item",
                                        href: "#",
                                        onClick: () => handleDropdownClick('Edit', row.cells)
                                    },
                                    "Editar"
                                    )
                                ),
                                h(
                                    "li",
                                    {},
                                    h(
                                    "a",
                                    {
                                        className: "dropdown-item",
                                        href: "#",
                                        onClick: () => handleDropdownClick('Delete', row.cells)
                                    },
                                    "Excluir"
                                    )
                                )
                                ]
                            )
                            ]
                        );
                    },
                    width: "120px"
                })
                const handleDropdownClick = (action, rowSelected) => {
                    this.$emit('actionSelected', action, rowSelected)
                };
            },
            filtrar() {
                const resultado = this.dados.filter(item => 
                    this.filterKeys.some(key => {
                        const value = key.split('.').reduce((acc, curr) => acc ? acc[curr] : undefined, item);
                        return value && value.toString().toLowerCase().includes(this.filter.toLowerCase());
                    })
                );
                const dadosFiltrados = this.mapperDataGrid(resultado);
                this.gridInstance.updateConfig({
                    data: dadosFiltrados
                }).forceRender();
            }
        }
    }
</script>

<template>
    <div class="input-group">
        <input type="text" class="form-control" 
          :placeholder="filterPlaceholder"
          aria-describedby="basic-addon2"
          v-model="filter"
        >
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="filtrar" id="buttonDefault" type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <slot></slot>
    </div>
    <div style="margin-top: 20px;">
        <h3 class="titles">{{ titleTable }}</h3>
        <div id="table"></div>
    </div>
</template>

<script setup>
import PostService from "@/services/PostService";
import { Grid, h } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
</script>
