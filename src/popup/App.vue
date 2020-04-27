<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-toolbar-title>cookie Debugger</v-toolbar-title>
        <v-btn v-on:click="openTab" color="success">Open tab</v-btn>
        <v-btn v-on:click="refreshCookies" color="primary">Refresh Cookies</v-btn>

        <v-card max-width="300" tile>
          <v-list-item two-line v-for="(cookie, index) in savedCookies" :key="index">
            <v-list-item-content>
              <v-list-item-title>Key: {{ cookie.name }}</v-list-item-title>
              <v-list-item-subtitle>Value: {{ cookie.value }}</v-list-item-subtitle>
              <v-list-item-subtitle>Last value: {{ cookie.lastValue }}</v-list-item-subtitle>
              <v-btn x-small v-on:click="moveCookieToTop(index)" color="secondary">Move to Top</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookies: null,
      savedCookies: [],
    };
  },
  mounted() {
    this.refreshCookies();
  },
  methods: {
    refreshCookies() {
      chrome.cookies.getAll({ url: 'http://localhost' }, cookies => {
        // chrome.extension.getBackgroundPage().console.log(cookies);
        console.log(cookies, this.savedCookies);
        cookies.forEach(cookie => {
          let exist = false;
          this.savedCookies.forEach(savedCookie => {
            if (cookie.name === savedCookie.name) {
              if (cookie.value !== savedCookie.value) {
                savedCookie.lastValue = savedCookie.value;
                savedCookie.value = cookie.value;
              }
              exist = true;
            }
          });
          if (!exist) {
            console.log('nie istnieje');
            this.savedCookies.push({
              name: cookie.name,
              lastValue: '',
              value: cookie.value,
            });
          }
        });
      });
    },
    openTab() {
      const newURL = chrome.runtime.getURL('popup/popup.html');
      chrome.tabs.create({ url: newURL });
    },
    moveCookieToTop(index) {
      if (index > 0) {
        this.savedCookies.unshift(this.savedCookies[index]);
        this.savedCookies.splice(index + 1, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
