import type { App } from 'vue';

// 引入fortawesome字体图标库
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

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
  
  export function setupShared(app: App<Element>) {
    library.add(...FasIcons);
    app.component("fa-icon", FontAwesomeIcon)
  }
  