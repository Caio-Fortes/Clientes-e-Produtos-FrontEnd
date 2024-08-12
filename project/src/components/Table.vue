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
                default: 'exaple...'
            }
        },
        data(){
            return{
                dadosGrid: []
            }
        },
        mounted(){
            this.setConfigColumns();
            this.getDatas();
        },
        methods:{
            async getDatas(){
                const datas = await PostService.getPosts(this.urlGet);
                this.dadosGrid = datas.map((a) => {
                    return this.keysDatas.map((key) => a[key]);
                });
                this.$emit("dadosTable", datas);
                this.montarTabela();
            },
            montarTabela(){
                const grid = new Grid({
                    columns: this.columns,
                    pagination: true,
                    sort: true,
                    data: this.dadosGrid
                }).render(document.getElementById("table"));
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
                const style = document.createElement('style');
                style.innerHTML = `
                    .gridjs-th:nth-child(4),
                    .gridjs-td:nth-child(4) {
                    display: none;
                    }
                `;
                document.head.appendChild(style);
                const handleDropdownClick = (action, rowSelected) => {
                    this.$emit('actionSelected', action, rowSelected)
                };
            },
            filtrar(){

            }
        }
    }
</script>

<template>
    <div class="input-group">
        <input type="text" class="form-control" 
          :placeholder="filterPlaceholder"
          aria-describedby="basic-addon2"
        >
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" id="buttonDefault" type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <slot></slot>
    </div>
    <div style="margin-top: 20px;">
        <h3>{{ titleTable }}</h3>
        <div id="table"></div>
    </div>
</template>

<script setup>
import PostService from "../api/PostService";
import { Grid, h } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
</script>
