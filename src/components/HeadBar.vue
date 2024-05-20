<template>
    <Row class="head">
        <Col span="3" style="height: 100%;display:flex;align-items: center;justify-content: center"> <img src="../assets/png/TJULOGO.svg" class="LOGOimg" @click="toHome" /> </Col>
        <Col span="19" style="display: flex;align-items: center">
            <div class="divider"></div>
            <div>文物知识图谱平台</div>
        </Col>
        <Col span="2">
            <Button type="primary" ghost @click="logOut"> 退出系统 </Button>
        </Col>
    </Row>
</template>

<script>
export default {
    name: "HeadBar",
    data() {
        return {};
    },
    methods: {
        logOut() {
            this.$Modal.confirm({
                title: "登出",
                content: "您确认要退出吗?",
                onOk: () => {
                    this.$router.push("/Login");
                },
                onCancel: () => {
                    this.$Modal.remove();
                },
            })
        },
        toHome(){
            this.$router.push("/Home/homepage")
        }
    },
};
</script>

<style lang="scss" scoped>
.LOGOimg{
    height: 70%;
    cursor: pointer;
}
.head {
    width: 100%;
    height: 100%;
    max-height: 10vh;
    background-color: white;
    color: #3991ed;
    line-height: 10vh;
    text-align: left;
    font-size: 24px;
    font-family: Microsoft YaHei-Bold;
    font-weight: bolder;
}
.divider{
    height: 50%;
    width: 2px;
    background-color: #E5E5E5;
    display: inline-block;
    margin: 0 10px;
}
</style>