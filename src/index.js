import "./js/common";
import "@assets/css/main.css";
import "@assets/scss/main.scss";

import store from "@//store";

//import Vue from 'vue'
//import 'vue'
//import 'bootstrap/dist/css/bootstrap.min.css'
window.Vue = require("vue");

Vue.component("example-component", require("./components/Example.vue").default);

const app = new Vue({
    data() {
        return {
            component: false,
        };
    },
    el: "#app",
    store,
});
