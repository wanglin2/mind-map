import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang'

Vue.use(VueI18n)

const i18n = new VueI18n({
  messages,
  locale: 'en', // Set English as default language
  fallbackLocale: 'en' // Fallback to English if a translation is missing
})

export default i18n
