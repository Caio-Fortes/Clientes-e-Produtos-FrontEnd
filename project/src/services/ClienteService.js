import httpService from '@/services/HttpService';

const url = "/clientes"

export default {
    getClienteById (idCliente) {
        return httpService.get(`${url}/${idCliente}`)
    },

    getClientes() {
        return httpService.get(url)
    },

    createCliente (cliente) {
        return httpService.post(url, cliente)
    },

    updateCliente (cliente, idCliente) {
        return httpService.update(url, { id: idCliente, clienteRecordDto: cliente })
    },

    deleteCliente (idCliente) {
        return httpService.delete(url, idCliente)
    }
}