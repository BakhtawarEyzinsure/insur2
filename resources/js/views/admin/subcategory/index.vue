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
                                    Add Subcategory
                                </v-toolbar-title>
                                <v-toolbar-title v-else>
                                    Update Subcategory
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-select
                                    v-model="category"
                                    :items="fetchedCategories"
                                    item-text="name"
                                    item-value="id"
                                    label="Category"
                                    :error-messages="categoryErrors"
                                    @input="$v.category.$touch()"
                                    @blur="$v.category.$touch()"
                                ></v-select>
                                <v-text-field
                                    v-model.lazy="name"
                                    :error-messages="nameErrors"
                                    label=" Subcategory"
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
                <v-row v-if="fetchedSubcategories">
                    <v-col cols="12">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="subcategory in fetchedSubcategories"
                                    :key="subcategory.id"
                                >
                                    <td>{{ subcategory.id }}</td>
                                    <td>{{ subcategory.name }}</td>
                                    <td>
                                        {{ subcategory.category.name }}
                                    </td>

                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="edit(subcategory)"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="deleteQuest(subcategory)"
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
        },
        category: {
            required
        }
    },
    data() {
        return {
            id: "",
            name: "",
            category: "",
            showAdd: false,
            categories: null,
            category: null
        };
    },

    created() {
        this.loadCategories();
        this.loadSubcategories();
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            fetchedCategories: "category/getCategories",
            fetchedSubcategories: "subcategory/getSubcategories"
        }),
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push("Name is required");
            return errors;
        },

        categoryErrors() {
            const errors = [];
            if (!this.$v.category.$dirty) return errors;
            !this.$v.category.required && errors.push("category is required");
            return errors;
        }
    },
    methods: {
        ...mapActions({
            loadCategories: "category/loadCategories",
            loadSubcategories: "subcategory/loadSubcategories",
            add: "subcategory/add",
            updateSubcategory: "subcategory/updateSubcategory",
            deleteSubcategory: "subcategory/deleteSubcategory"
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
            this.category = val.category.id;
        },
        async update() {
            await this.updateSubcategory({
                id: this.id,
                name: this.name,
                category_id: this.category
            });
            this.showAdd = false;
            this.loadSubcategories();
        },
        async deleteQuest(val) {
            this.id = val.id;
            this.name = val.name;
            await this.deleteSubcategory({
                id: this.id,
                name: this.name
            });
            this.showAdd = false;
            this.loadSubcategories();
        },
        async submit() {
            await this.add({
                name: this.name,
                category_id: this.category
            });
            this.loadSubcategories();
        },
        addSubcategory() {
            this.showAdd = true;
            this.name = "";
            this.id = "";
        },
        showAddition() {
            this.$v.$reset();
            this.showAdd = true;
            this.id = "";
            this.name = "";
        }
    }
};
</script>
