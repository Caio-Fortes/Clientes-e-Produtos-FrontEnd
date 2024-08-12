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
            }
        },
        data(){
            return{
                dataGrid: []
            }
        },
        mounted(){
            this.setConfigColumns();
            this.getDatas();
        },
        methods:{
            async getDatas(){
                const datas = await PostService.getPosts(this.urlGet);
                this.dataGrid = datas.map((a) => {
                    return this.keysDatas.map((key) => a[key]);
                });
                this.montarTabela();
            },
            montarTabela(){
                const grid = new Grid({
                    columns: this.columns,
                    pagination: true,
                    sort: true,
                    data: this.dataGrid
                }).render(document.getElementById("table"));
            },
            setConfigColumns(){
                this.columns.push({
                    name: "Actions",
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
                                "Actions"
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
                                        onClick: () => handleDropdownClick(row.cells[0].data, 'Option 1')
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
                                        onClick: () => handleDropdownClick(row.cells[0].data, 'Option 2')
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
                const handleDropdownClick = (name) => {
                    alert(`Button clicked for ${name}`);
                };
            }
        }
    }
</script>

<template>
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
