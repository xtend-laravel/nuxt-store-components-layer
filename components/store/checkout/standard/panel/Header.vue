<script setup lang="ts">
import HeadingIcon from './HeadingIcon.vue'
import ChevronUpIcon from '~icons/carbon/chevron-up'
import IconCheck from '~icons/carbon/checkmark-filled'
const props = withDefaults(
  defineProps<{
    step: any
    currentStep: number
    completedStepClasses?: string
    currentStepClasses?: string
    inactiveStepClasses?: string
    panelIconClasses?: string
  }>(),
  {
    completedStepClasses: 'bg-slate-300 text-white',
    currentStepClasses: 'bg-black text-white',
    inactiveStepClasses: 'border bg-slate-50',
    panelIconClasses: 'text-slate-300',
  },
)

// text-[#CFA55B]
</script>

<template>
  <button
    class="flex w-full cursor-pointer items-center justify-between rounded-t-xl p-4"
    :class="[
      currentStep === step.index ? currentStepClasses : inactiveStepClasses,
      step.completed ? completedStepClasses : '',
    ]"
    @click="step.completed ? null : $emit('accordion', step)"
  >
    <span class="flex items-center">
      <HeadingIcon :step="step" />
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
      <IconCheck :class="[step.completed ? '!text-brand-500' : 'text-brand-500']" class="text-brand-500 h-7 w-7" />
    </span>
  </button>
</template>
