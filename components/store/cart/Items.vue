<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '#nuxt-store-core/store/cart'
import { useExtendedCartStore } from '~/store/cart'
import Header from '~/components/store/cart/Header.vue'
const cartStore = useExtendedCartStore()
const { isCartEmpty, items, totals } = useCartStore()
const { formatPrice } = useFormattedPrice('EUR')
const { currentPage, drawerOpen } = storeToRefs(useExtendedCartStore())

const getFormattedPrice = (price: Ref<number> | number): string => {
  const priceValue = isRef(price) ? price.value : price
  return formatPrice(priceValue, 0, 1000).value
}
</script>

<template>
  <div>
    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <div class="flow-root">
        <ul class="-my-8">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
          >
            <div class="relative shrink-0">
              <span
                class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2"
              >
                {{ item.quantity }}
              </span>
              <img class="h-24 w-24 max-w-full rounded-lg object-cover" :src="item.product.images.thumbnail" alt="" />
            </div>

            <div class="relative flex flex-1 flex-col justify-between">
              <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                <div class="pr-8 sm:pr-5">
                  <p class="text-base font-semibold text-gray-900" v-text="item.product.name.en" />
                </div>

                <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                  <p class="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                    {{ getFormattedPrice(item.total) }}
                  </p>
                </div>
              </div>

              <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                <button
                  type="button"
                  class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                      class=""
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> -->

      <div class="mt-6 space-y-3 border-t border-b py-8">
        <div class="flex items-center justify-between">
          <p class="text-gray-400">Subtotal</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ getFormattedPrice(totals.sub_total) }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-gray-400">Shipping</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ getFormattedPrice(totals.shipping_total) }}
          </p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Total</p>
        <p class="text-2xl font-semibold text-gray-900">
          {{ getFormattedPrice(totals.total) }}
        </p>
      </div>
      <!-- @todo Split into more components ItemsLine | ItemsSummary | ItemsFooter -->
      <slot name="override-footer">
        <div v-if="currentPage !== 'checkout'" class="mt-6 text-center">
          <NuxtLink
            to="checkout"
            class="bg-brand-600 group inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
          >
            Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-4 h-6 w-6 transition-all group-hover:ml-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </slot>
    </div>
  </div>
</template>
