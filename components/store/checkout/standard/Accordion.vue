<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Collapse } from 'vue-collapsed'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import ChevronUpIcon from '~icons/carbon/chevron-up'
import IconCheck from '~icons/carbon/checkmark-filled'
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const handleAccordion = (step: CheckoutStep): void => {
  const lessThanCurrentStep: boolean = step.index < currentStep.value
  const connectedNextStep: boolean = currentStep.value === 0 && step.index === 1
  if (checkoutStore.isAuthenticated && (step.completed || lessThanCurrentStep || connectedNextStep)) {
    checkoutStore.setCurrentStep(step.index)
  }
}
</script>

<template>
  <div class="mx-auto w-full rounded-2xl bg-white p-2">
    <template v-for="step in steps" :key="step.index">
      <div v-if="!step.hidden" class="shadow sm:rounded-md">
        <div class="my-3 flex-col !space-y-6 rounded-t-xl bg-white">
          <button
            class="flex w-full cursor-pointer items-center justify-between rounded-t-xl p-4"
            :class="[
              currentStep === step.index ? 'bg-[#353F4F] !text-white' : 'bg-brand-50',
              step.completed ? '!bg-brand-400' : '',
            ]"
            @click="handleAccordion(step)"
          >
            <span class="flex items-center">
              <svg
                class="h-6 w-6"
                :class="step.completed ? 'text-white' : 'text-[#CFA55B]'"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <span
                class="ml-2 text-sm font-semibold text-gray-600"
                :class="{ 'text-white': currentStep === step.index || step.completed }"
                v-text="step.title"
              />
            </span>
            <ChevronUpIcon
              v-if="!step.completed"
              :class="[
                currentStep === step.index ? 'rotate-180 transform' : '',
                step.completed ? '!text-white' : 'text-brand-500',
              ]"
              class="text-brand-500 h-5 w-5"
            />
            <span v-else class="rounded-full bg-white">
              <IconCheck
                :class="[step.completed ? '!text-brand-500' : 'text-brand-500']"
                class="text-brand-500 h-7 w-7"
              />
            </span>
          </button>
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
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.v-collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
