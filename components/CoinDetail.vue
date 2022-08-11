<template>
	<div class="coin-detail">
		<div v-if="$store.state.coin" class="head">
			<!-- <img :alt="$store.state.coin.name" :src="`https://static.upbit.com/logos/${this.$store.state.coin.symbol}.png`"> -->
			<div>{{$store.state.coin.name}}</div>
		</div>
		<div class="body"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})

</script>
