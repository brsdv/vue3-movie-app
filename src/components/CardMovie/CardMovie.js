import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'CardMovie',
    props: ['item', 'type'],
    setup(props) {
        const store = useStore()
        const posterPath = computed(() => store.getters.posterPath)
        const movie = ref(props.item)

        const toDetailPage = computed(() => {
            return { name: 'DetailPage', params: { id: props.item.id } }
        })
        const dateTitleOfType = computed(() => {
            if (props.type === 'movie') return 'Release Date'
            else return 'First Air Date'
        })
        const dateValueOfType = computed(() => {
            if (props.type === 'movie') return props.item.release_date
            else return props.item.first_air_date
        })
        const titleOfType = computed(() => {
            if (props.type === 'movie') return props.item.title
            else return props.item.name
        })
        const getMovieImage = (movie) => {
            if (movie) return `${posterPath.value}${movie}`
            else return require('@/assets/images/no-image.png')
        }

        return {
            movie, toDetailPage, dateTitleOfType, dateValueOfType, titleOfType,
            getMovieImage
        }
    }
}
