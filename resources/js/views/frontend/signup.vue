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
                                    Sign Up
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-text-field
                                    v-model.lazy="name"
                                    prepend-icon="mdi-rename-box"
                                    :error-messages="nameErrors"
                                    label="Name"
                                    required
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                                ></v-text-field>

                                <v-text-field
                                    v-model.lazy="email"
                                    prepend-icon="mdi-email"
                                    :error-messages="emailErrors"
                                    label="E-mail"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                ></v-text-field>

                                <v-text-field
                                    v-model="password"
                                    prepend-icon="mdi-key"
                                    type="password"
                                    :error-messages="passwordErrors"
                                    required
                                    label="Password"
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                ></v-text-field>

                                <v-select
                                    v-model="userType"
                                    :items="userTypes"
                                    prepend-icon="mdi-account"
                                    :error-messages="userTypeErrors"
                                    required
                                    label="User Type"
                                    @input="$v.userType.$touch()"
                                    @blur="$v.userType.$touch()"
                                ></v-select>

                                <v-btn
                                    class="mb-3"
                                    color="primary"
                                    @click="submit"
                                    dark
                                    >Sign Up</v-btn
                                >

                                <br />
                                <v-btn text to="/reset-password">
                                    Forgot Password
                                </v-btn>
                                <br />
                                <v-btn text to="/login"> Login </v-btn>
                                <br />
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
        },
        userType: {
            required
        },
        name: {
            required
        }
    },

    data() {
        return {
            name: "",
            email: "",
            password: "",
            userType: "",
            show1: false,
            showAlert: false,
            selection: [],
            userTypes: ["Agent", "Agency", "Visitor"]
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
            currentUser: "auth/getActiveUser"
        }),

        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push("Name is required");
            return errors;
        },

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
        },

        userTypeErrors() {
            const errors = [];
            if (!this.$v.userType.$dirty) return errors;
            !this.$v.userType.required && errors.push("User Type is required");
            return errors;
        }
    },

    methods: {
        ...mapActions({
            register: "auth/register"
        }),

        async submit() {
            console.log("I am submitted");

            this.$v.$touch();
            this.showAlert = false;

            if (
                !this.$v.email.$invalid ||
                !this.$v.password.$invalid ||
                !this.$v.userType.$invalid ||
                !this.$v.name.$invalid
            ) {
                await this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    type: this.userType
                })
                    .then(response => {})
                    .catch(errors => {});

                if (this.currentUser != null) {
                    if (
                        this.currentUser.type == "super-admin" ||
                        this.currentUser.type == "admin"
                    ) {
                        this.$router.push("/admin");
                    } else if (this.currentUser.type == "agent") {
                        this.$router.push("/agent");
                    } else {
                        this.$router.push("/");
                    }
                } else {
                    this.showAlert = true;
                }
            }
            this.$v.$reset();
            this.email = "";
            this.password = "";
        }
    }
};
</script>
