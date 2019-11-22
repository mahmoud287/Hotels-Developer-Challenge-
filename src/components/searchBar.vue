<template>
  <v-card hover class="px-5 py-8">
    <!-- vuetify grid System -->
    <h2 class="h-font-style mb-4">Search Hotel</h2>
    <v-form v-model="valid" ref="form">
      <v-row justify="space-between" align="center" no-gutters>
        <v-col cols="12" md="4" class="px-5">
          <!-- vuetify Date Picker -->
          <v-menu
            v-model="fromModel"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fromDate"
                :rules="requiredRules"
                label="From :"
                prepend-icon="fas fa-hourglass-start"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fromDate"
              @input="fromModel = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" class="px-5">
          <v-menu
            v-model="toModel"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="toDate"
                :rules="requiredRules"
                label="To :"
                prepend-icon="fas fa-hourglass-end"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="toDate"
              @input="toModel = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" class="px-5">
          <v-btn :loading="loading" @click="_fetchHotelsData" color="success">
            <i class="fas fa-search mr-2"></i>Search
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { bus } from '../main'
export default {
  data() {
    return {
      loading: false,
      fromModel: false,
      fromDate: '2020-10-10',
      toModel: false,
      toDate: '2020-10-15',
      valid: true, //vuetify form validation status
      requiredRules: [v => !!v || 'This field is required'] //vuetify form rules
    }
  },
  methods: {
    ...mapActions(['fetchHotelsData', 'search_on_hotels']),
    //fetch hotels data from the vuex action method and filter it with dates
    _fetchHotelsData() {
      //check if the form is validated or not
      if (this.$refs.form.validate()) {
        this.loading = true
        //first time  will call the api with the "fetchHotelsData" method if not will just filter the array with dates
        const dates = {
          startDate: this.fromDate,
          endDate: this.toDate
        }
        this.hotelsData
          ? this.search_on_hotels(dates)
          : this.fetchHotelsData(dates)
      }
    }
  },
  computed: {
    ...mapState(['hotelsData'])
  },
  created() {
    //listen to bus event from vuex store to stop loading
    bus.$on('stopLoading', () => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss">
.h-font-style {
  font-family: 'Oswald', sans-serif;
  letter-spacing: 1px;
  font-weight: 200;
}
.p-font-style {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
