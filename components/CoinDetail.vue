<template>
	<div class="coin-detail">
		<div v-if="Object.keys($store.state.coin).length > 0" class="info">
			<img class="icon" :alt="$store.state.coin.name" :src="(`https://static.upbit.com/logos/${$store.state.coin.symbol}.png`)" />
			<div class="name">{{$store.state.coin.name}}</div>
			<div class="symbol">{{$store.state.coin.symbol}}</div>
		</div>
		<div class="body"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})

</script>
