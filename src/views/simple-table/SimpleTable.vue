<template>
  <v-row>
    <!-- height -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Utilisateurs</v-card-title>
        <demo-simple-table-height></demo-simple-table-height>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DemoSimpleTableHeight from "./demos/DemoSimpleTableHeight.vue";

export default {
  components: {
    DemoSimpleTableHeight,
  },
  setup() {
    return {};
  },
};
</script>
