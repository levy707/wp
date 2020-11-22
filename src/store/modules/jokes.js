import api from '@/api/index';

const state = () => ({
  jokesList: [],
  jokeLoader: false,
});

const getters = {};

const actions = {
  async getJokesList({ commit }, jokesNumber) {
    commit('showJokesLoader');
    const jokes = [];
    const promises = [];
    for (let i = 1; i <= jokesNumber; i++) {
      promises.push(api.jokes.getJoke());
    }
    await Promise.all([...promises])
      .then((response) => {
        response.map((item) => {
          jokes.push(item.value);
        });
        commit('setJokesList', jokes);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        commit('hideJokesLoader');
      });
  },
  async getJoke({ commit }, listPosition) {
    await api.jokes
      .getJoke()
      .then((response) => {
        commit('setNewJoke', { position: listPosition, joke: response.value });
      })
      .catch((e) => {
        console.error(e);
      });
  },
  restoreJoke({ commit }, { listPosition, joke }) {
    commit('setNewJoke', { position: listPosition, joke });
  },
};

const mutations = {
  setJokesList(state, jokes) {
    state.jokesList = jokes;
  },
  setNewJoke(state, { position, joke }) {
    state.jokesList.splice(position, 1, joke);
  },
  showJokesLoader(state) {
    state.jokeLoader = true;
  },
  hideJokesLoader(state) {
    state.jokeLoader = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
