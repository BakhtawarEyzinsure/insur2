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
            <v-col cols="2">
                <navigation-bar></navigation-bar>
            </v-col>

            <v-col cols="9" v-if="editComponent == true">
                <v-stepper v-model="e6" vertical v-if="agency">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Update Profile
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-stepper-step :complete="e6 > 1" editable step="1">
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
                        Agency details
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
                                label="LandLine"
                            ></v-text-field>
                            <v-text-field
                                v-model.lazy="homepage"
                                prepend-icon="mdi-web-box"
                                label="Homepage"
                            ></v-text-field>
                            <v-text-field
                                v-model.lazy="logo"
                                prepend-icon="mdi-camera-outline"
                                label="Logo"
                            ></v-text-field>
                        </v-card>
                        <v-btn color="primary" @click="step3">
                            Continue
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="e6 > 4" editable step="4">
                        License details
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card class="mb-12 overflow-y-auto" max-height="400">
                            <v-col cols="12">
                                <v-row
                                    v-for="licenseType in getLicenseTypes"
                                    :key="licenseType.id"
                                >
                                    <v-col cols="5">
                                        <!-- {{ licenseType.name }} -->
                                        <v-text-field
                                            :value="licenseType.name"
                                            prepend-icon="mdi-license"
                                            label="License Type"
                                            class="mb-12"
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-autocomplete
                                            v-if="getStates"
                                            v-model.lazy="
                                                licenseState[licenseType.id]
                                            "
                                            :items="getStates"
                                            item-text="name"
                                            item-value="id"
                                            label="License State"
                                            prepend-icon="mdi-map-marker-circle"
                                            class="mb-5"
                                        >
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model.lazy="
                                                licenseNo[licenseType.id]
                                            "
                                            prepend-icon="mdi-license"
                                            label=" License No"
                                            class="mb-12"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-card>
                        <v-btn color="primary" @click="step4()">
                            Save
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="e6 > 5" editable step="5">
                        Add Agents
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card class="mb-12 overflow-y-auto" max-height="400">
                        </v-card>
                        <v-btn color="primary" @click="step5()">
                            Save
                        </v-btn>
                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-col>
            <v-col cols="9" v-else>
                <v-card class="mx-auto" v-if="agency">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Profile
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <strong>Name: </strong> {{ name }} <br />
                        <strong>Email: </strong> {{ email }} <br />
                        <strong>Country: </strong> {{ agency.country.name }}
                        <br />
                        <strong>State: </strong> {{ agency.state.name }} <br />
                        <strong>City: </strong> {{ agency.city.name }} <br />
                        <strong>Address: </strong> {{ agency.address }} <br />
                        <strong>Homepage: </strong> {{ agency.homepage }} <br />
                        <strong>Logo: </strong> {{ agency.logo }} <br />
                    </v-card-text>
                </v-card>
                <v-card class="mt-5">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>
                            Licenses
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>License</th>
                                    <th>License State</th>
                                    <th>License No</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="license in licenses"
                                    :key="license.id"
                                >
                                    <td>{{ license.licenseType.name }}</td>
                                    <td>{{ license.state.name }}</td>
                                    <td>{{ license.license_no }}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="1">
                <v-btn
                    color="success"
                    v-show="editComponent == false"
                    @click="editComponent = !editComponent"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn
                    color="success"
                    v-show="editComponent == true"
                    @click="editComponent = !editComponent"
                    ><v-icon>mdi-view-dashboard</v-icon></v-btn
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
            licenseState: [],
            licenseNo: [],
            country: "",
            state: "",
            city: "",
            address: "",
            mobile: "",
            landline: "",
            license: "",
            homepage: "",
            logo: "",
            snackbar: false,
            snackbarText: "",
            timeout: 4000,
            agencyId: "",
            licenses: ""
        };
    },
    created() {
        this.id = this.currentUser.id;
        this.name = this.currentUser.name;
        this.email = this.currentUser.email;
        this.loadCountries();
        this.loadAgencyByUserId({ user_id: this.id });
        this.loadLicenseTypes();
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
            getStates: "state/getStates",
            getCities: "city/getCities",
            getAgency: "agency/getAgency",
            getLicenseTypes: "licenseType/getLicenseTypes"
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
        agency() {
            let agency = this.getAgency;
            if (agency != null) {
                this.agencyId = agency.id;
                this.country = agency.country;
                this.state = agency.state;
                this.city = agency.city;
                this.address = agency.address;
                this.mobile = agency.mobile;
                this.landline = agency.landline;
                this.homepage = agency.homepage;
                this.logo = agency.logo;
                this.licenses = agency.licenses;
                // this.licenseType = agency.licenses;

                console.log("licenseType", this.licenses);

                // licenseState;
                // licenseNo;

                // let licenseArray = [];
                this.licenses.forEach(license => {
                    this.licenseState[license.licenseType.id] =
                        license.state.id;
                    this.licenseNo[license.licenseType.id] = license.license_no;
                });

                return agency;
            } else {
                return null;
            }
        }
    },
    methods: {
        ...mapActions({
            loadCountries: "country/loadCountries",
            loadStatesByCountryId: "state/loadStatesByCountryId",
            loadCitiesByStateId: "city/loadCitiesByStateId",
            loadAgencyByUserId: "agency/loadAgencyByUserId",
            updateUser: "user/updateUser",
            updateAgency: "agency/updateAgency",
            loadLicenseTypes: "licenseType/loadLicenseTypes",
            updateAgencyLicenses: "agency/updateAgencyLicenses"
        }),
        cancel() {
            this.showAdd = false;
            this.$v.$reset();
            this.name = "";
        },
        async step1() {
            console.log("step 1 submitted");
            this.e6 = 2;
            await this.updateUser({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    this.loadAgencyByUserId({ user_id: this.id });
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },

        async step2() {
            console.log("step 2 submitted");
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

            let licenseState;
            if (typeof this.licenseState == "number") {
                licenseState = this.licenseState;
            } else if (typeof this.licenseState == "object") {
                licenseState = this.licenseState.id;
            }

            let city;
            if (typeof this.city == "number") {
                city = this.city;
            } else if (typeof this.city == "object") {
                city = this.city.id;
            }

            await this.updateAgency({
                id: this.agencyId,
                country_id: country,
                state_id: state,
                license_state: licenseState,
                city_id: city,
                address: this.address
            });
            this.loadAgencyByUserId({ user_id: this.id });
        },

        async step3() {
            this.e6 = 4;
            await this.updateAgency({
                id: this.agencyId,
                mobile: this.mobile,
                landline: this.landline,
                homepage: this.homepage,
                logo: this.logo
            });
            this.loadAgencyByUserId({ user_id: this.id });
        },
        async step4() {
            this.snackbarText = "Profile Updated";
            this.snackbar = true;
            console.log("step 4 submitted");
            this.e6 = 5;

            await this.updateAgencyLicenses({
                agency_id: this.agencyId,
                license_states: this.licenseState,
                license_nos: this.licenseNo
            });

            this.loadAgencyByUserId({ user_id: this.id });
        }
    }
};
</script>
