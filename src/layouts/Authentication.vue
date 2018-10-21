<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar>
        <q-toolbar-title>
          Budgeter
        </q-toolbar-title>
        <q-select inverted
          :options="[
            { label: 'English',         value: 'en-us'},
            { label: 'Romana',             value: 'ro' },
          ]"
          v-model="lang"
        />
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      leftDrawer: true,
      lang: this.$q.i18n.lang
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = snakeToCamel(lang)
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
    }
  }
}

function snakeToCamel (str) {
  return str.replace(/(-\w)/g, m => { return m[1].toUpperCase() })
}
</script>

<style>
</style>
