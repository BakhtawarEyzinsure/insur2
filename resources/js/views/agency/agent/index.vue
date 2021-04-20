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
                                    Add Agent
                                </v-toolbar-title>
                                <v-toolbar-title v-else>
                                    Update Agent
                                </v-toolbar-title>
                            </v-toolbar>

                            <v-card-text>
                                <v-text-field
                                    v-model.lazy="name"
                                    prepend-icon="mdi-name"
                                    :error-messages="nameErrors"
                                    label=" Agent"
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
                                    label="New Password"
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                ></v-text-field>

                                <!-- <v-select
                                    v-model="userType"
                                    :items="userTypes"
                                    prepend-icon="mdi-account"
                                    :error-messages="userTypeErrors"
                                    required
                                    label="User Type"
                                    @input="$v.userType.$touch()"
                                    @blur="$v.userType.$touch()"
                                ></v-select> -->

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
                <v-row v-if="users">
                    <v-col cols="12">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="edit(user)"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            @click="deleteUser(user)"
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            color="error"
                                            @click="changeStatus(user, 'A')"
                                            v-if="user.status == 'P'"
                                        >
                                            Pending
                                        </v-btn>
                                        <v-btn
                                            color="success"
                                            @click="changeStatus(user, 'P')"
                                            v-if="user.status == 'A'"
                                        >
                                            Active
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
import { required, email } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import NavigationBar from "../components/navigationBar.vue";

export default {
    components: {
        NavigationBar
    },
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
            id: "",
            name: "",
            showAdd: false,
            email: "",
            password: "",
            userType: "",
            selection: [],
            userTypes: ["Agent"]
        };
    },

    created() {
        this.$store.getters.getAgency;
        this.loadAgents();
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            users: "user/getUsers",
            agency: "agency/getUsers"
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
            loadAgents: "user/loadAgents",
            register: "auth/register",
            updateUser: "user/updateUser",
            deleteUser: "user/deleteUser"
        }),
        cancel() {
            this.showAdd = false;
            this.$v.$reset();
            this.name = "";
        },
        edit(val) {
            console.log("val", val);
            this.showAdd = true;
            this.id = val.id;
            this.name = val.name;
            this.email = val.email;
        },
        async submit() {
            this.$v.$touch();
            this.showAlert = false;

            if (
                !this.$v.email.$invalid ||
                !this.$v.password.$invalid ||
                !this.$v.name.$invalid
            ) {
                await this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    type: "agent"
                });
                this.loadAgents();
            }
            this.$v.$reset();
            this.email = "";
            this.password = "";
            this.showAdd = false;
        },
        async update() {
            await this.updateUser({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password
            });
            this.showAdd = false;
            this.loadAgents();
        },
        async delete(val) {
            this.id = val.id;
            this.name = val.name;
            await this.deleteUser({
                id: this.id,
                name: this.name
            });
            this.showAdd = false;
            this.loadAgents();
        },
        addUser() {
            this.showAdd = true;
            this.name = "";
            this.id = "";
        },
        showAddition() {
            this.$v.$reset();
            this.showAdd = true;
            this.id = "";
            this.name = "";
            this.email = "";
        },
        changeStatus(user, status) {
            this.updateUser({
                id: user.id,
                status: status
            });
            this.loadAgents();
        }
    }
};
</script>
