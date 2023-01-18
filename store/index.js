export const strict = false

export const state = () => ({
  // loginStatus: "normal"
  classifier: null
})

export const mutations = {
  // updateLoginStatus(state, data) {
  //   state.loginStatus = data;
  // }
  setMachineModel(state, payload) {
    state.classifier = payload
  }
}

export const actions = {
  // updateLoginStatus(context, data) {
  //   return new Promise(resolve => {
  //     context.commit("updateLoginStatus", data);
  //     resolve();
  //   });
  // }
  setMachineModel(context, payload) {
    context.commit('setMachineModel', payload.data)
  }
}
