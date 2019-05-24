<template>
  <section class="container">

  </section>
</template>

<script>
  import { getCookie } from "../utils/cookies";

  export default {
  created() {
    if(getCookie('sessionid') === '') {
      this.$router.push('/login')
    } else {
      this.$router.push('/messenger')
    }

  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.95);
}

.links {
  width: 100%;
  margin: 25px auto;
  padding-top: 15px;
  a {
    margin: 0 10px;
  }
}
</style>
