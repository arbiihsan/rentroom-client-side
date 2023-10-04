<template>
    <section id="login-section">
        <div class="header">
            <h2>Sign In</h2>
        </div>
        <form id="login-form" class="loginRegister" @submit.prevent="onSubmit">
            <input v-model="email" type="text" name="email" placeholder="Email Address" id="login-email"
                class="inputLoginRegister" required>

            <input v-model="password" type="password" name="password" placeholder="Password" id="login-password"
                class="inputLoginRegister" required>

            <button type="submit" class="buttonLoginRegister">Login</button>
            <span class="signin_message">Or Sign In With</span>
            <div id="buttonDiv" class="google_button">
                <GoogleLogin :callback="onGoogleSubmit" />
            </div>
        </form>
        <div class="register">
            <div class="register_message">Don't have an acoount?</div>
            <button class="register_button" id="register-button">
                <RouterLink to="/customers/signup">
                    Sign Up
                </RouterLink>
            </button>
            <RouterLink to="/" class="backToHome">
                Back to home
            </RouterLink>
        </div>
    </section>
</template>
    
<script>
import { useUserStore } from '../stores/users';
import { mapState, mapActions } from 'pinia';
import { RouterLink } from "vue-router";

import axios from "axios";
import { GoogleLogin } from 'vue3-google-login'

const baseUrl = "http://localhost:3000"

export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions(useUserStore, ['login', 'googleLogin']),
        onSubmit() {
            const payload = { email: this.email, password: this.password };
            this.login(payload);
            // this.$router.push("/");
        },
        onGoogleSubmit(response) {
            this.googleLogin(response)
            this.$router.push('/')
        }
    },
    components: {
        RouterLink,
        GoogleLogin
    }
};
</script>