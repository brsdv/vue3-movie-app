import { ref, computed } from 'vue'

export default {
    name: 'HeaderBlock',
    setup () {
        const type = ref(0)
        const title = ref('Movie App')
        const getLogo = computed(() => require('@/assets/movie-logo.png'))

        return {
            type, title, getLogo
        }
    }
}
