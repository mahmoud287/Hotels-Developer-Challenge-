<template>
  <div>
    <v-row v-if="filterdHotelsData.length > 0" justify="end" class="px-4">
      <v-col cols="12" md="6" lg="8" class="px-4">
        <v-row justify="space-between">
          <v-col cols="12" lg="2">
            <span class="p-font-style">Toal Nights : {{ totalNights }}</span>
          </v-col>
          <v-col cols="12" md="6" lg="2">
            <v-row justify="end">
              <v-btn small color="#e74c3c" outlined @click="sortBy('name')">Sort by Name</v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" lg="2">
            <v-row justify="end">
              <v-btn
                small
                color="#2980b9"
                class="ml-2"
                outlined
                @click="sortBy('price')"
              >Sort by Price</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="filterdHotelsData.length > 0" no-gutters>
      <v-col cols="12" md="6" lg="4" class="px-4 mb-8">
        <v-card>
          <v-row class="px-5 mb-8">
            <v-col cols="10">
              <v-text-field label="Search by Name" v-model="hotelName"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-5">
            <v-col cols="12">
              <v-slider
                :max="1000"
                :min="10"
                hide-details
                v-model="slider"
                :thumb-size="32"
                label="Price Filter"
                thumb-label="always"
              ></v-slider>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="8" class="px-4">
        <v-card class="px-4">
          <v-row>
            <v-col
              v-for="(hotel, index) in _filterdHotelsData"
              :key="index"
              cols="12"
              md="6"
              lg="4"
            >
              <div class="hotel-card p-font-style">
                <p>Name : {{ hotel.name }}</p>
                <p>Night Price : {{ hotel.price }}</p>
                <p>Total Price : {{ hotel.price * totalNights }}</p>
                <p>City : {{ hotel.city }}</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      slider: 1000,
      hotelName: ''
    }
  },
  computed: {
    ...mapState(['filterdHotelsData', 'totalNights']),

    //filter the "filterdHotelsData" array with price slider and search by name
    _filterdHotelsData() {
      return this.filterdHotelsData.filter(hotel => {
        return (
          hotel.price > 0 &&
          hotel.price <= this.slider &&
          hotel.name
            .toLocaleLowerCase()
            .includes(this.hotelName.toLocaleLowerCase())
        )
      })
    }
  },
  methods: {
    ...mapMutations(['sortBy'])
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.hotel-card {
  border: 1px solid #000;
  padding: 10px 5px;
}
</style>
