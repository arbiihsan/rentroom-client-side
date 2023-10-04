<template>
    <nav class="navbar">
        <ul class="nav-links">
            <li>
                <span class="icon material-symbols-outlined me-2">cottage</span>
                <RouterLink to="/" @click="goHome">
                    Home
                </RouterLink>
            </li>
            <li v-if="isLogged">
                <span class="icon material-symbols-outlined me-2">bookmarks</span>
                <RouterLink to="/customers/bookmarks">
                    Bookmark
                </RouterLink>
            </li>
        </ul>
        <div class="logo">
            <img src="../assets/rentroom.png"/>
            <!-- <span class="icon material-symbols-outlined me-2">view_in_ar</span> -->
            <p>Rent Room</p>
        </div>
        <ul class="nav-links">
            <li v-if="!isLogged">
                <span class="icon material-symbols-outlined me-2">login</span>
                <RouterLink to="/customers/signin">
                    Sign In
                </RouterLink>
            </li>
            <li v-if="!isLogged">
                <span class="icon material-symbols-outlined me-2">stylus_note</span>
                <RouterLink to="/customers/signup">
                    Sign Up
                </RouterLink>
            </li>
            <li v-if="isLogged">
                <span class="icon material-symbols-outlined me-2">logout</span>
                <a href="#" @click.prevent="doLogout">Logout</a>
            </li>
        </ul>
    </nav>
</template>
    
<script>
import { RouterLink } from "vue-router";
import { useLodgingStore } from '../stores/lodgings';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from "../stores/users";

export default {
    name: "Navbar",
    methods: {
        ...mapActions(useUserStore, ['logout']),
        ...mapActions(useLodgingStore, ['fetchLodgings']),
        doLogout() {
            this.logout()
            this.$router.push("/");
        },
        goHome() {
            // console.log(this.filterByTypeId, '<<<di sidebar');
            this.fetchLodgings(null, null)
        }
    },
    computed: {
        ...mapState(useUserStore, ['isLogged'])
    },
    components: {
        RouterLink,
    },
};
</script>