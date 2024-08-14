<script>
export default {
    data(){
        return{
            allClientes: [],
            stateCoordinates: {
                "AC": [-9.97499, -67.80757],
                "AL": [-9.66599, -36.69455],
                "AM": [-3.41684, -65.85606],
                "AP": [0.902, -52.003],
                "BA": [-12.9714, -38.5014],
                "CE": [-3.71722, -38.5434],
                "DF": [-15.7801, -47.9292],
                "ES": [-20.3155, -40.3128],
                "GO": [-16.6869, -49.2648],
                "MA": [-2.52972, -44.3028],
                "MT": [-15.6014, -56.0979],
                "MS": [-20.4428, -54.6464],
                "MG": [-19.9167, -43.9345],
                "PA": [-1.45583, -48.5044],
                "PB": [-7.12107, -34.8761],
                "PR": [-25.4296, -49.2713],
                "PE": [-8.04756, -34.877],
                "PI": [-5.08921, -42.8016],
                "RJ": [-22.9068, -43.1729],
                "RN": [-5.79448, -35.211],
                "RO": [-8.76194, -63.9039],
                "RR": [2.8235, -60.6753],
                "RS": [-30.0346, -51.2177],
                "SC": [-27.5954, -48.548],
                "SP": [-23.5505, -46.6333],
                "SE": [-10.9472, -37.0731],
                "TO": [-10.1842, -48.3336]
            }
        }
    },
    mounted(){
        this.getAllClientes();
    },
    methods:{
        async getAllClientes(){
            const result = await ClienteService.getClientes();
            this.allClientes = result.data;
            this.initMap();
        },
        initMap(){
            this.map = L.map('mapClientes').setView([-19.9167, -43.9345], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(this.map);
            this.setLayers();
        },
        setLayers(){
            const map = this.map;
            function updateMapView(coordinates) {
                const latLng = L.latLng(coordinates);
                L.marker(latLng).addTo(map);
                map.setView(latLng, 4);
            }
            this.allClientes.forEach(element => {
                updateMapView(this.stateCoordinates[element.ui]);
            });   
        }
    }
};
</script>

<template>
    <div id="mapClientes" style="height: 300px; width: 100%; z-index: 0"></div>
</template>

<script setup>
    import ClienteService from "@/services/ClienteService.js";
</script>
