<template>
    <div class="pagination-container">
        <ul class="pagination">
            <li v-for="(el, index) in new Array(this.totalPage)" :class="{ active: index + 1 === currentPage }">
                <a href="#" @click.prevent="changePage(index + 1)">
                    {{ index + 1 }}
                </a>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: "Pagination",
    emits: ["onChangePage"],
    props: ["currentPage", "totalPage"],
    methods: {
        changePage(page) {
            this.$emit("onChangePage", page)
        }
    }
}
</script>

