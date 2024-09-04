/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let url = options.url;
  
  if (options.method === 'GET') {
    const params = new URLSearchParams(options.data).toString();
    url += `?${params}`;
  }

  xhr.open(options.method, url);
  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      options.callback(null, xhr.response);
    } else {
      options.callback(xhr.response, null);
    }
  };

  xhr.onerror = () => {
    options.callback(new Error('Network Error'), null);
  };

  if (options.method !== 'GET') {
    const formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    xhr.send(formData);
  } else {
    xhr.send();
  }
};
