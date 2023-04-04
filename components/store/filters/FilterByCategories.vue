<script setup lang="ts">
import { useFilterStore } from 'nuxt-store-core-app/src/store/filters'
import { TreeProps } from 'ant-design-vue'
const filterStore = useFilterStore()
interface Category {
  id: number
  name: { [key: string]: string }
  count: number
  children: Category[]
}

interface CategoryNode {
  key: number
  title: string
  disabled: boolean
  disableCheckbox: boolean
  selectable: boolean
  children: CategoryNode[]
}

const props = defineProps<{
  categories: Category
}>()

const createCategoryNode = (category: Category): CategoryNode => {
  const { id, name, children } = category
  return {
    key: id,
    title: name.en,
    disabled: false,
    disableCheckbox: false,
    selectable: false,
    children: children.map(createCategoryNode),
  }
}

const categories = ref<CategoryNode[]>([])
categories.value = props.categories.children.map(createCategoryNode)

const onTrackedChecked = (checkedKeys: number[]) => {
  filterStore.setCategoryIds(checkedKeys)
  filterStore.apply({
    onScroll: false,
  })
}
</script>

<template>
  <div>
    <CheckboxTree :nodes="categories" :searchable="true" @tracked-checked="onTrackedChecked" />
  </div>
</template>
