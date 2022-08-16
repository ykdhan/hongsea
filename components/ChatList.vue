<template>
	<div class="chat-list">
		<input type="textbox" @keypress="addChat">
		<ChatItem v-for="chat in $store.state.chats" :key="chat.id" :chat="chat" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

const NODE_URL = `http://${process.env.NODE_DOMAIN}:${process.env.NODE_PORT}`

export default Vue.extend({
	props: [ 'coin' ],
	created() {
		axios.get(`${NODE_URL}/chat`, { params: { symbol: this.coin.symbol || '' } })
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
				// axios.post(`${NODE_URL}/chat/create`, { symbol: this.coin.symbol, text })
			}
		}
	}
})

</script>
