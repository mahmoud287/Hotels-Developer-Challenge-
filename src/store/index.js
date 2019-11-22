import Vue from 'vue'
import Vuex from 'vuex'
import { bus } from '../main'
Vue.use(Vuex)

import axios from 'axios'

// js Date and Time library
var moment = require('moment')

export default new Vuex.Store({
  // hotelsData --> all hotels data.
  // filterdHotelsData --> hotels data filterd with the Two Dates.

  state: { hotelsData: null, filterdHotelsData: [], totalNights: null },
  mutations: {
    setHotelsData(state, payloads) {
      state.hotelsData = payloads
    },
    setHotelsFilterd(state, payload) {
      state.filterdHotelsData.push(payload)
    },
    //to empity the filterd array when we repeating the search
    setHotelsFilterdToDefault(state) {
      state.filterdHotelsData.length = 0
    },
    setTotalNights(state, payload) {
      state.totalNights = payload
    },
    sortBy(state, payload) {
      state.filterdHotelsData.sort((a, b) => {
        if (payload == 'name') {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
        } else if (payload == 'price') {
          if (a.price < b.price) return -1
          if (a.price > b.price) return 1
        }
      })
    }
  },
  actions: {
    //fetch Hotels Data with axios then calling the "search_on_hotels" Method to filter data with dates
    fetchHotelsData({ commit, dispatch }, payloads) {
      axios
        .get('https://api.myjson.com/bins/tl0bp')
        .then(res => {
          commit('setHotelsData', res.data.hotels)

          dispatch('search_on_hotels', payloads)
        })
        .catch(err => {
          console.log('TCL: fetchHotelsData -> err', err)
        })
    },
    //empity the filterd array then filter data with dates using Moment js
    search_on_hotels({ commit, state }, payloads) {
      commit('setHotelsFilterdToDefault')

      let startDate = moment(payloads.startDate, 'YYYY/MM/DD')
      let endDate = moment(payloads.endDate, 'YYYY/MM/DD')

      state.hotelsData.forEach(hotel => {
        hotel.availability.forEach(res => {
          if (
            startDate - moment(res.from, 'DD/MM/YYYY') >= 0 &&
            endDate - moment(res.to, 'DD/MM/YYYY') <= 0
          )
            commit('setHotelsFilterd', hotel)
        })
      })

      //get total nights by calculate number of days between two dates
      commit('setTotalNights', endDate.diff(startDate, 'days'))

      //emit bus event to stop loading in the searchBar component
      bus.$emit('stopLoading')
    }
  }
})
