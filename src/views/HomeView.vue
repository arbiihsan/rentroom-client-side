<script>
import CardLodging from "@/components/CardLodging.vue";
import Sidebar from "@/components/Sidebar.vue";

const baseUrl = "http://localhost:3000"

export default {
  name: 'Home',
  components: {
    CardLodging,
    Sidebar
  }
}
</script>

<template>
  <div class="container">

    <section class="sidebar">
      <Sidebar />
    </section>
    
    <CardLodging />

  </div>
</template>
