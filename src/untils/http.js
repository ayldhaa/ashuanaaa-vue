import axios from 'axios'


let http = axios.create({
    // 请求根路径
    baseURL:"http://localhost:8091/",
    // 超时时间
    timeout:5000,
    // 携带认证信息：cookie
    withCredentials:true
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http
