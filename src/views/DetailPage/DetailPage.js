import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Zoom, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
    name: 'DetailPage',
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const store = useStore()
        const route = useRouter()
        const posterPath = computed(() => store.getters.posterPath)
        const movie = computed(() => store.getters.movie)
        const isTypeMovie = computed(() => store.getters.paramsMovie.type === 'movie')

        const getMovieImage = computed(() => {
            if (movie.value.poster_path) return `${posterPath.value}${movie.value.poster_path}`
            else return require('@/assets/images/no-image.png')
        })
        const getMovieBackdrops = computed(() => movie.value.images?.backdrops.slice(0, 20))
        const getMovieInfo = computed(() => [
            { name: 'title', value: movie.value[isTypeMovie.value ? 'title' : 'name'] },
            { name: 'overview', value: movie.value.overview },
            {
                name: isTypeMovie.value ? 'release date' : 'last air date',
                value: movie.value[isTypeMovie.value ? 'release_date' : 'last_air_date']
            },
            { name: 'genres', value: movie.value.genres },
            { name: 'tagline', value: movie.value.tagline },
            { name: 'status', value: movie.value.status },
            { name: 'popularity', value: movie.value.popularity },
            { name: 'vote average', value: movie.value.vote_average },
            { name: 'vote count', value: movie.value.vote_count },
            { name: 'budget', value: movie.value.budget },
            { name: 'revenue', value: movie.value.revenue }
        ])
        const getMovieCast = computed(() => {
            return movie.value.credits?.cast?.map(item => {
                return {
                    profile_path: item.profile_path,
                    name: item.name,
                    character: item.character,
                    popularity: item.popularity
                }
            })
        })
        const getTableCast = computed(() => {
            return {
                data: getMovieCast.value,
                thead: ['Photo', 'Name', 'Character', 'Popularity'],
                tbody: [{ slot: 'profile_path' }, 'name', 'character', 'popularity']
            }
        })

        onMounted(() => {
            getMovie()
        })

        const getMovie = () => {
            store.commit('SET_PARAMS_ID', route.currentRoute.value.params.id)
            store.dispatch('getMovie')
        }
        const getCastImage = (path) => {
            if (path) return `${posterPath.value}${path}`
            else return require('@/assets/images/no-image-cast.png')
        }

        return {
            posterPath, movie, getMovieImage, getMovieBackdrops, getMovieInfo, getTableCast,
            modules: [Zoom, Navigation, Pagination],
            getCastImage
        }
    }
}
