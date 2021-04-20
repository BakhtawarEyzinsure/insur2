<template>
    <v-app>
        <v-row>
            <v-col cols="2">
                <navigation-bar></navigation-bar>
            </v-col>

            <v-col cols="9" v-if="editComponent == true">
                <v-stepper v-model="e6" vertical v-if="agent">
                    <v-stepper-step :complete="e6 > 1" editable step="1">
                        System Credentials
                        <small>Required</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        <v-card class="mb-12 pa-4">
                            <v-text-field
                                v-model.lazy="name"
                                prepend-icon="mdi-name"
                                :error-messages="nameErrors"
                                label="User"
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
                        </v-card>
                        <v-btn color="primary" @click="step1">
                            Continue
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="e6 > 2" editable step="2">
                        Address
                    </v-stepper-step>

                    <v-stepper-content step="2">
                        <v-card class="mb-12">
                            <v-autocomplete
                                v-model="country"
                                :items="getCountries"
                                item-text="name"
                                item-value="id"
                                label="Country"
                                prepend-icon="mdi-flag"
                            >
                            </v-autocomplete>
                            <v-autocomplete
                                v-if="getStates"
                                v-model="state"
                                :items="getStates"
                                item-text="name"
                                item-value="id"
                                label="State"
                                prepend-icon="mdi-map-marker-circle"
                            >
                            </v-autocomplete>
                            <v-autocomplete
                                v-if="getCities"
                                v-model="city"
                                :items="getCities"
                                item-text="name"
                                item-value="id"
                                label="City"
                                prepend-icon="mdi-map-marker"
                            >
                            </v-autocomplete>
                            <v-text-field
                                v-model.lazy="address"
                                prepend-icon="mdi-home-modern"
                                label="Address"
                            ></v-text-field>
                        </v-card>
                        <v-btn color="primary" @click="step2">
                            Continue
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="e6 > 3" editable step="3">
                        Company Details
                    </v-stepper-step>

                    <v-stepper-content step="3">
                        <v-card class="mb-12">
                            <v-combobox
                                v-model="agency"
                                :items="getAgencies"
                                item-text="name"
                                item-value="id"
                                :hide-no-data="search"
                                :search-input.sync="agencyName"
                                hide-selected
                                label="Agency"
                                prepend-icon="mdi-handshake-outline"
                            >
                            </v-combobox>
                        </v-card>

                        <v-btn color="primary" @click="step3">
                            Continue
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="4">
                        View setup instructions
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            height="200px"
                        ></v-card>
                        <v-btn color="primary" @click="e6 = 1">
                            Continue
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-col>
            <v-col cols="9" v-else>
                <v-card class="mx-auto" v-if="agent">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Profile
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <strong>Name: </strong> {{ name }} <br />
                        <strong>Email: </strong> {{ email }} <br />
                        <strong>Country: </strong> {{ agent.country.name }}
                        <br />
                        <strong>State: </strong> {{ agent.state.name }} <br />
                        <strong>City: </strong> {{ agent.city.name }} <br />
                        <strong>Address: </strong> {{ agent.address }} <br />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="1">
                <v-btn color="success" @click="editComponent = !editComponent"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                >
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
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
            search: "",
            email: "",
            password: "",
            userType: "",
            userTypes: ["Agent"],
            name: "",
            editComponent: false,
            e6: 1,
            country: "",
            state: "",
            city: "",
            address: "",
            agency: "",
            agentId: "",
            agencyName: ""
        };
    },
    created() {
        this.id = this.currentUser.id;
        this.name = this.currentUser.name;
        this.email = this.currentUser.email;
        this.loadCountries();
        this.loadAgencies();
        this.loadAgentByUserId({ user_id: this.id });
    },

    watch: {
        country: function(value) {
            if (value != "undefined") {
                if (typeof value == "number") {
                    this.loadStatesByCountryId({ id: value });
                } else if (typeof value == "object") {
                    this.loadStatesByCountryId({ id: value.id });
                }
            }
        },

        state: function(value) {
            if (value != "undefined") {
                if (typeof value == "number") {
                    this.loadCitiesByStateId({ id: value });
                } else if (typeof value == "object") {
                    this.loadCitiesByStateId({ id: value.id });
                }
            }
        }
    },

    computed: {
        ...mapGetters({
            loginStatus: "auth/getLoginStatus",
            currentUser: "auth/getActiveUser",
            getCountries: "country/getCountries",
            getAgencies: "agency/getAgencies",
            getAgent: "agent/getAgent",
            getStates: "state/getStates",
            getCities: "city/getCities"
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
        },
        agent() {
            let agent = this.getAgent;
            if (agent != null) {
                this.agentId = agent.id;
                this.country = agent.country;
                this.state = agent.state;
                this.city = agent.city;
                this.address = agent.address;
                this.mobile = agent.mobile;
                this.landline = agent.landline;
                this.homepage = agent.homepage;
                this.logo = agent.logo;
                this.licenses = agent.licenses;
                return agent;
            } else {
                return null;
            }
        }
    },
    methods: {
        ...mapActions({
            loadUser: "user/loadUser",
            loadAgentByUserId: "agent/loadAgentByUserId",
            updateUser: "user/updateUser",
            updateAgent: "agent/updateAgent",
            loadCountries: "country/loadCountries",
            loadAgencies: "agency/loadAgencies",
            loadStatesByCountryId: "state/loadStatesByCountryId",
            loadCitiesByStateId: "city/loadCitiesByStateId"
        }),
        cancel() {
            this.showAdd = false;
            this.$v.$reset();
            this.name = "";
        },
        async step1() {
            this.e6 = 2;
            await this.updateUser({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    this.loadAgentByUserId({ user_id: this.id });
                    this.loadUser({ id: this.id });
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },
        async step2() {
            this.e6 = 3;

            let country;
            if (typeof this.country == "number") {
                country = this.country;
            } else if (typeof this.country == "object") {
                country = this.country.id;
            }

            let state;
            if (typeof this.state == "number") {
                state = this.state;
            } else if (typeof this.state == "object") {
                state = this.state.id;
            }

            let city;
            if (typeof this.city == "number") {
                city = this.city;
            } else if (typeof this.city == "object") {
                city = this.city.id;
            }

            await this.updateAgent({
                id: this.agentId,
                country_id: country,
                state_id: state,
                city_id: city,
                address: this.address
            });

            this.loadAgentByUserId({ user_id: this.id });
        },

        async step3() {
            this.e6 = 4;
            console.log("agency", this.agency);
            console.log("agencyName", this.agencyName);
            let agency;
            if (typeof this.agency == "object") {
                agency = this.agency.id;
            } else {
                agency = null;
            }

            if (agency != null) {
                this.agencyName = null;
            }

            await this.updateAgent({
                id: this.agentId,
                agency: agency,
                agencyName: this.agencyName
            });
            this.loadAgentByUserId({ user_id: this.id });
        }
    }
};
</script>
