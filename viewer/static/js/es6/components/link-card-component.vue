<script>

import { getSettings, getVocabulary, getVocabularyClasses, getDisplayDefinitions, getEditorData, getStatus, getChangeHistory } from '../vuex/getters';

export default {
  name: 'link-card',
  vuex: {
    getters: {
      settings: getSettings,
    },
    actions: {
    },
  },
  props: [
    "image",
    "linkUrl",
    "linkText",
    "header",
    "text",
  ],
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
  },
  computed: {
    getImage() {
      if (Modernizr.webp) {
        return this.image.replace('.png', '.webp');
      }
      return this.image;
    },
  },
  components: {
  },
  watch: {
  },
  ready() { // Ready method is deprecated in 2.0, switch to "mounted"
    this.$nextTick(() => {
      // Do stuff
    });
  },
};
</script>

<template>
  <div class="panel panel-default link-card" v-bind:class="{'no-link': !linkUrl}">
    <img :src="getImage" />
    <div>
      <div class="content">
        <span class="header">{{ header }}</span>
        <div class="body">{{ text }}</div>
      </div>
      <a v-if="linkUrl" :href="linkUrl" class="card-link">{{ linkText }}</a>
    </div>
  </div>
</template>

<style lang="less">
@import './_variables.less';

.link-card {
  flex-basis: 24%; // To parent
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  &.no-link {
    padding-bottom: 1em;
  }
  img {
    width: 100%;
  }
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5em 1em 0em 1em;
    flex-grow: 1;
    .content {
      display: flex;
      flex-direction: column;
      .header {
        font-weight: bold;
        font-size: 1.1em;
      }
      .body {
        font-size: 14px;
      }
      .body, .header {
        width: 100%;
        text-align: left;
      }
    }
    > a {
      text-align: center;
    }
  }
}

</style>
