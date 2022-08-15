<template>
	<div class="chat-list">
		<input type="textbox" @keypress="addChat">
		<ChatItem v-for="chat in $store.state.chats" :key="chat.id" :chat="chat" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
	props: [ 'coin' ],
	created() {
		axios.get(`http://localhost:5050/chat`, { params: { symbol: this.coin.symbol || '' } })
			.then((res : any) =>  {
				console.log(res.data);
			})
	},
	methods: {
		loadChat(a: string) {
			this.$store.commit('LOAD_CHAT', a)
		},
		addChat(e: any) {
			if (e.key === 'Enter') {
				const text = e.target.value
				console.log(text)
				// axios.post(`http://localhost:5050/chat/create`, { symbol: this.coin.symbol, text })
			}
		}
	}
})

</script>
