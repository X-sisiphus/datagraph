<template>
    <v-app class="bg">
        <v-main>
            <v-container py-5>
                <v-layout align-center justify-center py-3>
                    <v-flex xs12 sm8 md4>
                        <v-card flat class="px-2 pb-3 login-card">
                            <v-card-text>
                                <v-layout justify-center pt-2>
                                    <v-avatar size="60px">
                                        
                                    </v-avatar>
                                </v-layout>
                                <v-layout justify-center py-3>
                                    <div class="headline">账户登录</div>
                                </v-layout>
                                <v-tabs centered fixed-tabs v-model="tab">
                                    <v-tabs-slider color="#1E88E5">
                                    </v-tabs-slider>
                                </v-tabs>
                                <v-tabs-items v-model="tab">
                                    <v-form>
                                        <v-text-field
                                            name="username"
                                            label="账号"
                                            type="text"
                                            required
                                            v-model="username"
                                            :rules="usernameRules"
                                        ></v-text-field>
                                        <v-text-field
                                            id="password"
                                            name="密码"
                                            label="密码"
                                            :append-icon="
                                                showPsw
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            "
                                            @click:append="showPsw = !showPsw"
                                            :type="
                                                showPsw ? 'text' : 'password'
                                            "
                                            required
                                            v-model="password"
                                            :rules="passwordRules"
                                        ></v-text-field>
                                    </v-form>
                                    <v-card-actions>
                                        <v-btn
                                            block
                                            depressed
                                            color="info"
                                            @click="loginCommon"
                                            >登录</v-btn
                                        >
                                    </v-card-actions>
                                </v-tabs-items>
                                <div class="func-group">
                                    <a
                                        href="https://i.twt.edu.cn/#/create"
                                        target="_blank"
                                        >注册账号</a
                                    >
                                    <a @click="jumpItwt()"
                                        >忘记密码?</a
                                    >
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
        <div class="footer">
            <div class="copyright">
                <span style="cursor: pointer"
                    ><strong>@</strong>XXXXXXXXXX</span
                >
                / © 2000-{{ getYear() }} /
                <a href="http://www.miibeian.gov.cn/" rel="nofollow"
                    >XXXXXXXX</a
                >
                / xxxxxx
            </div>
        </div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">重置密码</span>
                </v-card-title>
                <v-banner
                    width="85%"
                    style="position: relative; margin: 0 auto"
                    color="red-text"
                >
                    若您已绑定手机号，可通过手机号登录并在个人信息中进行密码修改。<br />
                    若未绑定验证码请联系管理员进行密码重置。
                </v-banner>
                <v-card-text>
                    <!-- <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="姓名"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="学工号"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        关闭
                    </v-btn>
                    <!-- <v-btn color="red" text @click="dialog = false">
                        申请重置密码
                    </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
// import { EventBus } from "@/utils/event-bus.js";
// import { login } from "@/api/common";
// import Message from "@/components/message";
// import { getUrlParam } from "@/utils/common";
// import { setToken, setUid } from "@/utils/auth";
// import normalRoutes from "@/router/normalRoutes";
// import adminRoutes from "@/router/adminRoutes";
export default {
    name: "login",
    data() {
        return {
            dialog: false,
            from: "",
            showPsw: false,
            tab: "",
            username: "",
            usernameRules: [(v) => !!v || "请输入学号"],
            password: "",
            passwordRules: [(v) => !!v || "请输入密码"],
            uid:"",
        };
    },
    methods: {
        jumpItwt() {
           // window.open("https://i.twt.edu.cn/#/login?from=%2Fhome", "_blank", "resizable,scrollbars,status");
        },
        getYear() {
            let date = new Date();
            return date.getFullYear();
        },
        loginCommon() {
           this.$router.push({ path: "/home" });
            // let data = {
            //     username: this.username,
            //     password: this.password,
            //     role: "user",
            // };
            // login(data)
            //     .then((value) => {
            //         this.uid = value.data.uid;
            //         EventBus.$emit("cMsg", this.uid);
            //         this.$Message.success(`登录成功`);

            //         setToken(value.data.token);
            //         setUid(value.data.uid);
            //         sessionStorage.setItem(
            //             "basicInfo",
            //             JSON.stringify(value.data)
            //         );
            //         this.from = getUrlParam("from");
            //         if (this.from) {
            //             this.$router.push({ path: this.from });
            //         } else {
            //             this.$router.push({ path: "/home" });
            //         }
            //     }).catch((value) =>{
            //         console.log(value);
            //         this.$Message.error('登录失败,请检查账号密码是否填写正确')
            //     })
        },
    },
    created() {
        // this.from = getUrlParam("from");
        // sessionStorage.clear();
    },
};
</script>

<style lang="scss" scoped>
div.bg {
    background: #026fce;
    background-image: linear-gradient(
        45deg,
        hsl(170deg, 80%, 70%),
        hsl(190deg, 80%, 70%),
        hsl(250deg, 80%, 70%),
        hsl(3200deg, 80%, 70%)
    );
    overflow: hidden;
    background-size: 200% 200%;
    animation: gradient-move 3s ease alternate infinite;
    .login-card {
        margin-top: 20%;
    }
    .func-group {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        a {
            text-decoration: none;
        }
    }
}
.footer {
    bottom: 30px;
    position: absolute;
    width: 100%;
    text-align: center;
    .copyright {
        position: relative;
        display: inline-block;
        padding: 8px 20px;
        margin: 0 auto;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.5);
        text-align: center;
        max-width: 940px;
        font-size: 14px;
        line-height: 24px;
        a {
            text-decoration: none;
            color: #000;
        }
    }
}
@keyframes gradient-move {
    0% {
        background-position: 0% 0%;
    }
    100% {
        background-position: 100% 100%;
    }
}
</style>

