<template>
    <div class="detail-container">
        <div class="lodging-details">
            <h3>{{ lodgingById.name }} / {{ lodgingById.Type ? lodgingById.Type.name : 'N/A' }}</h3>

            <img :src="lodgingById.imgUrl" alt="lodging-image">

            <h4>{{ lodgingById.name }} • {{ lodgingById.location }}</h4>

            <div class="details-info">
                <div>
                    <p>Price: {{ lodgingById.price }}</p>
                    <p>Type: {{ lodgingById.Type ? lodgingById.Type.name : 'N/A' }}</p>
                </div>
                <div>
                    <p>Facility: {{ lodgingById.facility }}</p>
                    <p>Lodging's Contact: {{ lodgingById.User ? lodgingById.User.email : 'N/A' }}</p>
                </div>
            </div>

        </div>
        <div class="side-info">
         
            <div class="side-info-qr">
                <h3>Share This Lodging!</h3>
                <div v-html="qrCode"></div>
            </div>
           
        </div>
    </div>
</template>
    
<script>
import { useLodgingStore } from '../stores/lodgings';
import { mapState, mapActions } from 'pinia';

export default {
    name: "LodgingDetail",
    computed: {
        // ...mapState(useLodgingStore, ['lodgings']),
        ...mapState(useLodgingStore, ['lodgingById', 'qrCode'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['fetchLodgingsById']),
    },
    created() {
        const { id } = this.$route.params
        this.fetchLodgingsById(id)
        // console.log(this.qrCode, "<<<<ininihhhh");
    }
};
</script>