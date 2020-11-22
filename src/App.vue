<template>
  <v-app>
    <page-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader';
export default {
  components: { PageHeader },
};
</script>

<style lang="scss">
#app {
}
</style>
