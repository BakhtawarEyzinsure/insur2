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
                                    Add Question
                                </v-toolbar-title>
                                <v-toolbar-title v-else>
                                    Update Question
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-text-field
                                    v-model.lazy="question"
                                    :error-messages="questionErrors"
                                    label="Question "
                                    dense
                                    required
                                    @input="$v.question.$touch()"
                                    @blur="$v.question.$touch()"
                                ></v-text-field>
                                <v-autocomplete
                                    v-model.lazy="categories"
                                    :items="fetchedCategories"
                                    item-text="name"
                                    item-value="id"
                                    dense
                                    chips
                                    small-chips
                                    label="Categories"
                                    multiple
                                    v-show="questionFilled"
                                    required
                                    @input="$v.categories.$touch()"
                                    @blur="$v.categories.$touch()"
                                ></v-autocomplete>
                                <v-autocomplete
                                    v-if="getSubcategories"
                                    v-model.lazy="subcategories"
                                    :items="getSubcategories"
                                    item-text="name"
                                    item-value="id"
                                    dense
                                    chips
                                    small-chips
                                    label="SubCategories"
                                    multiple
                                    v-show="categoryFilled"
                                    required
                                    @input="$v.subcategories.$touch()"
                                    @blur="$v.subcategories.$touch()"
                                ></v-autocomplete>

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
                <v-row v-if="questions">
                    <v-col cols="12">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Id</th>
                                    <th>question</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="question in questions"
                                    :key="question.id"
                                >
                                    <td>{{ question.id }}</td>
                                    <td>{{ question.user_id }}</td>
                                    <td>{{ question.question }}</td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="edit(question)"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="deleteQuest(question)"
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
import { mapMutations } from "vuex";
import NavigationBar from "../components/navigationBar.vue";

export default {
    components: {
        NavigationBar
    },
    mixins: [validationMixin],

    validations: {
        question: {
            required
        },
        categories: {
            required
        },
        subcategories: {
            required
        }
    },
    data() {
        return {
            id: "",
            question: "",
            categories: [],
            subcategories: [],
            questionSubcategories: null,
            questionFilled: false,
            categoryFilled: false,
            showAdd: false
        };
    },

    created() {
        this.loadQuestions();
        this.loadCategories();
    },
    watch: {
        question: function(value) {
            if (value.length > 0) {
                this.questionFilled = true;
            } else {
                this.questionFilled = false;
                this.subcategories = [];
            }
        },

        categories: function(value) {
            if (value.length > 0) {
                this.loadSubcategoriesByCategoriesId({ id: value });
            }
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            questions: "question/getQuestions",
            fetchedCategories: "category/getCategories",
            fetchedSubcategories: "subcategory/getSubcategories"
        }),

        getSubcategories() {
            let subcategories = this.fetchedSubcategories;
            console.log("this.subcategories", this.subcategories);
            console.log("subcategories", subcategories);
            if (subcategories != null) {
                if (subcategories.length > 0) {
                    this.categoryFilled = true;
                    return subcategories;
                } else {
                    return [];
                }
            }
        },

        questionErrors() {
            const errors = [];
            if (!this.$v.question.$dirty) return errors;
            !this.$v.question.required && errors.push("Question is required");
            return errors;
        },

        categoriesErrors() {
            const errors = [];
            if (!this.$v.categories.$dirty) return errors;
            !this.$v.categories.required &&
                errors.push("categories is required");
            return errors;
        },

        subcategoriesErrors() {
            const errors = [];
            if (!this.$v.subcategories.$dirty) return errors;
            !this.$v.subcategories.required &&
                errors.push("subcategories is required");
            return errors;
        }
    },

    methods: {
        ...mapActions({
            loadQuestions: "question/loadQuestions",
            updateQuestion: "question/updateQuestion",
            deleteQuestion: "question/deleteQuestion",
            loadCategories: "category/loadCategories",
            loadSubcategories: "subcategory/loadSubcategories",
            loadSubcategoriesByCategoriesId:
                "subcategory/loadSubcategoriesByCategoriesId",
            addQuestion: "question/addQuestion",
            editQuestion: "question/editQuestion"
        }),
        // ...mapMutations({
        //     setCategories: "category/setCategories", // map `this.add()` to `this.$store.commit('increment')`
        //     setSubcategories: "subcategory/setSubcategories" // map `this.add()` to `this.$store.commit('increment')`
        // }),
        cancel() {
            this.showAdd = false;
            this.$v.$reset();
            this.name = "";
        },
        edit(val) {
            this.categories = val.categories;
            let categories = [];
            if (this.categories.length > 0) {
                this.categories.forEach(element => {
                    categories.push(element.id);
                });
            }
            this.loadSubcategoriesByCategoriesId({ id: categories });
            this.showAdd = true;
            console.log("val", val);
            this.id = val.id;
            this.question = val.question;
            this.subcategories = val.subcategories;
            console.log("categories", categories);

            if (this.subcategories.length > 0) {
                this.categoryFilled = true;
            }

            // console.log("categories ids sent", categories);
            // console.log("this subcategories before", this.subcategories);
            // this.loadSubcategoriesByCategoriesId({ id: categories });
            // console.log("this subcategories after", this.subcategories);
            // console.log("this subcategories val", val.subcategories);
        },
        async update() {
            let categories = [];
            let subcategories = [];
            if (this.categories.length > 0) {
                let type = typeof this.categories[0];
                if (type == "object") {
                    this.categories.forEach(element => {
                        categories.push(element.id);
                    });
                } else {
                    categories = this.categories;
                }
            }

            if (this.subcategories.length > 0) {
                let type = typeof this.subcategories[0];

                if (type == "object") {
                    this.subcategories.forEach(element => {
                        subcategories.push(element.id);
                    });
                } else {
                    subcategories = this.subcategories;
                }
            }

            await this.updateQuestion({
                question: this.question,
                categories: categories,
                subcategories: subcategories,
                user_id: this.currentUser.id,
                id: this.id
            });
            this.showAdd = false;
            this.categoryFilled = false;
            this.id = "";
            this.question = "";
            this.$store.commit("subcategory/setSubcategories", []);
            this.categories = "";
            this.subcategories = "";
            this.loadQuestions();
        },
        async deleteQuest(val) {
            this.id = val.id;
            this.name = val.name;
            await this.deleteQuestion({
                id: this.id,
                name: this.name
            });
            this.showAdd = false;
            this.loadQuestions();
        },
        async submit() {
            await this.addQuestion({
                question: this.question,
                categories: this.categories,
                subcategories: this.subcategories,
                user_id: this.currentUser.id
            });
            this.loadQuestions();
        },

        showAddition() {
            this.$v.$reset();
            this.showAdd = true;
            this.categoryFilled = false;
            this.id = "";
            this.question = "";
            this.$store.commit("subcategory/setSubcategories", []);
            this.categories = "";
            this.subcategories = "";
        }
    }
};
</script>
