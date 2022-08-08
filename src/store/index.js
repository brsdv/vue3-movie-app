import { createStore } from 'vuex'
import { getApi } from '@/api'

export default createStore({
    state: {
        configuration: {},
        posterPath: '',
        movies: [],
        serials: [],
        movie: {},
        paramsMovie: {
            id: localStorage.idMovie ? JSON.parse(localStorage.idMovie) : '',
            type: localStorage.typeMovie ? JSON.parse(localStorage.typeMovie) : ''
        }
    },
    getters: {
        configuration(state) {
            return state.configuration
        },
        posterPath(state) {
            return state.posterPath
        },
        movies(state) {
            return state.movies
        },
        serials(state) {
            return state.serials
        },
        movie(state) {
            return state.movie
        },
        paramsMovie(state) {
            return state.paramsMovie
        }
    },
    mutations: {
        SET_CONFIGURATION(state, data) {
            state.configuration = data
        },
        SET_POSTER_PATH(state, data) {
            state.posterPath = `${data.secure_base_url}${data.poster_sizes[4]}`
        },
        SET_MOVIES(state, data) {
            state.movies = data.results.slice(0, 10)
        },
        SET_SERIALS(state, data) {
            state.serials = data.results.slice(0, 10)
        },
        SET_MOVIE(state, data) {
            state.movie = data
        },
        SET_PARAMS_ID(state, data) {
            state.paramsMovie.id = data
            localStorage.idMovie = JSON.stringify(data)
        },
        SET_PARAMS_TYPE(state, data) {
            state.paramsMovie.type = data
            localStorage.typeMovie = JSON.stringify(data)
        }
    },
    actions: {
        async getConfiguration({ commit }) {
            await getApi('get', 'configuration', {},
                response => {
                    commit('SET_CONFIGURATION', response.data)
                    commit('SET_POSTER_PATH', response.data.images)
                }
            )
        },
        async getMovies({ commit }, { type, year }) {
            if (year === 'all') year = ''
            const yearParam = type === 'movie' ? `primary_release_year=${year}` : `first_air_date_year=${year}`
            await getApi('get', `discover/${type}/?${yearParam}&certification=G&sort_by=vote_average.desc`, {},
                response => {
                    if (type === 'movie') commit('SET_MOVIES', response.data)
                    else commit('SET_SERIALS', response.data)
                }
            )
        },
        async getMovie({ commit, state }) {
            await getApi('get', `${state.paramsMovie.type}/${state.paramsMovie.id}?append_to_response=images,credits`, {},
                response => {
                    commit('SET_MOVIE', response.data)
                }
            )
        }
    }
})
