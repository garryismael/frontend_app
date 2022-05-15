<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Donnés utilisateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nom"
                        label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.prenom"
                        label="Prenom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Créer </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Etes-vous sur?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          {{ icons.mdiPencil }}
        </v-icon>
        <v-icon small @click="deleteItem(item)"> {{ icons.mdiDelete }} </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";

export default {
  data: () => ({
    timeout: 2000,
    search: "",
    dialog: false,
    snackbar: false,
    text: "",
    dialogDelete: false,
    headers: [
      { text: "Nom", value: "nom" },
      { text: "Prenom", value: "prenom" },
      { text: "Email)", value: "email" },
      { text: "Actions", value: "actions" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      nom: "",
      prenom: "",
      email: "",
    },
    defaultItem: {
      id: "",
      nom: "",
      prenom: "",
      email: "",
    },
    icons: {
      mdiPencil,
      mdiDelete,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouveau utilisateur"
        : "Edition utilisateur";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          nom: "Vinicius",
          prenom: "Junior",
          email: "vini@gmail.com",
        },
        {
          nom: "Rodrygo",
          prenom: "Goes",
          email: "rodrygo@gmail.com",
        },
        {
          nom: "Benzema",
          prenom: "Karim",
          email: "benzema@gmail.com",
        },
        {
          nom: "Courtois",
          prenom: "Thubaut",
          email: "courtois@gmail.com",
        },
        {
          nom: "Toni",
          prenom: "Kroos",
          email: "toni@gmail.com",
        },
        {
          nom: "Fede",
          prenom: "Valverde",
          email: "fede@gmail.com",
        },
        {
          nom: "Cristianho",
          prenom: "Ronaldo",
          email: "ronaldo@gmail.com",
        },
        {
          nom: "David",
          prenom: "Ancelotti",
          email: "ancelotti@gmail.com",
        },
        {
          nom: "Gareth",
          prenom: "Bale",
          email: "bale@gmail.com",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.text = "Suppression avec success";
      this.snackbar = true;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.text = "Edition avec success";
        this.snackbar = true;
      }
      this.close();
    },
  },
};
</script>