/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let formData = null;

    xhr.responseType = 'json';

    if (options.method === 'GET') {
        if (options.data) {

            let params = Object.entries(options.data)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        
            url += `?${params}`;
          
        }
    } else {
        formData = new FormData(); 

        if (options.data) {
            Object.entries(options.data).forEach(([key, value]) => {
                if (value !== undefined) { 
                    formData.append(key, value);
                }
            });

        }
    }

    xhr.addEventListener('load', () => {
        console.log('Ответ:', xhr.response);
        options.callback(null, xhr.response);
});

    try {
        xhr.open(options.method, url.href);

        xhr.send(options.method === 'GET' ? null : formData); 
    } catch (e) {
        options.callback(e);
    }
};

