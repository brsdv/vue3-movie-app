<template>
    <div class="application">
        <HeaderBlock />
        <div id="content-main">
            <router-view />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import HeaderBlock from '@/components/HeaderBlock/HeaderBlock.vue'

export default {
    components: {
        HeaderBlock
    },
    setup() {
        const store = useStore()
        const getConfiguration = () => store.dispatch('getConfiguration')

        onMounted(() => {
            getConfiguration()
        })
    }
};
</script>

<style lang="scss">
@import 'styles/index';
</style>
