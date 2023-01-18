export default {
  server: {
    port: 8000, // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://unpkg.com/wavesurfer.js' },
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js',
      },
      {
        src: 'https://unpkg.com/ml5@latest/dist/ml5.min.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8.6/dist/teachablemachine-pose.min.js',
      },
    ],
  },

  // router: {
  //   mode: 'hash'
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // { src: "~/assets/fonts/roboto.css", lang: "css" },
    // { src: '~assets/scss/index.scss', lang: 'scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-wavesurfer.js', mode: 'client' },
    { src: '~/plugins/vue-spinners.js', mode: 'client' },
    { src: '~/plugins/element-ui.js', mode: 'client' },
    { src: '~/plugins/veevalidate.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
  ],

  bootstrapVue: {
    icons: true,
  },

  dayjs: {
    locales: ['en', 'zh-tw'],
    defaultLocale: 'zh-tw',
    defaultTimeZone: 'Asia/Taipei',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    compact: true,
    transpile: ['vue-wave-surfer'],
    transpile: ['vee-validate/dist/rules'],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://api.demo.cc/api',
    env: process.env.ENV,
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
    partner_key: process.env.PARTNER_KEY,
  },

  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      version: 3,
    },
  },

  purge: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],

  axios: {
    baseURL: process.env.BASE_URL,
  },
}
