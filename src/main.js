import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import vuetify from './plugins/vuetify';
import 'element-ui/lib/theme-chalk/index.css';
import { Select, Option, Input, InfiniteScroll } from 'element-ui';



Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(InfiniteScroll);


new Vue({
    router,
    vuetify,
    store,
    el:'#app',
    render: h => h(App)
});

import ElementUI from 'element-ui'
   import 'element-ui/lib/theme-chalk/index.css'
   Vue.use(ElementUI)

