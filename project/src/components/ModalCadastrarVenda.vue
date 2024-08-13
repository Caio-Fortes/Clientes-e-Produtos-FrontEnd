<script>
export default {
    data() {
        return {
            venda:{
                clienteId: '',
                data: '',
                status: '',
                valor: 0
            },
            statusVenda: [
                "Aguardando pagamento", "Pagamento aprovado", 
                "Aguardando envio", "À caminho", "Finalizado"
            ],
            formattedValue: '',
            allClientes: []
        }
    },
    watch: {
        venda: {
            deep: true,
            handler(newValue) {
                this.formattedValue = this.formatToCurrency(newValue.valor);
            }
        }
    },
    mounted(){
        this.getAllClientes();
    },
    methods:{
        async getAllClientes(){
            const result = await ClienteService.getClientes();
            return this.allClientes = result.data;
        },
        async salvar(){
            await VendaService.createVendas(this.venda);
        },
        formatToCurrency(value) {
            return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        parseFromCurrency(value) {
            return parseFloat(value.replace(/\D/g, '')) / 100;
        },
        updateValue(event) {
            const numericValue = this.parseFromCurrency(event.target.value);
            this.venda.valor = numericValue;
            this.formattedValue = this.formatToCurrency(numericValue);
        },
        fecharModal(){
            this.$emit('fecharModal');
        }
    }
}
</script>

<template>
    <Modal title="Cadastrar Venda">
        <template #content>
            <div>
                Cliente *
                <div class="input-group mb-3">
                    <select class="form-control" v-model="venda.clienteId">
                    <option v-for="cliente in allClientes" :value="cliente.idCliente">{{ cliente.nome }}</option>
                    </select>
                </div>
            </div>
            <div>
                Data da venda*
                <div class="input-group mb-3">
                    <input type="text" v-mask="'##/##/#####'" class="form-control" v-model="venda.data">
                </div>
            </div>
            <div>
                Situação *
                <div class="input-group mb-3">
                    <select class="form-control" v-model="venda.status">
                        <option v-for="status in statusVenda" :value="status">{{ status }}</option>
                    </select>
                </div>
            </div>
            <div>
                Valor da venda *
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="formattedValue" @input="updateValue">
                </div>
            </div>
        </template>
        <template #buttons>
            <button type="button" class="btn btn-primary" @click="fecharModal" style="background-color: gray">
            Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="salvar"> Salvar </button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from "../components/Modal.vue";
import ClienteService from "@/services/ClienteService";
import VendaService from "@/services/VendaService";
</script>