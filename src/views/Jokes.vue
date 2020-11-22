<template>
  <v-container>
    <h1>Jokes</h1>
    <jokes-table />
  </v-container>
</template>
<script>
import JokesTable from '@/components/Tables/JokesTable';

export default {
  name: 'Jokes',
  components: { JokesTable },
};
</script>
