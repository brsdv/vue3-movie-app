import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CardMovie from '@/components/CardMovie/CardMovie.vue'

export default {
    name: 'MainPage',
    components: {
        CardMovie
    },
    setup () {
        const store = useStore()
        const dataMovies = computed(() => {
            if (selectedOfType.value === 'movie') return store.getters.movies
            else return store.getters.serials
        })
        const serials = computed(() => store.getters.serials)

        const optionsOfType = ref([
            {
                label: 'Movies',
                value: 'movie'
            },
            {
                label: 'TVs',
                value: 'tv'
            }
        ])
        const optionsOfYear = ref([
            {
                label: 'All',
                value: 'all'
            }
        ])
        const selectedOfType = ref('movie')
        const selectedOfYear = ref('all')

        onMounted(() => {
            getOptionsYear()
            getMovies()
        })

        const getOptionsYear = () => {
            const startYear = 1900
            const currentYear = new Date().getFullYear()
            for (let i = currentYear; i >= startYear; i--) {
                let year = String(i)
                optionsOfYear.value.push({ label: year, value: year })
            }
        }
        const getMovies = () => {
            store.commit('SET_PARAMS_TYPE', selectedOfType.value)
            store.dispatch('getMovies', {
                type: selectedOfType.value,
                year: selectedOfYear.value
            })
        }
        const onSelectedType = (selected) => {
            selectedOfType.value = selected.value
            if (!serials.value.length && selected.value === 'tv') getMovies()
        }
        const onSelectedYear = (selected) => {
            selectedOfYear.value = selected.value
            getMovies()
        }

        return {
            optionsOfType, optionsOfYear, selectedOfType, selectedOfYear, dataMovies,
            onSelectedType, onSelectedYear
        }
    }
}
