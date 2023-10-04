import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'
import Swal from 'sweetalert2'

const baseUrl = "https://rentroom-3.arbiihsan.xyz"

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            isLogged: '' || localStorage.getItem("access_token") ? true : false
        }
    },

    actions: {
        async login(payload) {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/customers/login`,
                    data: payload,
                });
                const { access_token } = data;
                localStorage.setItem("access_token", access_token);
                this.isLogged = true
                router.push("/");
                this.showLoginAlert();
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        async register(payload) {
            try {
                // console.log(payload, '<<<< di stores');
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/customers/register`,
                    data: payload,
                });
                router.push("/customers/signin")
                this.showRegisterAlert()
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        logout() {
            localStorage.clear();
            this.isLogged = false
            this.showLogoutAlert()
        },
        async googleLogin(response) {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/customers/glogin`,
                    headers: {
                        google_token: response.credential
                    },
                })

                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("username", data.username)
                localStorage.setItem("role", data.role)
                localStorage.setItem("id", data.id)

                this.isLogged = true
                this.showLoginAlert();
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        showLoginAlert() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
        },
        showLogoutAlert() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed out successfully'
            })
        },
        showRegisterAlert() {
            Swal.fire({
                icon: 'success',
                title: 'Your Account Has Been Created',
            })
        },
        showLoginError(message) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: message
            })
        },
    },
})