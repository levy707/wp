<template>
  <v-app-bar app class="main-bar">
    <router-link class="main-bar__link" :to="{ name: 'Colors' }">Colors</router-link> |
    <router-link class="main-bar__link" :to="{ name: 'ValidationForm' }">Validation Form</router-link> |
    <router-link class="main-bar__link" :to="{ name: 'Jokes' }">Jokes</router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style lang="scss" scoped>
.main-bar {
  $root: &;

  &.v-sheet {
    &.v-app-bar {
      &.v-toolbar {
        background: $RedOrange;

        &::v-deep {
          .v-toolbar__content {
            display: flex;
            justify-content: center;
            color: $White;
          }
        }

        #{$root}__link {
          display: inline-block;
          margin: 0 8px;
          color: $White;

          &.router-link-exact-active {
            color: $Primary;
          }
        }
      }
    }
  }
}
</style>
