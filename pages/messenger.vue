<template>
  <div class="wrapper">
    <button id="logOut" @click="logOut">Log Out</button>
    <button id="usersOnline" class="btn" @click="usersOnline">Users Online</button>
    <div class="users">
      <div class="user" v-for="user in $store.state.usersOnline" :key="user.id">
        <p :id="user.id" @click="socketConnectForUser">{{user.username}}</p>
      </div>
    </div>
    <div class="messenger-block inner-scrollbar" id="messenger-block">
      <div class="mail" v-for="(message, key) in arrayMessageServer" :key="key">
        <div class="wrap-user-info">
          <img src="../assets/userPhoto.png" alt="photo">
          <p class="username">{{ message.message.username }}:</p>
        </div>
        <p class="messenge">
          {{ message.message.message }}
        </p>
      </div>
    </div>
    <div class="form-block">
      <form class="form-messenger" action="#" method="POST">
        <label for="messenger-input"></label>
        <input name="messenger" id="messenger-input" v-model="messengerText">
        <button type="submit" class="send-messenger" id="send-messenger" @click="sendMessenger">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { setCookie, getCookie } from "../utils/cookies";

  export default {
    name: "messenger",
    data() {
      return {
        username: getCookie('username'),
        messengerText: '',
        socketCustom: '',
        arrayMessageServer: []
      }
    },
    methods: {
      sendMessenger() {
        event.preventDefault();
        if(this.messengerText === '') return false;
        // Require
        this.socketCustom.send(JSON.stringify({message:this.messengerText,username:this.username}));
        //Close Require
        this.messengerText = '';
      },
      usersOnline() {
        event.preventDefault();
        event.target.nextElementSibling.classList.toggle('active')
      },
      logOut() {
        event.preventDefault();
        setCookie('sessionid', '');
        setCookie('username', '');
        this.$router.push('/login');
      },
      socketConnectForUser(event) {
        let loc = window.location;
        let wsStart = 'ws://';

        if (loc.protocol === 'https:'){
          wsStart = "wss://"
        }

        let endpoint = wsStart + 'shrouded-chamber-22050.herokuapp.com/messages' + `/${event.target.innerText}/${getCookie('sessionid')}`;
        this.socketCustom = new WebSocket(endpoint);

        this.socketCustom.onmessage = (e) => {
          console.log("message", e);
          let mail = JSON.parse(e.data);
          if(mail instanceof Array) {
            mail.forEach((item) => {
              this.arrayMessageServer.push(item);
            });
          } else {
            this.arrayMessageServer.push(mail);
          }

          console.log(this.arrayMessageServer);
        };

        this.socketCustom.onopen = (e) => {
          console.log("open", e);
        };

        this.socketCustom.onerror = (e) => {
          console.log("error", e);
        };

        this.socketCustom.onclose = (e) => {
          console.log("close", e)
        }
      }
    },
    created() {
      this.$store.dispatch('requireGetUsers')
        .then((response) => {
          this.$store.commit('usersOnline', response.data)
        });
    },
    mounted() {
      let objDiv = document.getElementById("messenger-block");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    updated() {
      let objDiv = document.getElementById("messenger-block");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.95);
  }
  .inner-scrollbar{
    overflow: auto;
    &::-webkit-scrollbar{
      height: 5px;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: rgba(255,255,255,0.2);
      border-radius: 6px;
    }
  }
  #usersOnline {
    position: absolute;
    top: 15px;
    left: 15px;
    outline: none;
    box-shadow: 0 0 0 0;
    border: none;
    background-color: transparent;
    color: rgba(255,255,255,0.5);
    font-size: 17px;
    cursor: pointer;
  }
  #logOut {
    position: absolute;
    top: 15px;
    right: 15px;
    outline: none;
    box-shadow: 0 0 0 0;
    border: none;
    background-color: transparent;
    color: rgba(255,255,255,0.5);
    font-size: 17px;
    cursor: pointer;
  }
  .users {
    display: block;
    position: fixed;
    top: 50px;
    left: -20%;
    width: 20%;
    height: calc( 100vh - 50px );
    text-align: center;
    color: rgba(255,255,255,0.3);
    transition: .3s;
    &.active {
      left: 0;
    }
    .user {
      padding: 7px;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      cursor: pointer;
    }
  }
.messenger-block {
  background-color: transparent;
  color: rgba(255,255,255,0.3);
  margin: 0 auto;
  width: 50%;
  height: 60vh;
  padding: 2vh 5vh;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.3);
  overflow: auto;
  .mail {
    width: 100%;
    overflow: auto;
    margin: 20px 0;
    .wrap-user-info {
      overflow: auto;
      margin-bottom: 5px;
      img {
        width: 5%;
        float: left;
        margin-right: 2%;
      }
      .username {
        width: fit-content;
        float: left;
        color: rgba(255,255,255,0.70);
        font-size: 16px;
        font-family: sans-serif;
      }
    }
    .messenge {
      float: left;
      margin-left: 7%;
      width: 92%;
      position: relative;
      top: -10px;
    }
    .date {
      float: right;
      color: rgba(255,255,255,0.1);
      text-align: center;
    }
  }
}
  .form-block {
    margin: 15px auto;
    width: 50%;
    height: 7vh;
    .form-messenger {
      height: 100%;
      display: flex;

      input {
        position: relative;
        height: 100%;
        width: 80%;
        margin-right: 1%;
        box-shadow: 0 0 0 0;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 5px;
        resize: none;
        box-sizing: border-box;
        padding: 5px 15px;
        outline: none;
        background-color: transparent;
        color: rgba(255,255,255,0.3);
        font-weight: 500;
        font-size: 2.2vh;
      }
      .send-messenger {
        outline: none;
        width: 20%;
        height: 100%;
        box-shadow: 0 0 0 0;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 5px;
        background-color: rgba(0,0,0,0.95);
        color: rgba(255,255,255,0.3);
        font-weight: 700;
        font-family: sans-serif;
        font-size: 3vh;
        cursor: pointer;
        &.active {
          animation: animationSend 1s;
        }
      }
    }
  }

  @keyframes animationSend {
    0% {
      font-size: 3vh;
    }
    50% {
      font-size: 2vh;
    }
    100% {
      font-size: 3vh;
    }
  }
</style>
