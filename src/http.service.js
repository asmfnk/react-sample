const apis = {
  // 謎を送信
  getPrefectures: {
    method: 'GET',
    path: '/prefectures'
  },
  // 謎一覧を取得
  getPopulation: {
    method: 'GET',
    path: '/population'
  }
}
const baseUrl = '/api'

export default {
  send: (api, data, param) => {
    if (!apis[api]){
      return false
    }
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let paramStr = ''
      if (param) {
        paramStr = '?'
        for(let k in param) {
          paramStr = paramStr + k + '=' + param[k] + '&'
        }
      }
      xhr.open(apis[api].method, baseUrl + apis[api].path + paramStr, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      // xhr.setRequestHeader("X-API-KEY", process.env.REACT_APP_RESAS_KEY);
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = () => {
        reject(new Error(xhr.statusText));
      };
      xhr.send(JSON.stringify(data));
    });
  }
};
