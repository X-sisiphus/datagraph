<template>
    <div style="height: 100%">
        
        <Row>
            <Col id="switchbar" span="24">
                <!-- 切换项 -->
                <Menu theme="light" active-name="1" style="width: 100%">
                    <MenuItem name="1"  class="menu" @click.native.prevent="goto()">
                        <Icon custom="iconfont icon-shijianduiguanli" />
                        <div>文物知识图谱模型</div>
                    </MenuItem>
                    <MenuItem name="2" class="menu" @click.native.prevent="gogo()">
                        <Icon custom="iconfont icon-zhuanxiangzhutiguanli" />
                        <div>文物知识图谱</div>
                    </MenuItem>
                </Menu>
            </Col>
        </Row>
    </div>
</template>

<script>

export default {
    data() {
        return {
           
        };
    },
    methods: {
        // switchToTeam(){
        //     console.log();
        // }
        goto(){
           this.$router.push({ path: "/home/homepage" });
           setTimeout(() => {
               location.reload()
           }, 100);
            
        },
        gogo(){
             this.$router.push({ path: "/home/dataGraphPage" });
            setTimeout(() => {
               location.reload()
           }, 100);
        },
    },
    mounted() {
        
    },
};
</script>

<style lang="scss" scoped>
#switchTime,
.ivu-menu-item,
.teamsTime {
    font-size: 18px;
}
.iconfont{
    font-weight: bolder;
}
#switchtimebtn {
    float: right;
}
.menu{
    display: flex;
    align-items: center;
}
.data-picker{
    margin: 10px 0 0 0;
    width: 80%;
    padding: 10px;
    border-radius: 4px;
    background-color: #F3F6F9;
    align-items: center;
}
.open-btn{
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    margin: 20px 0;
}
</style>