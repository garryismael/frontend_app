<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
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

            <h2 class="text-2xl font-weight-semibold">Fahagola</h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Adventure starts here 🚀
          </p>
          <p class="mb-2">Make your app management easy and fun!</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="nom"
              outlined
              :label="`${$t('nom')}`"
              placeholder="JohnDoe"
              hide-details
              class="mb-3"
            >
            </v-text-field>

            <v-text-field
              v-model="username"
              outlined
              :label="`${$t('username')}`"
              placeholder="johndoe"
              hide-details
              class="mb-3"
            >
            </v-text-field>

            <v-text-field
              v-model="email"
              outlined
              :label="`${$t('email')}`"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
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
            ></v-text-field>

            <v-btn block style="background: #ed156d;" class="mt-6 white--text">
              {{ $t("sign_up") }}
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> {{ $t("already_hade_account") }}? </span>
          <router-link :to="{ name: 'login' }">
            {{ $t("sign_instead") }}
          </router-link>
        </v-card-text>
      </v-card>
    </div>
    <Background />
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";

import Background from "@/components/shared/Background";

export default {
  components: {
    Background,
  },
  data: () => ({
    isPasswordVisible: false,
    nom: "",
    username: "",
    email: "",
    password: "",
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
  }),
};
</script>

<style lang="scss">
@import "~@/plugins/vuetify/default-preset/preset/pages/auth.scss";
</style>

