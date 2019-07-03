import {Component, Vue} from "vue-property-decorator"
import VueRouter from 'vue-router'
declare var require: any;

import {store} from '../Store';

Vue.use(VueRouter);

import HomePage from "../Pages/Home.vue"
import Home2Page from "../Pages/Home2.vue"
import LoginPage from "../Pages/Login.vue"
import LoginFakePage from "../Pages/LoginFake.vue";
import NotFoundPage from "../Pages/Errors/404.vue"
import {EnumActions} from "../Store/enumActions";

export const routes = [
    {
        path: "/",
        name: "home",
        meta: {
            title: "Accueil",
            admin: false,
            visible: true,
            accessible: true,
            icon: "dashboard",
            requireAuth: false
        },
        component: HomePage
    },
    {
        path: "/home2",
        name: "home2",
        meta: {
            title: "Accueil 2",
            admin: false,
            visible: true,
            accessible: true,
            icon: "dashboard",
            requireAuth: false
        },
        component: Home2Page
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "Se connecter",
            admin: false,
            visible: false,
            accessible: true,
            icon: "person",
            requireAuth: false
        },
        component: LoginPage
    },
    {
        path: "/login/fake",
        name: "loginfake",
        meta: {
            title: "Fake Login",
            admin: false,
            visible: false,
            accessible: true,
            icon: "dashboard",
            requireAuth: false
        },
        component: LoginFakePage
    },
    {
        path: "*",
        name: "not_found",
        meta: {
            title: "Page non trouvée",
            admin: false,
            visible: false,
            accessible: true,
            icon: null,
            requireAuth: false
        },
        component: NotFoundPage
    }
];

export const router = new VueRouter({
    mode: 'history', base: '/', //subdomain
    // mode: 'hash', //subdomain
    routes: routes
});

function goToPage(next, to) {
    document.title = to.meta.title;
    next();
}

router.beforeEach((to, from, next) => {

    store.commit('TOGGLE_APP_LOADER', true);

    if(to.name != "loginfake"){
        // Verify if token is present in cookies
        store.dispatch('checkCookie')
            // Yes, cookie is OK, user can be logged in.
            .then(() => {
                goToPage(next, to);
            })
            .catch(() => {
                store.dispatch(EnumActions.FAKE_LOGIN)
                    .then(() => {
                        console.log("relogin");
                        goToPage(next, to);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            })
    }else{
        // Verify if token is present in cookies
        store.dispatch('checkCookie')
        // Yes, cookie is OK, user can be logged in.
            .then(() => {
                goToPage(next, to);
            })
            // Cookie is not present, user has been logged off.
            .catch(() => {
                if (to.meta.requireAuth === true) {
                    store.dispatch('setLastVisitedPage', to.fullPath);
                    store.dispatch('toastText', [false, "Vous n'êtes pas autorisé à accéder à cette page. Connectez vous."]);
                    next('/login');
                } else {
                    goToPage(next, to);
                }
            });
    }
});

router.afterEach((to, from) => {
    store.commit('TOGGLE_APP_LOADER', false);
});

export default router