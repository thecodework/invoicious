import Vue from 'vue'

/** Plugin Imports */
import VueHtml2pdf from 'vue-html2pdf'
import VueCookies from 'vue-cookies'
import VueQuillEditor from 'vue-quill-editor'
import vSelect from 'vue-select'
import VueNumericInput from 'vue-numeric-input';

/** Configure VueQuill Editor */
Vue.use(VueQuillEditor)

/** Configure VueHTML2PDF */
Vue.use(VueHtml2pdf)

/** Configure Cookies Config */
Vue.use(VueCookies)
Vue.$cookies.config('365d')

/** Configure vSelect */
Vue.component('v-select', vSelect)

/** Configure Vue Numeric Input */
Vue.use(VueNumericInput)