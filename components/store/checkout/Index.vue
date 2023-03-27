<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Collapse } from 'vue-collapsed'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useCheckoutStore } from '#nuxt-store-core/store/checkout'
import ChevronUpIcon from '~icons/carbon/chevron-up'
import IconCheck from '~icons/carbon/checkmark-filled'
const checkoutStore = useCheckoutStore()
const { steps, currentStep } = storeToRefs(checkoutStore)
const { isCartEmpty } = useCartStore()
const handleAccordion = (step: CheckoutStep): void => {
  const lessThanCurrentStep: boolean = step.index < currentStep.value
  const connectedNextStep: boolean = currentStep.value === 0 && step.index === 1
  if (checkoutStore.isAuthenticated && (step.completed || lessThanCurrentStep || connectedNextStep)) {
    checkoutStore.setCurrentStep(step.index)
  }
}
</script>

<template>
  <section class="bg-blueGray-100 overflow-hidden pt-12 pb-24">
    <div v-if="!isCartEmpty" class="container mx-auto px-4">
      <div
        class="mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 bg-slate-50 py-4 md:mb-20 md:justify-center md:px-10"
      >
        <span
          class="bg-brand-500 hidden h-8 w-8 items-center justify-center rounded-full text-white shadow md:inline-flex"
          >1</span
        >
        <span class="hidden text-black md:inline">Connection</span>
        <span class="bg-brand-500 hidden h-0.5 w-10 md:inline" />
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#353F4F] text-white shadow">2</span>
        <span class="font-semibold text-[#353F4F] md:inline">Shipping Addresses</span>
        <span class="hidden h-0 w-10 border-t-2 border-dashed border-gray-300 md:inline" />
        <span
          class="bg-brand-50 hidden h-8 w-8 items-center justify-center rounded-full border text-black md:inline-flex"
          >3</span
        >
        <span class="hidden text-gray-500 md:inline">Shipping</span>
        <span class="hidden h-0 w-10 border-t-2 border-dashed border-gray-300 md:inline" />
        <span
          class="bg-brand-50 hidden h-8 w-8 items-center justify-center rounded-full border text-black md:inline-flex"
          >4</span
        >
        <span class="hidden text-gray-500 md:inline">Payment</span>
        <span class="text-xl md:hidden"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-3 w-3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
      <div class="border-b border-gray-200 border-opacity-40 pb-4">
        <h1 class="text-2xl font-bold uppercase">Checkout Base</h1>
      </div>
      <div class="-mx-4 mb-16 flex flex-wrap">
        <div class="mb-10 w-full px-4 md:w-7/12 lg:mb-0 lg:w-7/12 xl:w-8/12">
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
        </div>
        <div class="w-full px-4 md:w-5/12 lg:w-5/12 xl:w-4/12">
          <section class="border-base mt-6 min-h-[700px] rounded shadow-lg">
            <h4 class="mb-4 px-4 pt-4 font-medium underline">Order summary</h4>
            <div class="bg-white p-6">
              <div
                class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8"
              >
                <span>Subtotal</span>
                <span class="flex items-center text-base">
                  <span class="mr-2 text-base">$</span>
                  <span>710,70</span>
                </span>
              </div>
              <div
                class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8"
              >
                <span>Shipping</span>
                <span class="flex items-center text-base">
                  <span class="mr-2 text-base">$</span>
                  <span>10,00</span>
                </span>
              </div>
              <div
                class="font-heading mb-3 flex items-center justify-between bg-gray-50 px-4 py-2 font-medium leading-8"
              >
                <span>Total</span>
                <span class="text-brand-600 flex items-center text-base">
                  <span class="mr-2 text-base">$</span>
                  <span>720,70</span>
                </span>
              </div>
            </div>
            <div class="mb-3 px-8">
              <label class="text-brand-500 mb-3 block text-sm">Apply promo code:</label>
              <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="text"
                  placeholder="Enter your promo code here .."
                  class="focus:ring-shadow-none border-brand-500 focus:border-brand-500 relative h-10 w-px flex-auto flex-1 flex-shrink flex-grow rounded-l-md border px-3 text-xs leading-normal focus:outline-none focus:ring-0"
                />
                <div class="-mr-px flex">
                  <!-- Apply button -->
                  <button
                    type="button"
                    class="focus:shadow-outline-brand bg-brand-500 hover:bg-brand-600 focus:border-brand-700 active:bg-brand-700 flex items-center justify-center rounded-r-md border border-transparent px-4 text-xs font-medium leading-6 text-white transition duration-150 ease-in-out focus:outline-none"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Not items in cart -->
      <div class="flex h-full flex-col items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-700">Your cart is empty</h1>
          <p class="text-gray-600">Please add some items to your cart</p>
          <div class="mt-6">
            <NuxtLink
              class="bg-brand-50 text-brand-500 hover:bg-brand-100 hover:text-brand-600 mt-4 cursor-pointer rounded-full py-2 px-4 font-semibold uppercase"
              to="/"
            >
              Continue shopping
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.v-collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
