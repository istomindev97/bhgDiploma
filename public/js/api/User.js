/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    const userDataJSON = JSON.stringify(user);

    localStorage.setItem('user', userDataJSON);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userDataJSON = localStorage.getItem('user');

    if (!userDataJSON) {
      return undefined;
    }

    return JSON.parse(userDataJSON);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: "GET",
      callback: (err, response) => {
        if (response && response.user) {
          console.log(response.user);
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
    }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback) {
    try {
      createRequest({
        url: this.URL + `/register`,
        method: 'POST',
        data: data,
        callback: (err, response) => {
          if (response && response.user) {
            console.log(response.user);
            this.setCurrent(response.user);
          }
          callback(err, response);
      }
      })
    } catch(err) {
      window.alert(err)
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + `/register`,
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
            this.unsetCurrent()
        }
        callback(err, response);
    }
    })
  }
  }
