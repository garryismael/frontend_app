<template>
  <div class="d-flex justify-center my-auto center">
    <v-alert shaped dark color="primary" class="body-1 pa-10 text-center content">
      {{ $t('patienter')}}
    </v-alert>
  </div>
</template>
<script>
export default {
  name: "ConfirmEmail",
  data: () => ({}),
};
</script>
<style scoped>
.content {
    width: 50%;
}
.center {
  position: inherit;
  top: 50%;
}
</style>