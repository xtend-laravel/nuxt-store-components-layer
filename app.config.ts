export default defineAppConfig({
  componentsLayer: {
    name: 'Nuxt store component layer',
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
