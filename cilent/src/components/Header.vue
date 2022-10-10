<template>
  <div>
    <head>
      <title>Bootstrap Example</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
    </head>
<div class="container-fluid ">
  <div class="row content ">
    <div class="col-sm-3 sidenav">
      <h2>Airline Company</h2>
      <ul class="nav nav-pills nav-stacked " >
      <li><router-link :to="{ name: 'blogs' }" class="btn btn-primary" > Home </router-link></li>
      <li><router-link :to="{ name: 'comments' }" class="btn btn-primary"> Add Company</router-link></li>
      <li><router-link :to="{ name: 'users' }" class="btn btn-primary"> Users </router-link></li>
      <li><router-link :to="{ name: 'login' }" class="btn btn-primary"> Login </router-link></li>
      <li><a v-on:click.prevent="logout" href="blogs" class="btn btn-primary"> Logout </a></li>
      </ul><br>
    </div>

  
  </div>
</div>
</div>

</template>

<script>

export default {
  methods:{
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
         name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.nv-navbar {
  background-color: #fa1717;
  width: 220px;
  height: 10px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: #fa0b0b;
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: black;
}
.nv-navbar .nav li a.router-link-active {
  background-color: #ff2a00;
  color: rgb(245, 29, 29);
}
.clearfix {
  clear: left;
}
</style>