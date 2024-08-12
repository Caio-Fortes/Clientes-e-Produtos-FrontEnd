import httpService from '@/services/HttpService';

const url = "/vendas"

export default {
    getVendaById (idVenda) {
        return httpService.get(`${url}/${idVenda}`)
    },

    getVendas() {
        return httpService.get(url)
    },

    createVenda (venda) {
        return httpService.post(url, venda)
    },

    updateVenda (venda, idVenda) {
        return httpService.update(url, { id: idVenda, vendaDto: venda })
    },

    deleteVenda (idVenda) {
        return httpService.delete(url, idVenda)
    }
}