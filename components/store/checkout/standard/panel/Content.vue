<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Collapse } from 'vue-collapsed'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
defineProps<{
  step: any
  currentStep: number
}>()
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const handleAccordion = (step: any): void => {
  const lessThanCurrentStep: boolean = step.index < currentStep.value
  const connectedNextStep: boolean = currentStep.value === 0 && step.index === 1
  if (checkoutStore.isAuthenticated && (step.completed || lessThanCurrentStep || connectedNextStep)) {
    checkoutStore.setCurrentStep(step.index)
  }
}
</script>
<template>
  <Collapse
    :when="currentStep === step.index"
    class="v-collapse overflow-hidden !px-10 !pt-4 !pb-10 text-sm text-gray-500"
    :class="{ '!h-full': step.key === 'payment_method' && currentStep === 4 }"
  >
    <Component :is="step.component" :key="step.key" :current-step-key="step.key" />
    <!-- Previous and next buttons either side of the accordion -->
    <div class="flex items-center justify-between text-xs">
      <button
        v-if="step.index > 0"
        class="rounded-full bg-gray-50 py-2 px-4 text-gray-300 hover:bg-gray-100 hover:text-gray-400"
        @click="checkoutStore.setCurrentStep(step.index - 1)"
      >
        Previous
      </button>
      <!-- show only if the step is completed and greater than 1st step -->
      <button
        v-if="step.index > 0"
        class="bg-brand-50 text-brand-500 hover:bg-brand-100 hover:text-brand-600 cursor-pointer rounded-full py-2 px-4 font-semibold"
        :class="{ 'hover:bg-brand-50 cursor-not-allowed opacity-40': !step.completed }"
        @click="checkoutStore.setCurrentStep(step.index + 1)"
      >
        Next
      </button>
    </div>
  </Collapse>
</template>
