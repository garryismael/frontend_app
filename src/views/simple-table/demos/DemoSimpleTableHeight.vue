<template>
  <v-simple-table height="250">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">ID</th>
          <th class="text-center text-uppercase">Nom</th>
          <th class="text-center text-uppercase">Prénom</th>
          <th class="text-center text-uppercase">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.id }}</td>
          <td class="text-center">
            {{ item.nom }}
          </td>
          <td class="text-center">
            {{ item.prenom }}
          </td>
          <td class="text-center">
            {{ item.email }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mdiEye } from "@mdi/js";
export default {
  data: () => ({
    icon_eye: mdiEye,
  }),
  setup() {
    const users = [
      {
        id: 1,
        nom: "Ismael",
        prenom: "garry",
        email: "tahinjanaharygarry@gmail.com",
        image:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      },
    ];

    return {
      users,
    };
  },
};
</script>
