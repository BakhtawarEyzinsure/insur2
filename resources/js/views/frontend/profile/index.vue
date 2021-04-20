<template>
    <v-app>
        <v-row>
            <v-col cols="12" md="12" lg="2">
                <v-card>
                    <v-snackbar
                        :timeout="timeout"
                        :value="snackbar"
                        color="black"
                    >
                        {{ snackbarText }}
                        <template v-slot:action="{ attrs }">
                            <v-btn
                                color="pink"
                                text
                                v-bind="attrs"
                                @click="snackbar = false"
                            >
                                Close
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12" lg="2">
                <spaces></spaces>
            </v-col>

            <v-col cols="12" md="12" lg="8">
                <v-stepper v-model="e6" vertical v-if="visitor">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Update Profile
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-stepper-step :complete="e6 > 1" step="1">
                        System Credentials
                        <small>Required</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        <v-card class="mb-12 pa-4">
                            <v-text-field
                                v-model.lazy="name"
                                prepend-icon="mdi-rename-box"
                                :error-messages="nameErrors"
                                label=" User"
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

                    <v-stepper-step :complete="e6 > 2" step="2">
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
                                prepend-icon="mdi-map"
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
                    <v-stepper-step :complete="e6 > 3" step="3">
                        Personal details
                    </v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card class="mb-12">
                            <v-text-field
                                v-model.lazy="mobile"
                                prepend-icon="mdi-cellphone"
                                label=" Mobile"
                            ></v-text-field>
                            <v-text-field
                                v-model.lazy="landline"
                                prepend-icon="mdi-phone-classic"
                                label=" LandLine"
                            ></v-text-field>
                        </v-card>
                        <v-btn color="primary" @click="step3">
                            Save
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-col>
            <v-col cols="12" md="12" lg="2">
                <feeds></feeds>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Feeds from "../components/feeds.vue";
import Spaces from "../components/spaces.vue";

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
        name: {
            required
        }
    },

    components: {
        Spaces,
        Feeds
    },
    data() {
        return {
            name: "",
            e6: 1,
            email: "",
            password: "",
            country: "",
            state: "",
            city: "",
            address: "",
            mobile: "",
            landline: "",
            snackbar: false,
            snackbarText: "",
            timeout: 4000,
            visitorId: ""
        };
    },
    created() {
        this.id = this.currentUser.id;
        this.name = this.currentUser.name;
        this.email = this.currentUser.email;
        this.loadCountries();
        this.loadVisitorByUserId({ user_id: this.id });
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
            currentUser: "auth/getActiveUser",
            getCountries: "country/getCountries",
            getStates: "state/getStates",
            getCities: "city/getCities",
            getVisitor: "visitor/getVisitor"
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

        visitor() {
            let visitor = this.getVisitor;
            if (visitor != null) {
                this.visitorId = visitor.id;
                this.country = visitor.country;
                this.state = visitor.state;
                this.city = visitor.city;
                this.address = visitor.address;
                this.mobile = visitor.mobile;
                this.landline = visitor.landline;
                return visitor;
            } else {
                return null;
            }
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
            loadCountries: "country/loadCountries",
            loadStatesByCountryId: "state/loadStatesByCountryId",
            loadCitiesByStateId: "city/loadCitiesByStateId",
            loadVisitorByUserId: "visitor/loadVisitorByUserId",
            updateUser: "user/updateUser",
            updateVisitor: "visitor/updateVisitor"
        }),
        async step1() {
            console.log("step 1 submitted");
            this.e6 = 2;
            await this.updateUser({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {})
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

            await this.updateVisitor({
                id: this.visitorId,
                country_id: country,
                state_id: state,
                city_id: city,
                address: this.address
            })
                .then(response => {})
                .catch(errors => {
                    // console.log(errors);
                });
            // this.updateVisitor({});
        },

        async step3() {
            this.snackbarText = "Profile Updated";
            this.snackbar = true;
            console.log("step 3 submitted");
            this.e6 = 4;
            await this.updateVisitor({
                id: this.visitorId,
                mobile: this.mobile,
                landline: this.landline
            })
                .then(response => {})
                .catch(errors => {
                    // console.log(errors);
                });
        }
    }
};
</script>
