import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { auth } from "../modules/auth.js";
import { question } from "../modules/question.js";
import { category } from "../modules/category.js";
import { subcategory } from "../modules/subcategory.js";
import { answer } from "../modules/answer.js";
import { user } from "../modules/user.js";
import { country } from "../modules/country.js";
import { state } from "../modules/state.js";
import { city } from "../modules/city.js";
import { visitor } from "../modules/visitor.js";
import { agent } from "../modules/agent.js";
import { agency } from "../modules/agency.js";
import { licenseType } from "../modules/licenseType.js";

export default new Vuex.Store({
    modules: {
        auth,
        question,
        category,
        subcategory,
        answer,
        user,
        country,
        state,
        city,
        visitor,
        agency,
        licenseType,
        agent
    }
});
