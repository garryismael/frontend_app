<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from "@vue/composition-api";
import { useRouter } from "@/utils";
import LayoutBlank from "@/layouts/Blank.vue";
import LayoutContent from "@/layouts/Content.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter();

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null;

      if (route.value.meta.layout === "blank") return "layout-blank";

      return "layout-content";
    });

    return {
      resolveLayout,
    };
  },
  methods: {
    ...mapMutations("traduction", ["setLanguage"]),
  },
  mounted() {
    this.setLanguage();
  },
};
</script>
