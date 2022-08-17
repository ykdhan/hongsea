export const state = () => ({
	coin: {},
	coins: [],
	chats: []
})

export const mutations = {
	ADD_COIN(state, coin) {
		state.coins.push(coin)
	},
	SELECT_COIN(state, symbol) {
		state.coin = state.coins.filter((c) => c.symbol === symbol)[0]
	},
	LOAD_CHATS(state, chats) {
		state.chats = chats
	}
}
