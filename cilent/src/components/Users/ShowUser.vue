<template>
    <div>
        <h1>แสดงข้อมูล</h1>
        <p>ID : {{ user.id }} </p>
        <p>Name : {{user.name}} </p>
        <p>Lastname : {{user.lastname}}</p>
        <p>Email : {{user.email}}</p>
        <p>Password : {{user.password}}</p>
        <p> 
            <button v-on:click="navigateTo('/user/edit/'+user.id)">แก้ไขข้อมูล</button>
            <button v-on:click="navigateTo('/users')"> ย้อนกลับ </button> 
        </p>
    </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
    data() {
        return {
            user: null,
        };
    },

    async created() {
        try {
            let userId = this.$route.params.userId;
            this.user = (await UsersService.show(userId)).data
        }catch (error) {
            console.log(error);
        }
    },
    
    methods: {
       navigateTo (route) {
           this.$router.push(route)
       },
    }
};
</script>

<style scoped>
</style>