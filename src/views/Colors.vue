<template>
  <v-container>
    <h1>Find Color</h1>
    <colors-form />
  </v-container>
</template>

<script>
import ColorsForm from '@/components/Forms/ColorsForm';

export default {
  name: 'Colors',
  components: {
    ColorsForm,
  },
};
</script>
