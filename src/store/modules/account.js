import {
  signUp,
  signIn,
  recover,
  checkRegisterByEmail,
  sendSms,
  sendCode,
  registerByEmailSoc,
  resetPassword,
} from "../../api/login";
import {
  getProfile,
  updateProfile,
  logOut,
  deleteProfile,
  getChecks,
  getWinners,
  searchWinners,
  getPrizes,
  sendFeedback,
  uploadImage,
} from "../../api/user";
import { getToken, setToken, removeToken } from "../../utils/auth";
import router from "../../router";

/* eslint-disable */

const account = {
  state: {
    token: getToken(),
    user: null,
    login: null,
    vkStatus: null,
  },

  mutations: {
    SET_LOGIN: (state, o) => {
      state.login = o;
    },

    SET_USER: (state, user) => {
      state.user = user;
    },

    SET_TOKEN: (state, token) => {
      state.token = token;

      setToken(token);
    },

    REMOVE_TOKEN: (state) => {
      state.token = null;

      removeToken();
    },
  },

  actions: {
    CheckRegisterByEmail({ commit }, data) {
      return (async () => checkRegisterByEmail(data))();
    },

    SendSms({ commit }, data) {
      return (async () => sendSms(data))();
    },

    SendCode({ commit }, data) {
      return (async () => sendCode(data))();
    },
    
    RegisterByEmailSoc({ commit }, data) {
      return (async () => registerByEmailSoc(data))();
    },

    UpdateProfile({ commit }, data) {
      return (async () => updateProfile(data))();
    },

    ResetPassword({ commit }, data) {
      return (async () => resetPassword(data))();
    },

    Recover({ commit }, data) {
      return (async () => recover(data))();
    },

    SendFeedback({ commit }, data) {
      return (async () => sendFeedback(data))();
    },

    UploadImage({ commit }, data) {
      return (async () => uploadImage(data))();
    },

    GetProfile({ commit }) {
      return new Promise((resolve, reject) => {
        getProfile()
          .then((response) => {

            if (response.error === 0) {

              commit('SET_USER', response.result);
            }

            resolve(response);
          });
      });
    },

    GetChecks({ commit }, data) {
      return (async () => getChecks(data))();
    },

    GetPrizes({ commit }, data) {
      return (async () => getPrizes(data))();
    },

    GetWinners({ commit }, data) {
      return (async () => getWinners(data))();
    },

    SearchWinners({ commit }, data) {
      return (async () => searchWinners(data))();
    },

    SignUp({ commit }, data) {
      return (async () => signUp(data))();
    },

    SignIn({ commit }, data) {
      return (async () => signIn(data))();
    },

    LogOut({ commit }, data) {
      console.log('---', 'LogOut');

      if (data) {
        (document.getElementById('spinner')).classList.remove('-hide');

        logOut()
          .then(() => {
            commit('REMOVE_TOKEN');

            router.push({ name: 'Home'});

            (document.getElementById('spinner')).classList.add('-hide');
          });
      } else {
        commit('REMOVE_TOKEN');

        commit('SET_USER', null);

        router.push({ name: 'Home'});
      }
    },
    
    DeleteProfile({ commit }, data) {
      return (async () => deleteProfile(data))();
    },
  },
};

export default account;
