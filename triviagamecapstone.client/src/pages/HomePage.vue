<template>
  <div class="home container-fluid">
    <div class="row justify-content-center align-items-center h-50">
      <div class="col-12 col-lg-6">
        <h1 class="display-4 text-light">
          Welcome!
        </h1>
        <h5 class="display-4 text-light">
          An app for managing bar trivia games for hosts and players.
        </h5>
      </div>
    </div>
    <div class="row justify-content-center border-rounded">
      <div class="col-4 radius25 py-3">
        <p class="lead text-light">
          <b>Host Demo Login:</b>
        </p>
        <p class="lead text-light">
          Email: tom@triviagame.com
        </p>
        <p class="lead text-light">
          Password: Password123
        </p>
        <p class="lead text-light py-3">
          Both players and hosts can hit Play to start once logged in.
        </p>
        <p class="lead text-light">
          Players are free to create their own accounts!
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: { }
}
</script>

<style scoped lang="scss">
.home{
  height: 100;
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  background: linear-gradient(to right, rgba(124,184,255,1) ,rgba(252,169,205,1));
}
h5{
  font-size: 2em;
}
</style>
