import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BalmUI from 'balm-ui' // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus' // BalmJS Team Material Components
import 'balm-ui-css' // BalmJS styles

createApp(App)
    .use(store)
    .use(router)
    .use(BalmUI)
    .use(BalmUIPlus)
    .mount('#app')
