<script setup lang="ts"></script>

<template>
  <div
    class="mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 bg-slate-50 py-4 md:mb-20 md:justify-center md:px-10"
  >
    <span class="bg-brand-500 hidden h-8 w-8 items-center justify-center rounded-full text-white shadow md:inline-flex"
      >1</span
    >
    <span class="hidden text-black md:inline">Connection</span>
    <span class="bg-brand-500 hidden h-0.5 w-10 md:inline" />
    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#353F4F] text-white shadow">2</span>
    <span class="font-semibold text-[#353F4F] md:inline">Shipping Addresses</span>
    <span class="hidden h-0 w-10 border-t-2 border-dashed border-gray-300 md:inline" />
    <span class="bg-brand-50 hidden h-8 w-8 items-center justify-center rounded-full border text-black md:inline-flex"
      >3</span
    >
    <span class="hidden text-gray-500 md:inline">Shipping</span>
    <span class="hidden h-0 w-10 border-t-2 border-dashed border-gray-300 md:inline" />
    <span class="bg-brand-50 hidden h-8 w-8 items-center justify-center rounded-full border text-black md:inline-flex"
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
</template>
