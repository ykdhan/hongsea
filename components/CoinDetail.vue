<template>
	<div v-if="Object.keys($store.state.coin).length > 0" class="coin-detail">
		<div class="info">
			<img class="icon" :alt="$store.state.coin.name" :src="(`https://static.upbit.com/logos/${$store.state.coin.symbol}.png`)" />
			<div class="name">{{$store.state.coin.name}}</div>
			<div class="symbol">{{$store.state.coin.symbol}}</div>
		</div>
		<div class="body">
			<input type="textbox" @keypress.enter="addChat">
			<ChatList :chats="$store.state.chats" :key="chatList" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NODE from '@/const/node'

export default Vue.extend({
	data() {
		return { chatList: 0 }
	},
	mounted() {
	// 	this.socket = this.$nuxtSocket({
	// 		channel: '/index'
	// 	})
	// 	this.socket.on('chat', (msg, cb) => {
	// 		console.log(msg)
	// 	})
	},
	methods: {
		addChat(e: any) {
			const text = e.target.value
			if (text.length) {
				axios.post(`${NODE.URL}/chat/create`, { symbol: this.$store.state.coin.symbol, text })
				e.target.value = ''
				axios.get(`${NODE.URL}/chat`, { params: { symbol: this.$store.state.coin.symbol } })
					.then((res : any) =>  {
						res.data && this.$store.commit('LOAD_CHATS', res.data)
					})
			}
		},
		// emitIO() {
		// 	this.socket.emit('method1', {
		// 		hello: 'world'
		// 	}, (resp) => {
		// 		/* Handle response, if any */
		// 	})
		// }
	}
})

</script>
