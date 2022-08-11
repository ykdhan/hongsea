<template>
	<button class="coin-item" @click="selectCoin(coin.symbol)">
		<img class="icon" :alt="coin.name" :src="icon" />
		<div class="name">{{coin.name}}</div>
		<div class="symbol">{{coin.symbol}}</div>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: [ 'coin' ],
	data() {
		return { icon: `https://static.upbit.com/logos/${this.coin.symbol}.png` }
	},
	methods: {
		selectCoin(a: string) {
			this.$store.commit('SELECT_COIN', a)
		}
	}
})

</script>
