<template>
	<aside class="side">
		<div class="coin-list">
			<CoinItem v-for="coin in $store.state.coins" :key="coin.symbol" :coin="coin" />
		</div>
		<div class="coin-status">{{$store.state.coins.length}}개의 업비트 코인</div>
	</aside>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NODE from '@/const/node'

export default Vue.extend({
	created() {
		axios.get(`${NODE.URL}/coins`)
			.then((res : any) =>  {
				res.data.forEach((coin: any) => {
					this.addCoin(coin)
				})
			})
	},
	methods: {
		addCoin(data : any) {
			this.$store.commit('ADD_COIN', data)
		}
	}
})

</script>
