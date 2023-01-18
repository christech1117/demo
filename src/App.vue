<template>
  <div id="app" class="spectrum-Site">
    <Navbar />
    <div
      class="spectrum-Site-overlay"
      :class="{ 'is-open': sideBarIsOpen }"
      @click="sideBarToggle"
    />
    <div class="spectrum-Site-header">
      <button class="spectrum-ActionButton spectrum-ActionButton--quiet" @click="sideBarToggle">
        <svg
          class="spectrum-Icon spectrum-Icon--sizeS"
          focusable="false"
          aria-hidden="true"
          aria-label="Show Menu"
        >
          <use xlink:href="#spectrum-icon-18-ShowMenu" />
        </svg>
      </button>
    </div>
    <div class="spectrum-Site-content">
      <!-- <div class="spectrum-Site-sideBar" :class="{ 'is-open': sideBarIsOpen }">
        <router-link class="spectrum-Site-sideBarHeader" to="/">
          <img class="site-logo" alt="" src="./assets/logo.png">
        </router-link>
        <nav class="spectrum-Site-nav">
          <ul class="spectrum-SideNav spectrum-SideNav--multiLevel">
            <li
              class="spectrum-SideNav-item"
              :class="{ 'is-selected': sideBarisSelected('/') }"
            >
              <router-link
                class="spectrum-SideNav-itemLink"
                to="/"
              >
                首頁
              </router-link>
            </li>
            <li
              class="spectrum-SideNav-item"
              :class="{ 'is-selected': sideBarisSelected('/cmt') }"
            >
              <router-link
                class="spectrum-SideNav-itemLink"
                to="/cmt"
              >
                留言轉圖片神器
              </router-link>
            </li>
            <li
              class="spectrum-SideNav-item"
              :class="{ 'is-selected': sideBarisSelected('/video-editor') }"
            >
              <router-link
                class="spectrum-SideNav-itemLink"
                to="/video-editor"
              >
                自動剪輯神器
              </router-link>
            </li>
            <li
              class="spectrum-SideNav-item"
              :class="{ 'is-selected': sideBarisSelected('/auto-subtitle') }"
            >
              <router-link
                class="spectrum-SideNav-itemLink"
                to="/auto-subtitle"
              >
                自動上字幕神器
              </router-link>
            </li>
            <li
              class="spectrum-SideNav-item"
              :class="{ 'is-selected': sideBarisSelected('/privacy-policy') }"
            >
              <router-link
                class="spectrum-SideNav-itemLink"
                to="/privacy-policy"
              >
                隱私權條款
              </router-link>
            </li>
            <li class="spectrum-SideNav-item">
              <a
                class="spectrum-SideNav-itemLink"
                href="https://www.youtube.com/channel/UC7ia-A8gma8qcdC6GDcjwsQ/join"
                rel="noopener"
                target="_blank"
              >
                訂閱六指淵
              </a>
            </li>
            <li class="spectrum-SideNav-item">
              <h2 id="nav-heading-category-2" class="spectrum-SideNav-heading">
                會員
              </h2>
              <ul class="spectrum-SideNav" aria-labelledby="nav-heading-category-2">
                <li
                  class="spectrum-SideNav-item"
                  :class="{ 'is-selected': sideBarisSelected('/login') }"
                >
                  <router-link
                    class="spectrum-SideNav-itemLink"
                    :to="token ? '/member' : '/login'"
                  >
                    {{ token ? '會員中心' : '註冊 / 登入' }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="spectrum-SideNav-item">
              <h2 id="nav-heading-category-2" class="spectrum-SideNav-heading">
                下載
              </h2>
              <ul class="spectrum-SideNav" aria-labelledby="nav-heading-category-2">
                <li class="spectrum-SideNav-item">
                  <a
                    class="spectrum-SideNav-itemLink"
                    href="/RamPos_Bounce_66_[SIXVFX].ffx"
                    target="_blank"
                    rel="noopener"
                  >
                    AE留言彈跳效果預設檔
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div> -->
      <div class="spectrum-Site-mainContent">
        <div class="spectrum-Site-mainContainer">
          <article class="spectrum-CSSComponent">
            <router-view />
          </article>
        </div>
        <div class="spectrum-Site-footerContainer">
          <Divider size="small" />
          <footer>
            <p class="spectrum-Code--S">
              demo為六指淵創辦之品牌
            </p>
            <p class="spectrum-Code--S">
              宗旨為『透過工具賜與創作者超能力』
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import '@spectrum-css/button/dist/index-vars.css';
import '@spectrum-css/sidenav/dist/index-vars.css';
import '@spectrum-css/site/dist/index-vars.css';

import Cookies from 'js-cookie';
import Divider from '@/components/Divider.vue';
import axios from 'axios';

import Navbar from '@/components/Navbar.vue';

export default Vue.extend({
  components: {
    Divider,
    Navbar,
  },
  data() {
    return {
      sideBarIsOpen: false,
      token: Cookies.get('authToken'),
    };
  },
  watch: {
    $route() {
      this.sideBarIsOpen = false;
    },
  },
  mounted() {
    axios.post('https://rest.lodestar.cc/v1/auth/refresh-token', { appId: 'demo' }).then((response) => {
      const { data } = response;
      if (data.code === 'SUCCESS') {
        Cookies.set('authToken', data.result.authToken);
      }
    });
  },
  methods: {
    sideBarToggle() {
      this.sideBarIsOpen = !this.sideBarIsOpen;
    },
    sideBarisSelected(path) {
      return this.$router.currentRoute.fullPath === path;
    },
  },
});
</script>
