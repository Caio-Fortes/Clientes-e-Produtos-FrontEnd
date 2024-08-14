import axios from 'axios';
const url = "vendas";
const baseUrl = "http://localhost:8081"

export default {
    async getVendaById (idVenda) {
        try{
            return await axios.get(`${baseUrl}/${url}/${idVenda}`);
        } catch (error) {
            console.log('Não foi possivel buscar a venda: '+ error.message);
        }
    },

    async getVendas() {
        try{
            return await axios.get(`${baseUrl}/${url}`);
        } catch (error) {
            console.log('Não foi possivel buscar as vendas: '+ error.message);
        }
    },

    async createVendas (venda) {
        if (
            !venda.data ||
            !venda.status ||
            !venda.valor
        ) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return;
        }
        try{
            await axios.post(`${baseUrl}/${url}`, venda);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel criar uma nova venda: '+ error.message);
        }
    },

    async updateVenda (venda, idVenda) {
        if (
            !venda.data ||
            !venda.status ||
            !venda.valor
        ) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return;
        }
        try{
            await axios.put(`${baseUrl}/${url}/${idVenda}`, venda);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel editar a venda: '+ error.message);
        }
    },

    async deleteVenda (idVenda) {
        try{
            await axios.delete(`${baseUrl}/${url}/${idVenda}`);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel deletar a venda: '+ error.message);
        }
    },

    async buscarRelatorioVendas (ano) {
        try{
            return await axios.get(`${baseUrl}/${url}/resumo-vendas`, ano);
        } catch (error) {
            console.log('Não foi possível buscar o relatório das vendas: '+ error.message);
        }
    }
}