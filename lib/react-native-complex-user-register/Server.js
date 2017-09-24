'use strict';

export const  key = '@instacar:session';
export const host = 'http://instacar.bismarck.space/wp-json/wp/v2/users';
export default {
  auth: {
    login: function (data) {
      let url = `${host}/auth/login`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    register: function (data) {
      let url = `${host}/auth/register`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    forget: function (data) {
      let url = `${host}/auth/forget`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    reset: function (data) {
      let url = `${host}/auth/reset`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    }
  }
};
