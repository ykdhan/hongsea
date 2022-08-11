<template>
	<div class="app">
		<CoinList />
		<CoinDetail />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'IndexPage',
})
</script>

<style lang="scss">
@import '../styles/common.scss';
</style>
