import { createApp } from "vue";
import App from "./App.vue";
import Element3 from "element3";
import store from "./store";
import { router } from "./router";
import { setupShared } from './shared';

// 引入element3样式
import "element3/lib/theme-chalk/index.css";
// 引入全局样式
import "./style/index.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Element3);
setupShared(app);
app.mount('#app');
