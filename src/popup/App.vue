<template>
  <div id="app">
    <v-app>
      <v-app-bar>
        <v-toolbar-title>devStorageManager</v-toolbar-title>
        <v-btn v-on:click="getAllUsersTab" v-if="condition" color="success">Click</v-btn>
      </v-app-bar>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: true,
      tabs: null,
    };
  },
  mounted() {
    chrome.extension.getBackgroundPage().console.log(window);
  },
  methods: {
    getAllUsersTab() {
      chrome.tabs.query({}, tabs => {
        chrome.extension.getBackgroundPage().console.log(tabs);
        // this.tabs = tabs;
        this.filt(tabs);
      });
    },
    filt(tabs) {
      tabs.forEach(tab => {
        if (tab.url && tab.url.includes('google')) {
          chrome.extension.getBackgroundPage().console.log(tab.url, 'znaleziono');
        }
      });
      // chrome.extension.getBackgroundPage().console.log(this.tabs,"??")
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
