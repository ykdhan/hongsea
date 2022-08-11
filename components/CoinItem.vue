<template>
	<div class="coin-item">
		<img class="icon" :alt="coin.name" :src="icon" />
		<div class="name">{{coin.name}}</div>
		<div class="symbol">{{coin.symbol}}</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: [ 'coin' ],
	data() {
		return { icon: `https://static.upbit.com/logos/${this.coin.symbol}.png` }
	}
})

</script>
