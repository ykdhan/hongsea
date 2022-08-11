export const state = () => ({
	coin: {},
	coins: [],
})

export const mutations = {
	ADD_COIN(state, coin) {
		state.coins.push(coin)
	},
	SELECT_COIN(state, symbol) {
		state.coin = state.coins.filter((c) => c.symbol === symbol)[0]
	}
}
