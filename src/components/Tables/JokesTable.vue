<template>
  <div>
    <template v-if="jokeLoader">
      <v-progress-circular color="error" class="py-3" :size="100" indeterminate />
    </template>
    <v-simple-table v-if="!jokeLoader" fixed-header height="calc(100vh - 166px)">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Position
            </th>
            <th class="text-left">
              Joke
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(joke, index) in jokesList" :key="`joke_${index + 1}`">
            <td>{{ index + 1 }}</td>
            <td>{{ joke }}</td>
            <td><v-btn @click="getNewJoke(index)" color="primary">Get New</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'JokesTable',
  computed: {
    ...mapState('jokes', ['jokesList', 'jokeLoader']),
  },
  created() {
    this.getJokesList(50);
  },
  methods: {
    ...mapActions('jokes', ['getJokesList', 'getJoke', 'restoreJoke']),
    async getNewJoke(listPosition) {
      const removedJoke = this.jokesList[listPosition];
      await this.getJoke(listPosition);
      this.showToast(listPosition, removedJoke);
    },
    showToast(listPosition, joke) {
      this.$toasted.show('New joke is downloaded !!!', {
        action: {
          text: 'UNDO',
          onClick: (e, toastObject) => {
            this.restoreJoke({ listPosition, joke });
            toastObject.goAway(0);
          },
        },
      });
    },
  },
};
</script>

<style scoped></style>
