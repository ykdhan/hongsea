<template>
	<div class="chat-list">
		<ChatItem v-for="chat in chats" :key="chat._id" :chat="chat" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: [ 'chats' ]
})

</script>
