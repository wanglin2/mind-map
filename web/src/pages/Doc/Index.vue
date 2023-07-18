<template>
  <div class="docContainer">
    <Header></Header>
    <div class="content">
      <Sidebar></Sidebar>
      <div class="doc" ref="doc" id="doc" @scroll="onScroll">
        <router-view></router-view>
      </div>
      <CatalogBar :scrollTop="scrollTop" @scroll="doScroll"></CatalogBar>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import CatalogBar from './components/CatalogBar.vue'
// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/github.css'

export default {
  components: {
    Header,
    Sidebar,
    CatalogBar
  },
  data () {
    return {
      scrollTop: 0,
    }
  },
  methods: {
    doScroll(top) {
      this.$nextTick(() => {
        try {
          this.$refs.doc.scrollTop = top
        } catch (error) {
          console.log(error)
        }
      })
    },

    onScroll() {
      this.scrollTop = this.$refs.doc.scrollTop
    }
  }
}
</script>

<style lang="less">
.docContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Quotes, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  .content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    .doc {
      overflow: auto;
      flex-grow: 1;
      font-weight: 400;
      color: #213547;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      line-height: 1.7;
      padding: 30px;

      h1 {
        margin: 30px 0;
        font-size: 38px;
        line-height: 1.4;
      }

      h2 {
        margin: 20px 0;
        border-top: 1px solid rgba(60, 60, 60, 0.12);
        font-size: 24px;
        padding-top: 10px;
      }

      h3 {
        font-size: 19px;
        margin: 10px 0;
      }

      h4 {
        margin-bottom: 10px;
      }

      p {
        margin-bottom: 20px;
      }

      a {
        font-weight: 500;
        text-decoration: none;
        color: #1ea59a;
        transition: color 0.25s;

        &:hover {
          color: #33a06f;
        }
      }

      pre {
        margin-bottom: 20px;
        border-radius: 5px;
        font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;

        code {
          font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        }
      }

      :not(pre) > code {
        background-color: #f1f1f1;
        padding: 0.15em 0.5em;
        border-radius: 4px;
        color: #476582;
        transition: color 0.5s, background-color 0.5s;
        font-family: Quotes, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
      }

      input[type='checkbox'] {
        margin-right: 5px;
      }

      ul {
        list-style: none;
        padding-left: 1.25rem;

        > li {
          position: relative;
          margin: 1px 0;

          &:before {
            content: '';
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: rgba(60, 60, 60, 0.33);
            transition: background-color 0.5s;
            left: -1.25rem;
            top: 0.75rem;
          }
        }
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
        margin-top: 0.8rem;
        margin-bottom: 1.4rem;
      }

      tr {
        background-color: #fff;
        border-top: 1px solid #ccc;
      }

      th,
      td {
        padding: 5px 14px;
        border: 1px solid #ddd;
      }

      blockquote {
        margin: 1rem 0;
        border-left: 0.2rem solid rgba(60, 60, 60, 0.29);
        padding-left: 1rem;
        transition: border-color 0.5s;

        > p {
          margin: 0;
          font-size: 16px;
          color: rgba(60, 60, 60, 0.7);
          transition: color 0.5s;
        }
      }
    }
  }
}
</style>
