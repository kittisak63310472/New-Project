<template>
<div>
    <h1>สร้างผู้ใช้งาน</h1>
    <form v-on:submit.prevent = "createUser">
        <p>Name : <input type="text" v-model="user.name"></p>
        <p>Lastname : <input type="text" v-model="user.lastname"></p>
        <p>Email : <input type="text" v-model="user.email"></p>
        <p>Password : <input type="text" v-model="user.password"></p>
        <p>
           <button type="submit">ตกลง</button>
           <button v-on:click="navigateTo('/users')"> ย้อนกลับ </button> </p>
        </p>
    </form>
    <hr>
    <div>
        <p>Name : {{user.name}}</p>
        <p>Lastname : {{user.lastname}}</p>
        <p>Email : {{user.email}}</p>
        <p>Password : {{user.password}}</p>
    </div>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
    data() {
        return {
            user: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },

    methods: {
         navigateTo (route) {
           this.$router.push(route)
       },

        async createUser() {
            try {
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            }catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
</style>