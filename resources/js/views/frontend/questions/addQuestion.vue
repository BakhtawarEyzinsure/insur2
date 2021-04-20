<template>
    <v-app>
        <v-row class="justify-center pa-0 ma-0">
            <v-col cols="12">
                <v-card max-width="700" class="mx-auto">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Add Question
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-textarea
                            v-model.lazy="question"
                            label="Question"
                            dense
                            solo
                            max-height="400"
                        ></v-textarea>
                        <v-autocomplete
                            v-model="categories"
                            :items="fetchedCategories"
                            item-text="name"
                            item-value="id"
                            dense
                            chips
                            small-chips
                            label="Categories"
                            multiple
                            v-show="questionFilled"
                        ></v-autocomplete>
                        <v-autocomplete
                            v-if="fetchedSubcategories"
                            v-model="subcategories"
                            :items="fetchedSubcategories"
                            item-text="name"
                            item-value="id"
                            dense
                            chips
                            small-chips
                            label="SubCategories"
                            multiple
                            v-show="categoriesFilled"
                        ></v-autocomplete>

                        <v-btn class="mb-3" color="primary" @click="submit" dark
                            >Save</v-btn
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            question: "",
            categories: [],
            subcategories: [],
            questionSubcategories: null,
            questionFilled: false,
            categoriesFilled: false
        };
    },
    created() {
        this.loadCategories();
    },

    computed: {
        ...mapGetters({
            fetchedCategories: "category/getCategories",
            fetchedSubcategories: "subcategory/getSubcategories",
            currentUser: "auth/getActiveUser"
        })
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
                this.categoriesFilled = true;
            } else {
                this.categoriesFilled = false;
            }
        }
    },
    methods: {
        ...mapActions({
            loadCategories: "category/loadCategories",
            loadSubcategoriesByCategoriesId:
                "subcategory/loadSubcategoriesByCategoriesId",
            addQuestion: "question/addQuestion"
        }),
        async submit() {
            console.log("question", this.question);
            console.log("categories", this.categories);
            console.log("fetched sub categories", this.fetchedSubcategories);
            console.log("sub categories", this.subcategories);

            await this.addQuestion({
                question: this.question,
                categories: this.categories,
                subcategories: this.subcategories,
                user_id: this.currentUser.id
            });

            this.$router.push("/");
        },
        async getSubcategories() {
            await this.loadSubcategoriesByCategoriesId(this.categories);
        }
    }
};
</script>
