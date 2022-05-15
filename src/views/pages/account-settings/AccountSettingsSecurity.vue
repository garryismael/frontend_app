<template>
  <v-card flat class="mt-5">
    <v-form>
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col cols="12" sm="8" md="6">
              <!-- current password -->
              <v-text-field
                v-model="currentPassword"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="
                  isCurrentPasswordVisible
                    ? icons.mdiEyeOffOutline
                    : icons.mdiEyeOutline
                "
                label="Mot de passe courant"
                outlined
                dense
                @click:append="
                  isCurrentPasswordVisible = !isCurrentPasswordVisible
                "
              ></v-text-field>

              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="
                  isNewPasswordVisible
                    ? icons.mdiEyeOffOutline
                    : icons.mdiEyeOutline
                "
                label="Nouveau Mot de passe"
                outlined
                dense
                hint="Au moins 8 charachtères."
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="cPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="
                  isCPasswordVisible
                    ? icons.mdiEyeOffOutline
                    : icons.mdiEyeOutline
                "
                label="Confirmer mot de passe"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <!-- action buttons -->
        <v-card-text>
          <v-btn style="background: #ed156d !important" class="me-3 mt-3"> Sauvegarder </v-btn>
          <v-btn color="secondary" outlined class="mt-3"> Annuler </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiKeyOutline,
  mdiLockOpenOutline,
  mdiEyeOffOutline,
  mdiEyeOutline,
} from "@mdi/js";
import { ref } from "@vue/composition-api";

export default {
  setup() {
    const isCurrentPasswordVisible = ref(false);
    const isNewPasswordVisible = ref(false);
    const isCPasswordVisible = ref(false);
    const currentPassword = ref("12345678");
    const newPassword = ref("87654321");
    const cPassword = ref("87654321");

    return {
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      currentPassword,
      isCPasswordVisible,
      newPassword,
      cPassword,
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
