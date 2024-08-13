import axios from 'axios';
const url = "clientes";
const baseUrl = "http://localhost:8081"

export default {
    async getClienteById (idCliente) {
        try{
            return await axios.get(`${baseUrl}/${url}/${idCliente}`);
        } catch (error) {
            alert('Não foi possivel buscar o cliente: '+ error.message);
        }
    },

    async getClientes() {
        try{
            return await axios.get(`${baseUrl}/${url}`);
        } catch (error) {
            alert('Não foi possivel buscar os clientes: '+ error.message);
        }
    },

    async createCliente (cliente) {
        try{
            await axios.post(`${baseUrl}/${url}`, cliente);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel criar um novo cliente: '+ error.message);
        }
    },

    async updateCliente (cliente, idCliente) {
        try{
            await axios.put(`${baseUrl}/${url}/${idCliente}`, cliente);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel editar o cliente: '+ error.message);
        }
    },

    async deleteCliente (idCliente) {
        try{
            await axios.delete(`${baseUrl}/${url}/${idCliente}`);
            window.location.reload();
        } catch (error) {
            alert('Não foi possivel deletar o cliente: '+ error.message);
        }
    }
}