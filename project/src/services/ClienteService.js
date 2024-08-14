import axios from 'axios';
const url = "clientes";
const baseUrl = "http://localhost:8081"

export default {
    async getClienteById (idCliente) {
        try{
            return await axios.get(`${baseUrl}/${url}/${idCliente}`);
        } catch (error) {
            console.log('Não foi possivel buscar o cliente: '+ error.message);
        }
    },

    async getClientes() {
        try{
            return await axios.get(`${baseUrl}/${url}`);
        } catch (error) {
            console.log('Não foi possivel buscar os clientes: '+ error.message);
        }
    },

    async createCliente (cliente) {
        if (
            !cliente.nome ||
            !cliente.CNPJ ||
            !cliente.telefone ||
            !cliente.email ||
            !cliente.UI
        ) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return;
        }
        try{
            await axios.post(`${baseUrl}/${url}`, cliente);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel criar um novo cliente: '+ error.message);
        }
    },

    async updateCliente (cliente, idCliente) {
        if (
            !cliente.nome ||
            !cliente.CNPJ ||
            !cliente.telefone ||
            !cliente.email ||
            !cliente.UI
        ) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return;
        }
        try{
            await axios.put(`${baseUrl}/${url}/${idCliente}`, cliente);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel editar o cliente: '+ error.message);
        }
    },

    async deleteCliente (idCliente) {
        try{
            await axios.delete(`${baseUrl}/${url}/${idCliente}`);
            window.location.reload();
        } catch (error) {
            console.log('Não foi possivel deletar o cliente: '+ error.message);
        }
    }
}