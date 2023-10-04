<template>
  <div class="mainbar">

    <section class="lodgings">

      <div class="card" v-for="lodging in lodgings" :key="lodging.id" @click.prevent="toDetail(lodging.id)">
        <img :src="lodging.imgUrl" alt="lodging-image">
        
        <div class="name-bookmark">
          <h3>{{ lodging.name }}</h3>
          <button v-if="isLogged" class="bookmark-button" @click.prevent="onAddBookmark(lodging.id); $event.stopPropagation()">
            <span class="icon material-symbols-outlined me-2">bookmark_add</span>
          </button>
        </div>

        <p>{{ lodging.Type.name }} | {{ lodging.location }}</p>
        <p>Price: {{ lodging.price }}</p>
        <p>{{ lodging.facility }}</p>

      </div>

    </section>
    <Pagination :currentPage="currentPage" :totalPage="totalPage" @onChangePage="onChangePage"/>
  </div>
</template>
    
<script>
import Pagination from '../components/Pagination.vue'
import { useLodgingStore } from '../stores/lodgings';
import { useUserStore } from '../stores/users';
import { mapState, mapActions, mapWritableState } from 'pinia';

export default {
  name: "CardLodging",
  components: { Pagination },
  computed: {
    ...mapWritableState(useLodgingStore, ['lodgings', 'currentPage', 'totalPage']),
    ...mapState(useUserStore, ['isLogged'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['fetchLodgings', 'addBookmark']),
    toDetail(id) {
      this.$router.push(`/customers/lodgings/${id}`);
    },
    onChangePage(page) {
      // console.log(page,'masuk');
      this.currentPage = page
      this.fetchLodgings(null, null)
    },
    onAddBookmark(id) {
      this.addBookmark(id)
    }
  },
  created() {
    this.fetchLodgings(null, null)
  }
};
</script>