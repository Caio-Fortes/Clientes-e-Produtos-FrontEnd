<template>
    <div class="cards-container">
      <div class="card" v-for="card in cards" :key="card.id">
        <h3>{{ card.title }}</h3>
        <span class="material-symbols-outlined">{{ card.icon }}</span>
        <p>{{ card.description }}</p>
      </div>
    </div>
</template>

<script>
    export default {
        props: {
            cardArray: {
                type: Array,
                required: true,
            },
            dados: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                cards: [],
                dadosRelatorio: {}
            };
        },
        mounted() {
            this.cards = this.cardArray
            this.dadosRelatorio = this.dados
        }
    };
</script>
  