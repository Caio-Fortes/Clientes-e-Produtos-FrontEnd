import axios from 'axios';
const url = "vendas";
const baseUrl = "http://localhost:8081"

export default {
    async getVendaById (idVenda) {
        try{
            return await axios.get(`${baseUrl}/${url}/${idVenda}`);
        } catch (error) {
            alert('Não foi possivel buscar a venda: '+ error.message);
        }
    },

    async getVendas() {
        try{
            return await axios.get(`${baseUrl}/${url}`);
        } catch (error) {
            alert('Não foi possivel buscar as vendas: '+ error.message);
        }
    },

    async createVendas (cliente) {
        try{
            await axios.post(`${baseUrl}/${url}`, cliente);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel criar um novo cliente: '+ error.message);
        }
    },

    async updateVenda (venda, idVenda) {
        try{
            await axios.put(`${baseUrl}/${url}/${idVenda}`, venda);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel editar o cliente: '+ error.message);
        }
    },

    async deleteCliente (idVenda) {
        try{
            await axios.delete(`${baseUrl}/${url}/${idVenda}`);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel deletar o cliente: '+ error.message);
        }
    }
}