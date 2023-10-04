<script>
import { mapActions, mapState } from 'pinia';
import { useLodgingStore } from '../stores/lodgings'
import { RouterLink } from 'vue-router';

export default {
    name: 'Bookmarks',
    computed: {
        ...mapState(useLodgingStore, ['bookmarks'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['fetchBookmarks', 'deleteBookmark']),
        toDetail(id) {
            this.$router.push(`/customers/lodgings/${id}`);
        },
        onDeleteBookmark(id) {
            this.deleteBookmark(id)
        }
    },
    created() {
        this.fetchBookmarks()
    }
}
</script>

<template>
    <!-- <pre>{{ bookmarks }}</pre> -->
    <div class="bookmark-container">
        <div v-if="bookmarks.length === 0">
            <h1>Bookmark Is Empty :(</h1>
        </div>
        <div v-else class="mainbar">
            <h1>Your Bookmarks</h1>
            <section class="bookmarks">
                <div class="card" v-for="lodging in bookmarks" :key="lodging.id" @click="toDetail(lodging.Lodging.id)">
                    <img :src="lodging.Lodging.imgUrl" alt="lodging-image">

                    <div class="name-bookmark">
                        <h3>{{ lodging.Lodging.name }}</h3>
                        <button class="bookmark-button-remove"
                            @click.prevent="onDeleteBookmark(lodging.id); $event.stopPropagation()">
                            <span class="icon material-symbols-outlined me-2">bookmark_remove</span>
                        </button>
                    </div>

                    <p>{{ lodging.Lodging.Type.name }} | {{ lodging.Lodging.location }}</p>
                    <p>Price: {{ lodging.Lodging.price }}</p>
                    <p>{{ lodging.Lodging.facility }}</p>
                </div>
            </section>
        </div>
    </div>
</template>