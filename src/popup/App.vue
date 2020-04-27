<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-toolbar-title>cookie Debugger</v-toolbar-title>
        <v-btn v-on:click="openTab" color="success">Open tab</v-btn>
        <v-btn v-on:click="listCookies" color="primary">List Cookies</v-btn>

        <v-card max-width="300" tile>
          <v-list-item two-line v-for="cookie in cookies" :key="cookie.name">
            <v-list-item-content>
              <v-list-item-title>Key: {{ cookie.name }}</v-list-item-title>
              <v-list-item-subtitle>Value: {{ cookie.value }}</v-list-item-subtitle>
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
    };
  },
  methods: {
    listCookies() {
      chrome.cookies.getAll({ url: 'http://localhost' }, cookies => {
        chrome.extension.getBackgroundPage().console.log(cookies);
        console.log(cookies);
        this.cookies = cookies;
      });
    },
    openTab() {
      const newURL = chrome.runtime.getURL('popup/popup.html');
      chrome.tabs.create({ url: newURL });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
