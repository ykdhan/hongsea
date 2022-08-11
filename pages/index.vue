<template>
	<div class="app">
		<h1>Upbit</h1>
		<CoinList />
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
