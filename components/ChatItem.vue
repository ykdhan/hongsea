<template>
	<button class="chat-item">
		<div class="time">{{new Date(chat.createdAt).getHours() + ':' + new Date(chat.createdAt).getMinutes()}}</div>
		<div class="text">{{chat.text}}</div>
		<button class="likes">좋아요 {{chat.likes}}</button>
	</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: [ 'chat' ],
})

</script>
