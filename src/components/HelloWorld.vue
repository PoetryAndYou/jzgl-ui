<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    用户名 <input type="text" name="username" v-model="username">
     密码 <input type="text" name="password" v-model="password">
     <button @click="login()">登录</button>
    <button @click="selectById()">通过id查找</button>
  </div>
</template>

<script>
import Axios from 'axios';
import qs from 'qs'

export default {
  
  name: 'HelloWorld',
  data () {
    return {
      username:'',
      password:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

    login(){
      var _this=this;
      var params = new URLSearchParams();
      params.append('username', _this.username);
      params.append('password', _this.password);
      
     Axios.post("/api/pub/login",{
          username:_this.username,
          password:_this.password

     },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        }).then((Response)=>{
        //  this.$router.push({path:'/two'})
        // alert("1")
        // var data1= JSON.stringify(Response.data);
        
        // alert(Response.data.data.msg)
      }).catch((error)=>{
        // alert(JSON.stringify(error))
      })
    },
    selectById(){
      var params = new URLSearchParams();
      params.append('id','1003')
      Axios.post("/api/selectByPrimaryKey",params).then((Response)=>{
        // alert(Response.data);
      }).catch((error)=>{
        // alert("error111"+error)
      })
     },
  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
