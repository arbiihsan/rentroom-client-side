<template>
    <form @submit.prevent="applyFilter">
        <div class="filter-section">
            <h2>Accommodation Type</h2>
            <div class="type-list">
                <label v-for="tp in types" :key="tp.id">
                    <input type="checkbox" name="type" v-model="filterByTypeId" :value="tp.id">
                    {{ tp.name }}
                </label>
            </div>
        </div>
        <button type="submit" class="detail-bookmark-button"><span class="icon material-symbols-outlined me-2">draw_collage</span> Filter</button>
    </form>
    <form @submit.prevent="applySearch">
        <div class="search-section">
            <h2>Accommodation Location</h2>
            <input v-model="searchByLocation" type="text" id="lodgingLocation" placeholder="Search by location...">
        </div>
        <button type="submit" class="detail-bookmark-button"><span class="icon material-symbols-outlined me-2">travel_explore</span> Search</button>
    </form>
</template>
    
<script>
import { mapState, mapActions } from 'pinia';
import { useLodgingStore } from '../stores/lodgings';
export default {
    data() {
        return {
            searchByLocation: "",
            filterByTypeId: []
        }
    },
    computed: {
        ...mapState(useLodgingStore, ['types'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['fetchType', 'fetchLodgings']),

        // applyFilter(typeId) {
        //     this.$router.push({ path: '/', query: { type: typeId } });
        // },
        applyFilter() {
            // console.log(this.filterByTypeId, '<<<di sidebar');
            this.fetchLodgings(this.filterByTypeId, null)
        },
        applySearch() {
            // console.log(this.filterByTypeId, '<<<di sidebar');
            this.fetchLodgings(null, this.searchByLocation)
        }
    },
    created() {
        this.fetchType()
        // console.log(this.types, "noh");
    }
}
</script>