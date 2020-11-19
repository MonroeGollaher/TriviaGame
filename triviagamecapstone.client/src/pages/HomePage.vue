<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 col-lg-6">
        <h1>Welcome to NameHere</h1>
      </div>
    </div>
    <div class="row">
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
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
