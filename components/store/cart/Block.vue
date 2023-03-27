<script setup lang="ts">
import Header from './BlockHeader.vue'
import Content from './Content.vue'
import Footer from './BlockFooter.vue'

interface BlockProps {
  classes: {
    wrapper: string
    innerWrapper: string
    contentWrapper: string
  }
}

withDefaults(defineProps<BlockProps>(), {
  classes: () => ({
    wrapper: 'cart-block-wrapper',
    innerWrapper: 'flex h-screen flex-col divide-y divide-gray-200 bg-white shadow-xl',
    contentWrapper: 'flex-1 overflow-y-auto',
  }),
})
</script>

<template>
  <div :class="classes.wrapper">
    <div :class="classes.innerWrapper">
      <div :class="classes.contentWrapper">
        <slot name="override-header">
          <Header heading="Cart summary" />
        </slot>
        <slot name="override-content">
          <Content />
        </slot>
      </div>
      <slot name="override-footer">
        <Footer />
      </slot>
    </div>
  </div>
</template>
