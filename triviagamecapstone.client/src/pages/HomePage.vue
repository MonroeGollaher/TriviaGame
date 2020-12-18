<template>
  <div class="home container-fluid">
    <div class="row justify-content-center align-items-center h-50">
      <div class="col-12 col-lg-6">
        <h1>Welcome!</h1>
        <h5>An app for managing bar trivia games for hosts and players.</h5>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        Video
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
  background-color: #f6b849;
}
h1, h5{
  color: #ebebeb;
  font-weight: 800;
}
h1{
  font-size: 6em;
}
h5{
  font-size: 2em;
}
</style>
