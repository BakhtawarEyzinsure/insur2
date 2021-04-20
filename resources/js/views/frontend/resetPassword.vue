<template>
    <v-app>
        <v-row class="justify-center pa-0 ma-0">
            <v-col cols="6">
                <v-row>
                    <v-col cols="11" class="ml-6">
                        <v-alert :value="showAlert" type="error" dismissible>
                            Either Email or Password is Incorrect.
                        </v-alert>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card max-width="500" class="mx-auto">
                            <v-toolbar color="primary" dark>
                                <v-toolbar-title>
                                    Reset Password
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-text-field
                                    v-model.lazy="email"
                                    prepend-icon="mdi-email"
                                    :error-messages="emailErrors"
                                    label="E-mail"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                ></v-text-field>

                                <v-btn
                                    class="mb-3"
                                    color="primary"
                                    @click="submit"
                                    dark
                                    >Reset</v-btn
                                >
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
    mixins: [validationMixin],

    validations: {
        email: {
            email,
            required
        },
        password: {
            required
        }
    },

    data() {
        return {
            email: "",
            password: "",
            show1: false,
            showAlert: false,
            selection: [],
            items: ["Foo", "Bar", "Fizz", "Buzz"]
        };
    },

    getUser: {
        // console.log($store.a.user);
        // console.log(store.state.a.user);
        // console.log(this.$tore.a.user);
        // this.user = this.$store.state.a.user;
        // localStorage.getItem('token')
        // localStorage.setItem("name", "John");
        // localStorage.removeItem("name");
    },

    computed: {
        ...mapGetters({
            getUser: "auth/getUser"
        }),
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push("Must be valid e-mail");
            !this.$v.email.required && errors.push("E-mail is required");
            return errors;
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push("Password is required");
            return errors;
        }
    },

    methods: {
        ...mapActions({
            login: "auth/login"
        }),

        submit() {
            this.$v.$touch();
            this.showAlert = false;

            if (!this.$v.email.$invalid || !this.$v.password.$invalid) {
                this.login({
                    email: this.email,
                    password: this.password
                }).then(response => {
                    let type = this.getUser.type;
                    // let status = this.getUser.status;
                    // if (status == "A") {
                    if (type == "C") {
                        this.$router.push("/club-Dashboard");
                    } else if (type == "T") {
                        this.$router.push("/tourist-Dashboard");
                    } else if (type == "A") {
                        this.$router.push("/admin-Dashboard");
                    } else {
                        // this.$router.push("/login");
                        this.showAlert = true;
                        console.log("i am coming here");
                    }
                    // }
                });
            }
            this.$v.$reset();
            this.email = "";
            this.password = "";
        }
    }
};
</script>
