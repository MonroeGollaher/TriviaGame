<template>
  <div class="ActiveGamePage container-fluid">
    <AdminActiveGameComponent v-if="authService.hasRoles('Host')" />
    <TeamActiveGameComponent v-if="!authService.hasRoles('Host')" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

export default {
  name: 'ActiveGamePage',
  components: { },
  setup() {
    return {
      user: computed(() => AppState.user),
      authService: computed(() => AuthService)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
