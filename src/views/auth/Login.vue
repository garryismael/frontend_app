<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-alert prominent type="error" class="mb-6" v-show="!logged">
        {{ $t("login_error") }}
      </v-alert>
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
            <h2 class="text-2xl font-weight-semibold">Materio</h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to Materio! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="username"
              outlined
              :label="`${$t('username')}`"
              placeholder="johndoe"
              hide-details
              class="mb-3"
              :rules="loginRules"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              :label="`${$t('password')}`"
              placeholder="············"
              :append-icon="
                isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
              "
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
              :rules="loginRules"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                :label="`${$t('remember_me')}`"
                hide-details
                class="me-3 mt-1"
                v-model="rememberMe"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a href="javascript:void(0)" class="mt-1">
                {{ $t("forgot_password") }}?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="signIn"
              :disabled="!valid"
              :loading="onload"
            >
              {{ $t("login") }}
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> {{ $t("new_plateform") }}? </span>
          <router-link :to="{ name: 'register' }">
            {{ $t("create_account") }}
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="
        require(`@/assets/images/misc/mask-${
          $vuetify.theme.dark ? 'dark' : 'light'
        }.png`)
      "
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { isRequired } from "@/utils/validators";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    isPasswordVisible: false,
    username: "",
    password: "",
    rememberMe: false,
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
    loginRules: [isRequired()],
    loginErrors: [],
    logged: true,
    onload: false
  }),
  computed: {
    ...mapState("auth", ["next"]),
    valid() {
      return this.username !== "" && this.password !== "";
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("auth", ["setNext"]),
    async signIn() {
      this.onload = true;
      this.logged = await this.login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe,
      });
      this.onload = false;
      if (this.logged) {
        this.$router.push({ path: this.next });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/plugins/vuetify/default-preset/preset/pages/auth.scss";
</style>
