<template>
  <v-data-table
    :headers="headers"
    :items="forfaits"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Tous les forfaits</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nouveau
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.forfait_name"
                        label="Nom"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.typeData"
                        label="Type de données"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.limiteMax"
                        label="Taille Maximale"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Prix"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.emplacement"
                        label="Emplacement"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.duration"
                        label="Durée"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.extension"
                        label="Extension"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.priceUnit"
                        label="Prix Unitaire"
                        :rules="formRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Sauvegarder </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Etes-vous sûr de supprimer ce forfait?</v-card-title
            >
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
  </v-data-table>
</template>
<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import { mapActions, mapGetters } from "vuex";
import { isRequired } from "@/utils/validators";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Nom", value: "forfait_name" },
      { text: "Type de données", value: "typeData" },
      { text: "Taille Maximal", value: "limiteMax" },
      { text: "Prix", value: "price" },
      { text: "Emplacement", value: "emplacement" },
      { text: "Durée", value: "duration" },
      { text: "Extensions", value: "extension" },
      { text: "Prix Unitaire", value: "priceUnit" },
      { text: "Actions", value: "actions" },
    ],
    forfaits: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      forfait_name: "",
      limiteMax: 0,
      typeData: 0,
      price: 0,
      emplacement: "",
      duration: 0,
      extension: "",
      priceUnit: "",
      actions: 0,
    },
    defaultItem: {
      id: -1,
      forfait_name: "",
      limiteMax: "",
      typeData: 0,
      price: 0,
      emplacement: "",
      duration: 0,
      extension: "",
      priceUnit: "",
      actions: 0,
    },
    icons: {
      mdiPencil,
      mdiDelete,
    },
    formRules: [isRequired()],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouveau Utilisateur"
        : "Edition Utilisateur";
    },
    ...mapGetters("forfait", ["loaded", "getForfaits"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    if (!this.loaded)
      await this.initialize();
  },

  methods: {
    ...mapActions("forfait", ["get_forfaits", "add_forfaits", "edit_forfait"]),
    async initialize() {
      await this.get_forfaits();
      this.forfaits = this.getForfaits;
    },

    async editItem(item) {
      this.editedIndex = this.forfaits.indexOf(item);
      this.editedItem = this.getForfaits;
      this.edit_forfait = await this.edit_forfait({ index: this.editedIndex, data: item});
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.forfaits.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.forfaits.splice(this.editedIndex, 1);
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
    },

    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.forfaits[this.editedIndex], this.editedItem);
        } else {
          await this.add_forfaits({ data: this.editedItem });
          this.forfaits = this.getForfaits;
        }
        this.close();
      }
    },
  },
};
</script>