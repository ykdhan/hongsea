<template>
	<button class="chat-item">
		<div class="text">{{chat.text}}</div>
		<div class="time">{{chat}}</div>
		<button>likes</button>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: [ 'chat' ],
	methods: {
	}
})

</script>
