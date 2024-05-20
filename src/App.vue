<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
   
  }),
 mounted() {
        
    },
};

</script>

<style scoped>
  #app {
    background-color: #F3F6F9;
    width: 100%;
    overflow-x: auto;
  }
  #app::-webkit-scrollbar{
    display: none;
  }
</style>
