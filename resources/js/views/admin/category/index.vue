<template>
    <v-app>
        <v-row>
            <v-col cols="2">
                <navigation-bar></navigation-bar>
            </v-col>

            <v-col cols="9">
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            height="40"
                            color="primary"
                            @click="showAddition"
                        >
                            <v-icon>mdi-plus</v-icon> Add
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row v-show="showAdd">
                    <v-col cols="12">
                        <v-card max-width="500" class="mx-auto">
                            <v-toolbar color="primary" dark>
                                <v-toolbar-title v-if="id == ''">
                                    Add Category
                                </v-toolbar-title>
                                <v-toolbar-title v-else>
                                    Update Category
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-text-field
                                    v-model.lazy="name"
                                    prepend-icon="mdi-name"
                                    :error-messages="nameErrors"
                                    label=" Category"
                                    required
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                                ></v-text-field>

                                <v-btn
                                    v-if="id == ''"
                                    class="mb-3 ml-5"
                                    color="primary"
                                    @click="submit"
                                    dark
                                    >Save</v-btn
                                >
                                <v-btn
                                    v-else
                                    class="mb-3 ml-5"
                                    color="primary"
                                    @click="update"
                                    dark
                                    >Update</v-btn
                                >
                                <v-btn
                                    class="mb-3 ml-5"
                                    color="primary"
                                    @click="cancel"
                                    dark
                                    >Cancel</v-btn
                                >

                                <br />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="Categories">
                    <v-col cols="12">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="Category in Categories"
                                    :key="Category.id"
                                >
                                    <td>{{ Category.id }}</td>
                                    <td>{{ Category.name }}</td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="edit(Category)"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="deleteCategory(Category)"
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-col cols="2" style="border: 1px black solid;">
                feeds
            </v-col> -->
        </v-row>
    </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import NavigationBar from "../components/navigationBar.vue";

export default {
    components: {
        NavigationBar
    },
    mixins: [validationMixin],

    validations: {
        name: {
            required
        }
    },
    data() {
        return {
            id: "",
            name: "",
            headers: [
                { text: "Id", value: "id" },
                { text: "Name", value: "name" },
                { text: "Edit", value: "edit" },
                { text: "Delete", value: "delete" }
            ],
            showAdd: false
        };
    },

    created() {
        this.loadCategories();
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            Categories: "category/getCategories"
        }),
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push("Name is required");
            return errors;
        }
    },
    methods: {
        ...mapActions({
            loadCategories: "category/loadCategories",
            add: "category/add",
            updateCategory: "category/updateCategory",
            deleteCategory: "category/deleteCategory"
        }),
        cancel() {
            this.showAdd = false;
            this.$v.$reset();
            this.name = "";
        },
        edit(val) {
            this.showAdd = true;
            this.id = val.id;
            this.name = val.name;
        },
        async update() {
            await this.updateCategory({
                id: this.id,
                name: this.name
            });
            this.showAdd = false;
            this.loadCategories();
        },
        async deleteCategory(val) {
            this.id = val.id;
            this.name = val.name;
            await this.deleteCategory({
                id: this.id,
                name: this.name
            });
            this.showAdd = false;
            this.loadCategories();
        },
        async submit() {
            await this.add({
                name: this.name
            });
            this.loadCategories();
        },
        addCategory() {
            this.showAdd = true;
            this.name = "";
            this.id = "";
        },
        showAddition() {
            this.$v.$reset();
            this.showAdd = true;
            this.id = "";
            this.name = "";
            console.log("id", this.id);
        }
    }
};
</script>
