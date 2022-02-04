<template>
  <div id="app">
    <Header v-if="showHeader" />
    <div class="app-content">
      <router-view />
    </div>
    <Feedback />
    <Authorization />
    <Signup :network="network" />
    <Recover />
    <SocSignup />
    <SuccessSignup />
    <SuccessRecover />
    <SuccessProfile />
    <SuccessProfileDelete />
    <SuccessCheck />
    <SuccessFeedback />
    <CommonError />
    <TemporarilyUnavailable />
    <Apmcheck v-if="apmInit"></Apmcheck>
  </div>
</template>
<script>
import Header from "@/components/AppHeader.vue";
import Feedback from "@/components/modals/feedback.vue";
import Authorization from "@/components/modals/authorization.vue";
import Signup from "@/components/modals/signup.vue";
import TemporarilyUnavailable from "@/components/modals/temporarilyUnavailable.vue";

//import AccessError from "@/components/modals/accessError.vue";
//import CameraAccess from "@/components/modals/cameraAccess.vue";

import SuccessCheck from "@/components/modals/successCheck.vue";
import SuccessSignup from "@/components/modals/successSignup.vue";
import SuccessRecover from "@/components/modals/successRecover.vue";
import SuccessProfile from "@/components/modals/successProfile.vue";
import SuccessFeedback from "@/components/modals/successFeedback.vue";
import SuccessProfileDelete from "@/components/modals/successProfileDelete.vue";

//import UploadCheck from "@/components/modals/uploadCheck.vue";
import CommonError from "@/components/modals/commonError.vue";
import Recover from "@/components/modals/recover.vue";
import SocSignup from "@/components/modals/soc_signup.vue";

import Apmcheck from "@/components/Apmcheck.vue";

export default {
  components: {
    Header,
    Feedback,
    Authorization,
    Signup,
    //  AccessError,
    //	CameraAccess,
    SuccessCheck,
    SuccessSignup,
    SuccessRecover,
    SuccessProfile,
    SocSignup,
    SuccessFeedback,
    SuccessProfileDelete,
    //  UploadCheck,
    CommonError,
    Apmcheck,
    Recover,
    TemporarilyUnavailable,
  },
  data: function () {
    return {
      showHeader: true,
      apmInit: false,
      network: null,
    };
  },
  methods: {
    checkAuth(t) {

      const params = this.$route.query;
      if (params.result === "1") {
        this.$store.commit("SET_TOKEN", params.auth_key);
        localStorage.setItem('uuid', params.auth_key);
        document.location.reload()
        setTimeout(function () {
          t.apmInit = true;
        }, 1000);
      }
    },
  },
  mounted() {
    let t = this;
    this.$root.$on("initApm", () => {
      t.apmInit = true;
      setTimeout(() => {
        let apmButton = document.querySelector(
        "#apm-scan-qr .apm-action-button"
      );
      if (apmButton) apmButton.click();
      }, 500);
      
    });
    if (localStorage.getItem('uuid') !== null) {
      t.apmInit = true;
    };
    clearImmediate;
    this.checkAuth(t);
    
    // this.$modal.show("success_signup");
  },
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title || "";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  
  position: relative;
  min-width: 320px;
  min-height: 100vh;
  @media (min-width: $md) {
    height: 100vh;
    overflow-x: hidden;
  }
}
</style>
