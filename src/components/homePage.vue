<template>
  <Row>
        <KnowledgeGraph />
  </Row>
</template>

<script>
import KnowledgeGraph from './KnowledgeGraph.vue';
export default {
  name: 'homePage',
  components: {
    KnowledgeGraph
  },
  data() {
    return {
      
    };
  },
  mounted() {
  },
  methods: {
  },
  created() {
    
  }
};
</script>

<style lang="scss" scoped>
.carousel-img {
  width: auto;
  height: 360px;
}

.homepageMap {
  width: 100%;
  height: 10hv;
  margin: 0 auto;
  position: relative;
  top: 46px;
}
.timeTip {
  width: 120%;
  min-width: 278px;
  height: 96px;
  border: 1px solid #3991ed;
  border-radius: 5px;
  position: relative;
  top: 30px;
  left: -10%;
  transform: scale(0.8);
}
.recruitment-row {
  height: 23%;
  max-height: 60px;
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.recruitment-logo {
  height: 100%;
  max-height: 60px;
}
.recruitment-content {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}
.recruitment-title {
  font-size: 1rem;
  font-weight: bolder;
}
.recruitment-info {
  margin-top: 6px;
  font-size: 0.8rem;
}
.notice-row {
  display: flex;
  align-items: center;
}
.notice-date {
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.notice-day {
  font-size: 2em;
  font-weight: bolder;
  color: #C4C4C4;
  text-align: center;
}
.notice-ym {
  font-size: 0.8rem;
  color: #C4C4C4;
}
.divider {
  width: 1px;
  height: 2.9em;
  margin: 0 10px ;
  background-color: #e8eaec;
}
.notice-title {
  font-size: 0.9rem;
}
.download-row {
  margin-top: 18px;
  justify-content: space-around;
}
.download-col {
  width: 16%;
  border-radius: 6px;
  background-color: #EFF5FB;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly
}
.download-img {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
}
.download-name {
  position: relative;
  top: 3px;
  z-index: 2;
  font-size: 0.9rem;
}
.teams-card {
  padding: 12px 12px;
  height: 100%;
  ::v-deep .ivu-card {
    height: 100%;
  }
}
.team-title {
  font-size: 14px;
  font-weight: bolder;
  margin-right: 4px;
}
.team-info {
  align-items: center;
  margin-top: 8px;
}
.team-content {
  color: #3991ED;
}
.arrow-warp {
  display: flex;
  cursor: pointer;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.arrow {
  font-size: 3rem;
  color: #3991ED;
}
</style>
