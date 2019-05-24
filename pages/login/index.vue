<template>
  <div class="wrapper">
    <form action="#" method="POST">
      <input id="input" type="text" v-model="loginKey">
      <button id="submit" type="submit" @click="loginEvent"></button>
    </form>
  </div>
</template>

<script>
  import { setCookie } from "../../utils/cookies";

  export default {
    name: "login",
    data() {
      return {
        loginKey: ''
      }
    },
    methods: {
      loginEvent(event) {
        event.preventDefault();
        if(this.loginKey === '') return false;
        event.target.previousElementSibling.blur();
        this.$store.dispatch('requestSignIn', {id: this.loginKey})
          .then((response) => {
            if (response.status === 200) {
              setCookie('sessionid', response.data.sessionid);
              setCookie('username', response.data.username);
              this.$router.push('/');
            }
          });
        setTimeout(() => {
          this.$router.push('/');
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=VT323&display=swap');
  .wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.95);
    #input {
      background-color: transparent;
      box-shadow: 0 0 0 0;
      border: none;
      padding: 10px 15px;
      border-radius: 8px;
      outline: none;
      transition: .75s;
      font-family: 'VT323', monospace;
      font-size: 30px;
      &:focus {
        background-color: white;
      }
    }
    #submit {
      display: none;
    }
  }
</style>
