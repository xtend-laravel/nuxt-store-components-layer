<script setup lang="ts">
import { Container, Swiper, SwiperSlide } from '#components'
import SquareMiniature from '/_nuxt/components/store/product/SquareMiniature.vue'
const props = defineProps<{
  widget: any
}>()

interface CollectionWidget extends Widget {
  params?: {
    limit?: number
    sort?: string
    order?: string
    collection?: string
    hover_effect?: string
    carousel?: {
      enable?: boolean
      items?: number
    }
  }
  items?: any
}

const data = computed(() => props.widget) as Ref<CollectionWidget>
const items = computed(() => data.value?.items.data)
</script>

<template v-if="data">
  BASE COMPONENT ...
  <Container class="mx-auto">
    <div class="relative">
      <Swiper
        :lazy="true"
        :modules="[SwiperNavigation]"
        :slides-per-view="data.params.carousel.items"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      >
        <SwiperSlide v-for="item in items" :key="item.id">
          <SquareMiniature :item="item" />
        </SwiperSlide>
      </Swiper>
      <button type="button" class="swiper-button-prev" />
      <button type="button" class="swiper-button-next" />
    </div>
  </Container>
</template>
