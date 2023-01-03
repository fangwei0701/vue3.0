import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Element3 from "element3";
import store from "./store";

// 引入fortawesome字体图标库
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// 引入element3样式
import "element3/lib/theme-chalk/index.css";
// 引入全局样式
import "./style/index.scss";

import {
  faRedo as fasRedo,
  faUser as fasUser,
  faAngleUp as fasAngleUp,
  faEnvelope as fasEnvelope,
  faAngleDown as fasAngleDown,
  faCircleUser as fasCircleUser,
  faWindowClose as fasWindowClose,
  faAlignJustify as fasAlignJustify,
  faArrowRightFromBracket as fasArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
const FasIcons = [
  fasRedo,
  fasUser,
  fasAngleUp,
  fasEnvelope,
  fasAngleDown,
  fasCircleUser,
  fasWindowClose,
  fasAlignJustify,
  fasArrowRightFromBracket,
];

library.add(...FasIcons);
createApp(App)
  .use(router)
  .use(store)
  .use(Element3)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
