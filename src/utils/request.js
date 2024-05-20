import axios from "axios";
import qs from "querystring";
import router from "@/router";
import { getToken } from "@/utils/auth";
import { Message } from "view-design";

axios.defaults.withCredentials = true;

const app_key = "apple";
const app_secret = "41f339507099d27853abedf9bd10250b566595ef";
const domain = "";

const service = axios.create({
    //TODO baseURL here
    baseURL: "http://localhost:8080",
    transformRequest: [
        (oldData, config) => {
            if (!config["Content-Type"]) {
                config["Content-Type"] = "application/x-www-form-urlencoded";
                return qs.stringify(oldData);
            }
            switch (config["Content-Type"]) {
                case "multipart/form-data":
                    return oldData;
                case "application/json":
                    return JSON.stringify(oldData);
                default:
                    return qs.stringify(oldData);
            }
        },
    ],
    timeout: 60000,
    headers: {
        domain,
        "Access-Control-Allow-Origin" : "true",
        "Access-Control-Allow-Credentials": "true",
        ticket: window.btoa(`${app_key}.${app_secret}`),
    },
    withCredentials: true,
    crossDomain : true,
});

service.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = getToken();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            const { data } = response;
            if (response.request.responseType === "blob") {
                return data;
            }
            // 登录状态无效，跳转至登录页
            if (
                data["code"] === 497 ||
                data["code"] === 498 ||
                data["code"] === 499
            ) {
                router.push({ path: "/login" });
            }
            //TODO 返回码
            switch (data["code"]) {
                case 200:
                    return Promise.resolve(data);
                case 400:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 401:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 403:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 404:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 485:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 497:
                case 498:
                case 499:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                case 500:
                    Message.error(`${data["data"]},请联系管理员`);
                    return Promise.reject(data);
                default:
                    Message.error(`${data['message']},请联系管理员`);
                    // alert(`${data['error_code'] + data['msg']},请联系管理员`)
                    return Promise.reject(data);
            }
        } else if (response.status === 500) {
            Message.error("500系统错误，请联系管理员");
        }
        return response;
    },
    (error) => {
        Message.error("发生未知错误，请联系管理员");
        return Promise.reject(error);
    }
);

export default service;
