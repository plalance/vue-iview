<template>
    <div>
        <div class="row">
            <div class="dashboard">
                <h1>Accueil Maquette</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Inject} from 'vue-property-decorator'
    import {mapGetters, mapActions} from 'vuex';

    @Component({
        computed: {
            ...mapGetters([
                'isAuthenticated'
            ])
        },
        methods: {
            ...mapActions([]),
        },
        components: {}
    })
    export default class Home extends Vue {

        logoutAction() {
            this.$store.dispatch('authLogout')
                .then((resp) => {
                    console.log(resp);
                    this.$router.push('/')
                }).catch((err) => {
                console.log(err);
            })
        }
    };
</script>