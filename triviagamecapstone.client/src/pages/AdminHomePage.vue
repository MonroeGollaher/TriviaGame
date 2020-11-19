<template>
  <div class="adminHomePage">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4 text-center">
          Welcome, host name!
        </h1>
      </div>
    </div>
    <div class="row">
      <NewGame-component />
      <game-component />
    </div>
  </div>
</template>

<script>
import NewGameComponent from '../components/NewGameComponent'
import GameComponent from '../components/GameComponent'
export default {
  name: 'AdminHomePage',
  components: { NewGameComponent, GameComponent },
  setup() {
    return {}
  }

}
</script>

<style lang="scss" scoped>

</style>
