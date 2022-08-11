<template>
	<div class="coin-list">
		<CoinItem v-for="coin in $store.state.coins" :key="coin._id" :coin="coin" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
	created() {
		axios.get(`http://localhost:5050/coins`)
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
