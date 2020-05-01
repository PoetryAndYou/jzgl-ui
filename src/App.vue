<template>
      <div >
        <div class="line" center></div>
 
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#FFFFFF"
          text-color="#409EFF"
          router
          active-text-color="#67C23A"
          >
         <el-menu-item index="/"><img src="./img/login_bg01.png"></el-menu-item>
                
          <el-menu-item index="announcement">公告</el-menu-item>

        <el-menu-item v-for="(item,key) in menuList" :key="item.id"  :index="item.name">              
             {{ item.decription }}  
        </el-menu-item>
            <el-submenu index="6" >
              <template slot="title"> <i class="el-icon-user-solid"></i></template>
                  <ol v-for="(list , index) in listitem" :key=index>
                <div  v-if="list.value=='logout'">
                        <el-menu-item @click="logout()">{{list.name}}</el-menu-item>
                </div>
                <div  v-else="list.value=='login'">
                        <el-menu-item @click="login()" :index="list.value">{{list.name}}</el-menu-item>
                </div>
                <div v-else>
                        <el-menu-item :index="list.value">{{list.name}}</el-menu-item>
                </div>
               </ol>
            </el-submenu>


         
           </el-menu>
      
      <router-view/>
  </div>
</template>

<script>
import store from './store/store'
import VueEvent from './model/VueEvent.js';
import Axios from 'axios';
import storage from './store/storage.js'
export default {
    data() {
      return {
          listitem:[
        {name:'登录',value:'login'},
          ],

        activeIndex2: 'announcement',
        // activeIndex2: '1'


       menuList:[]
      };
    },
    created(){
        if(store.state.token){
              this.asd()

        }

    },
    methods: {
      asd(){
        var _this=this
          var params=storage.get("username")
        if(params){
          Axios.get('/api/home/findAllMenu?username='+params)
            .then(function (response) {
              localStorage.setItem("menui",JSON.stringify(response.data.data))
              _this.menuList=response.data.data
              var menui=JSON.parse(localStorage.getItem("menui"))
              if(menui){
                  _this.menuList=menui
                  // alert(_this.menuList)
              }
            if(JSON.parse(storage.get("listitem"))){
            _this.listitem=JSON.parse(storage.get("listitem"))
              }
            })
            .catch(function (error) {
              // handle error
              // console.log(error);
            })
            .then(function () {
              // always executed
            })
          }
      },
      handleSelect(key, keyPath) {

        // console.log(key, keyPath);
        // console.log("sss",menuList)
        if(keyPath[1]=='personal'){
          //  console.log("sad",storage.get("menuList"))
           Axios.get("/api/user/findUserByUsername")
            .then( (response)=> {
               
                console.log("定义personal",response.data.data.username);
                storage.set('personal',response.data.data.username)
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
        }
      },
      login(){
            // this.listitem=[
            //           {name:'个人中心',value:'personal'},
            //           {name:'退出',value:'logout'}
            //         ]
      },
      logout(){
        var _this=this
         this.$confirm('您确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({

           
            type: 'success',
            message: '退出成功!'
          },
          // _this.menuList="",
           Axios.post('/api/logout')
              .then(function (response) {
                // console.log(response);
                location.reload();
              //清除localStorage
                _this.menuList="";
                storage.remove;
                storage.removeItems('listitem');
                storage.removeItems('username');
               
              })
              .catch(function (error) {
                // console.log(error);
              })
              .then(function () {
                // always executed
              }),

             

          this.$router.push({path:'/'}),
            this.listitem=[
              {name:'登录',value:'login'},
              
          ],);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
      
    },

  }
  </script>
<style>
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
 
} 

#ri{
   margin-right: 0%;
}
</style>
