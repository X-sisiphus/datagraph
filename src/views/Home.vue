<template>
    <div class="home">
     <Row>
            <Col span="24" style="height: 10vh">
                <head-bar></head-bar>
            </Col>
        </Row>
        <Row style="">
            <Col span="4" style="background: white">
                <side-bar></side-bar>
            </Col>
            <Col span="20" style="background-color: #f3f6f9">
                <transition class="view">
                    <router-view />
                </transition>
            </Col>
        </Row>  
    </div>
</template>

<script>
import HeadBar from "../components/HeadBar.vue";
import SideBar from "../components/SideBar.vue";
export default {
    name: "home",
    components: {
        HeadBar,
        SideBar,
    },
    data() {
        
    },
    mounted() {
       
    },
};
</script>

<style lang="scss" scoped>
.home {
    font-size: 2rem;
    width: 100%;
     height: auto;
    background-color: #f3f6f9;
}
#sidebar {
    height: 100%;
    background-color: white;
}
.view {
    margin: 24px;
    width: 100%;
    height: 100%;
}

</style>
