import { defineStore } from "pinia"
import axios from "axios"
import Swal from 'sweetalert2'

const baseUrl = "https://rentroom-3.arbiihsan.xyz"

export const useLodgingStore = defineStore('lodgings', {
    state: () => {
        return {
            lodgings: [],
            lodgingById: {},
            totalPage: 1,
            currentPage: 1,
            types: [],
            bookmarks: {},
            qrCode: {},
            urlQrCode: ''
        }
    },

    actions: {
        async fetchLodgings(filterByTypeIds = null, searchByLocation = null) {
            try {
                let url = `${baseUrl}/customers/lodgings?page=${this.currentPage}`;

                if (filterByTypeIds && filterByTypeIds.length > 0) {
                    const typeParams = filterByTypeIds.join('&filterByTypeId=');
                    url = `${baseUrl}/customers/lodgings/?filterByTypeId=${typeParams}`;
                }

                if (searchByLocation) {
                    const locationParam = encodeURIComponent(searchByLocation);
                    url = `${baseUrl}/customers/lodgings/?searchByLocation=${locationParam}`;
                }

                if (filterByTypeIds && filterByTypeIds.length > 0 && searchByLocation) {
                    const typeParams = filterByTypeIds.join('&filterByTypeId=');
                    const locationParam = encodeURIComponent(searchByLocation);
                    url = `${baseUrl}/customers/lodgings/?filterByTypeId=${typeParams}&searchByLocation=${locationParam}`;
                }

                const { data } = await axios({
                    method: "GET",
                    url: url
                });

                this.lodgings = data.data;
                this.currentPage = Number(data.currentPage);
                this.totalPage = Number(data.totalPage);
            } catch (err) {
                console.log(err);
            }
        },
        async fetchLodgingsById(id) {
            // console.log(id, "<<<<<di fetchbyid");
            try {
                const { data } = await axios({
                    method: "GET",
                    url: `${baseUrl}/customers/lodgings/${id}`
                })
                // console.log(data.lodging, '<<<di fetch by id');
                this.lodgingById = data.lodging

                this.urlQrCode = `https://rentroom-3-c7683.web.app/customers/lodgings/${data.lodging.id}`
                await this.generateQr()
            } catch (err) {
                console.log(err);
            }
        },
        async fetchType() {
            try {
                // console.log('masuk');
                const { data } = await axios({
                    method: "GET",
                    url: `${baseUrl}/customers/types`,
                });
                this.types = data.types.map((el) => ({
                    id: el.id,
                    name: el.name,
                }));
                // console.log(this.types, '<<<ininih');
            } catch (err) { }
        },
        async addBookmark(id) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/customers/bookmarks/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                // console.log(data), "<<<<di store";
                this.showAddedBookmarkAlert()
            } catch (err) {
                console.log(err);
                this.showBookmarkError(err.response.data.message)
            }
        },
        async fetchBookmarks() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/customers/bookmarks`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.bookmarks = data
                // console.log(data[0]);
            } catch (err) {
                console.log(err);
            }
        },
        async deleteBookmark(id) {
            // console.log(id, "<<<<di store");
            try {
                const { data } = await axios({
                    method: 'DELETE',
                    url: `${baseUrl}/customers/bookmarks/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.fetchBookmarks()
            } catch (err) {
                console.log(err);
            }
        },
        showAddedBookmarkAlert() {
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
                title: 'Bookmark added successfully'
            })
        },
        showBookmarkError(message) {
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
        async generateQr() {
            // console.log('MASUKKK');
            const qr_code_text = this.urlQrCode
            console.log(qr_code_text, '<<<<<DI STOREEE');
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/customers/generate-qr`,
                    data: { qr_code_text }
                })
                console.log(data, "<<<<<ININININI");
                this.qrCode = data
            } catch (err) {
                console.log(err);
            }
        },
    },
})