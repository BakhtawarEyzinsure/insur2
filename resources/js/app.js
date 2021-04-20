require("./bootstrap");
import Vue from "vue";
import App from "./views/App";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import router from "./core/routes";
import store from "./core/store";
import ability from "./core/ability";
import { abilitiesPlugin } from "@casl/vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// new Vue({
//     vuetify
// }).$mount("#app");

// import "@fortawesome/fontawesome-free/css/all.css";
// import Axios from "axios";
// import VueCarousel from "vue-carousel";
// Vue.use(VueCarousel);
// Vue.prototype.$http = Axios;

// import * as VueGoogleMaps from "vue2-google-maps";

// Vue.use(VueGoogleMaps, {
//     load: {
//         key: "AIzaSyCjVPHysoV2vNDelx0A-x1ksaTAi6nXbL8 ",
//         libraries: "places" // necessary for places input
//     }
// });

// const token = localStorage.getItem('token')
// if (token) {
//     Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+ token
// }

// import store from "./store/store";

Vue.use(abilitiesPlugin, ability);

const app = new Vue({
    el: "#app",
    vuetify,
    store,
    router,
    components: { App },
    render: h => h(App)
});
