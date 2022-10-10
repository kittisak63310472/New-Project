<template>
<div class="push_right">
    <div v-if="users.length">
        <h1>ผู้ใช้งานระบบ</h1>
        <h4>จำนวนผู้ใช้งาน {{users.length}}</h4>
        <p><button v-on:click="navigateTo('/user/create')">เพิ่มผู้ใช้งาน</button></p>
        <div v-for="user in users" v-bind:key="user.id">
            <p>Name : {{user.name}} </p>
            <p>Lastname : {{user.lastname}}</p>
            <p>
                <button v-on:click="navigateTo('/user/'+user.id)">แสดงข้อมูล</button>
                <button v-on:click="deleteUser(user)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
    data(){
        return {
            users:[]
        }
    },

    async created() {
        try {
            this.users = (await UsersService.index()).data;
        }catch (error) {
            console.log(error);
        }
    },

    methods:{
        navigateTo(route){
            this.$router.push(route)
        },

        async deleteUser(user){
            let result = confirm("Want to delete")
            if(result){
                try{
                    await UsersService.delete(user)
                    this.refreshData()
                }catch(error){
                    console.log(error)
                }
            }
        },

        async refreshData () {
            this.users = (await UsersService.index()).data
        },

        logout(){
            this.$store.dispatch('setToken',null)
            this.$store.dispatch('setUser',null)
            this.$router.push({
                name: 'login'
            })
        }
    },
};
</script>

<style scoped>
.push_right{
    margin-top: -270px;
    margin-left: 470px;
}
.nv-navbar {
  background-color: #DCDCDC;
  width: 100%;
  padding: 10px 0px 10px 0px;
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
  color: #778890;
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: black;
}
.nv-navbar .nav li a.router-link-active {
  background-color: #708090;
  color: black;
}
.clearfix {
  clear: left;
}
</style>