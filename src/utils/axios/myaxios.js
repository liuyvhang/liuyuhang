import Vue from 'vue'
import allApi from './allApi'
import axios from 'axios'
import {
  Loading,
  MessageBox
} from 'element-ui';

const baseURL = process.env.BASE_API

var instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

var xhr = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      // const loadingInstance = Loading.service({
      //   text: '请稍等',
      //   target: document.querySelector('.loading'),
      // })
      axios({
        method: 'post',
        url: baseURL + allApi[url],
        params: params,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        cancelToken: source.token,
        transformRequest: [function (params) {
          let ret = ''
          for (let it in params) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
          }
          return ret
        }],
      }).then(res => {
        if (res.data.code != 200) {
          MessageBox.alert(res.data.msg)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
        console.log(err)
      })
      // loadingInstance.close();
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      // console.log(params)
      // const loadingInstance = Loading.service({})
      instance.post(allApi[url], params, {
          cancelToken: source.token
        })
        .then(res => {
          // loadingInstance.close()
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      // loadingInstance.close();
    })
  },
  postApp(url, params) {
    return new Promise((resolve, reject) => {
      // const loadingInstance = Loading.service({
      //   text: '请稍等',
      //   target: document.querySelector('.loading'),
      // })
      axios({
        method: 'post',
        url: "http://api.59isport.com:8771/" + allApi[url],
        // url: "/Api/" + allApi[url],
        params: params,
        headers: {
          'Content-type': 'application/json'
        },
        cancelToken: source.token,
      }).then(res => {
        if (res.data.code != 200) {
          MessageBox.alert(res.data.msg)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
        console.log(err)
      })
      // loadingInstance.close();
    })
  },
  upload(url, files) {
    return new Promise((resolve, reject) => {
      // const loadingInstance = Loading.service({
      //   text: '请稍等',
      //   target: document.querySelector('.loading'),
      // })
      axios({
        method: 'post',
        url: baseURL + allApi[url],
        data: files,
        headers: {
          'Content-type': 'multipart/form-data'
        },
      }).then(res => {
        if (res.data.code != 200) {
          MessageBox.alert(res.data.msg)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
        console.log(err)
      })
      // loadingInstance.close();
    })
  },
}

Vue.prototype.$axios = xhr;
