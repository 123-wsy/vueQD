import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import {allUrl} from "./utils/menus";
import {operatUrl} from "./utils/menus";
//图表
import echarts from 'echarts';
//md编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


Vue.use(ElementUI);

Vue.config.productionTip = false

//做插件
import {getRequest, postRequest, postKeyValueRequest, putRequest, delRequest} from "./utils/api";

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.delRequest = delRequest

Vue.prototype.$echarts = echarts
//路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == "/") {
        next();
    } else {
        if (window.sessionStorage.getItem('user')) {
            if (operatUrl(to, router)) {
                next();
            } else {
                if (allUrl(to, router)) {
                    Message.error({message: '您配么？'});
                } else {
                    Message.error({message: '没这页面'});
                    next('/home');
                }
            }
        } else {
            Message.warning({message: '请登录'});
            next('/')
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
