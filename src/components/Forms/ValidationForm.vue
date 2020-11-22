<template>
  <v-form>
    <v-textarea outlined label="Bracket validator" :value="textField" :rules="rules['signs']" error-count="3" />
  </v-form>
</template>

<script>
import formMixin from '@/mixins/formMixin';
export default {
  name: 'ValidationForm',
  mixins: [formMixin],
  data: () => ({
    textField: '',
  }),
};
</script>

<style scoped></style>
