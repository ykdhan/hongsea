<template>
	<button class="coin-item" :class="{'selected': $store.state.coin && ($store.state.coin.symbol === coin.symbol)}" @click="selectCoin(coin.symbol)">
		<img class="icon" :alt="coin.name" :src="icon" />
		<div class="name">{{coin.name}}</div>
		<div class="symbol">{{coin.symbol}}</div>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NODE from '@/const/node'

export default Vue.extend({
	props: [ 'coin' ],
	data() {
		return { icon: `https://static.upbit.com/logos/${this.coin.symbol}.png` }
	},
	methods: {
		selectCoin(symbol: string) {
			this.$store.commit('SELECT_COIN', symbol)

			axios.get(`${NODE.URL}/chat`, { params: { symbol } })
				.then((res : any) =>  {
					res.data && this.$store.commit('LOAD_CHATS', res.data)
				})
		}
	}
})

</script>
