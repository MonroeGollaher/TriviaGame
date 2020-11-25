<!-- //NOTE - This component will display the team name, and average points per game that they have played in and compare them to all the other teams in the league -->
<template>
  <div class="LeagueLeaderBoard container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6 d-flex">
        <p>TeamName</p>
        <p class="ml-2">
          TeamRank
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeagueLeaderBoard',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
