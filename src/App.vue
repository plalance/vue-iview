<template>
    <div id="app">
        <div class="app__wrapper">
            <Layout>
                <header class="app__header">
                    <Row>
                        <Col span="8">
                            <Breadcrumb>
                                <BreadcrumbItem to="/">
                                    <Icon type="ios-home-outline"></Icon>
                                    Accueil
                                </BreadcrumbItem>
                                <!--<BreadcrumbItem to="/components/breadcrumb">-->
                                    <!--<Icon type="logo-buffer"></Icon>-->
                                    <!--Components-->
                                <!--</BreadcrumbItem>-->
                                <!--<BreadcrumbItem>-->
                                    <!--<Icon type="ios-cafe"></Icon>-->
                                    <!--Breadcrumb-->
                                <!--</BreadcrumbItem>-->
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <i-col></i-col>
                </header>
                <Layout>
                    <sider>
                        <Menu :active-name="$route.name" theme="dark" width="auto">
                            <MenuItem name="home" to="/">Accueil</MenuItem>
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-paper"/>
                                    Catégorie 1
                                </template>
                                <MenuItem name="home2" to="/home2">Home 2</MenuItem>
                                <MenuItem name="1-2">Lien 2</MenuItem>
                                <MenuItem name="1-3">Lien 3</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-people"/>
                                    Catégorie 2
                                </template>
                                <MenuItem name="2-1">Lien 1</MenuItem>
                                <MenuItem name="2-2">Lien 2</MenuItem>
                            </Submenu>
                        </Menu>
                    </sider>
                    <Content>
                        <div class="app__page">
                            <div class="container">
                                <transition name="slide">
                                    <router-view :key="$route.fullPath"></router-view>
                                </transition>
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    </div>
</template>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import ActionLoader from './Components/ActionLoader';

    import {routes} from "./Router";

    export default {
        name: 'App',
        components: [
            ActionLoader
        ],
        data() {
            return {
                routes: routes,
                companyId: "null",
                version: null,
                navCollapsed: true
            }
        },
        computed: {
            ...mapGetters({
                'appLoader': 'appLoader',
                'actionLoaderStore': 'actionLoader',
                'isAuthenticated': 'isAuthenticated',
                'authenticatedUser': 'authenticatedUser',
                'sideNavCollapsed': 'sideNavCollapsed'
            }),
            isAdmin() {
                console.log("<--- Admin verification --->");
                let is = false;
                let length = this.authenticatedUser.group.length;
                for (let i = 0; i < length; i++) {
                    if (this.authenticatedUser.group[i] === configuration.PROJECT_ADMIN_GROUP_ID) {
                        is = true;
                    }
                }
                console.log("User is Admin :", is);
                console.log("<--- End Admin verification --->");
                return is;
            },
            getProfile() {
                let profile = "(Utilisateur)";
                if (this.isAdmin) {
                    profile = "(Administrateur)"
                }
                return profile;
            }
        },
        mounted() {
            this.updateCompanyId();
            this.loadVersion();
        },
        methods: {
            ...mapActions([
                'toggleSideNav',
                'toggleAppLoader',
                'setSelectedApiType',
                'checkCookie',
                'getClaims'
            ]),
            updateCompanyId() {
                if (this.isAuthenticated) {
                    // If lastCompany Id is still in localstorage
                    if (window.localStorage.getItem('companyId')) {
                        this.companyId = window.localStorage.getItem('companyId');
                    } else {
                        this.companyId = this.authenticatedUser.company_id;
                    }
                }
            },
            loadVersion() {
                let url = "/VERSION";
                axios.get(url).then((response) => {
                    this.version = response.data;
                    if (typeof this.version !== "object") {
                        this.version = null;
                    }
                }).catch((error) => {
                    this.version = null;
                    console.log(error);
                });
            }
        },
        watch: {
            /**
             * Close SideNav on route change
             * */
            '$route': function () {
                this.toggleSideNav(false);
            },
            'companyId': function (value) {
                this.$store.commit('SET_COMPANY_ID', value);
                window.localStorage.setItem('companyId', value);
            },
            'authenticatedUser': function () {
                this.updateCompanyId();
            },
        },
    };
</script>