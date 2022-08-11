export const state = () => ({
	coins: []
})

export const mutations = {
	ADD_COIN(state, coin) {
		state.coins.push(coin)
	},
	UPDATE_COINS(state) {
		state.coins = state
	}
}
