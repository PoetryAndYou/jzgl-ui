<template>
  	<div class="htmleaf-container">
		<header class="htmleaf-header" >
			<h1>就诊管理系统</h1>
		</header>
		<div id="wrapper" class="login-page">
		  <div :class="login_form" class="form">
		    <form class="login-form">
		      <input type="text" placeholder="用户名" v-model="username" />
		      <input type="password" placeholder="密码" v-model="password" />
		      <el-button @click="login()">登　录</el-button>
		    </form>
		  </div>
		</div>
	</div>
</template>

<script>
import VueEvent from "../model/VueEvent.js";
import storage from "../store/storage.js";
import { mapMutations } from "vuex";
import Axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      username: "",
      password: "",
      login_form:'',
      menuList: [],
      listitem: [
        { name: "个人中心", value: "personal" },
        { name: "退出", value: "logout" }
      ]
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    reset() {
      (this.username = ""), (this.password = "");
    },
    login() {
      let _this = this;
      Axios.post(
        "/api/pub/login",
        {
          username: _this.username,
          password: _this.password
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
        .then(Response => {
          this.$message({
            type: "success",
            message: Response.data.data.msg
          });

          _this.token = Response.data.data.session_Id;
          // alert(_this.token)
          this.$store.commit("set_token", _this.token);

          //查寻当前用户信息
          storage.set("username", this.username);
          // localStorage.setItem('userid',Response.data.data.id)
          storage.set("listitem", JSON.stringify(_this.listitem));
          // alert("2")
          this.$router.push({ path: "/" });
          this.open1();
          location.reload();
        })
        .catch(error => {
          alert("账号或密码错误");
           _this.login_form=''  
            setTimeout(function()
            {
            _this.login_form='shake_effect'
            },1);  
        });
    },
    //查询用户拥有的菜单

    open1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success"
      });
    }
  }
};
</script>
 <style src="../../static/css/normalize.css" scoped></style>
<style src="../../static/css/htmleaf-demo.css" scoped></style>
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.login-page {
		  width: 360px;
		  padding: 8% 0 0;
		  margin: auto;
		}
		.form {
		  position: relative;
		  z-index: 1;
		  background: #FFFFFF;
		  max-width: 360px;
		  margin: 0 auto 100px;
		  padding: 45px;
		  text-align: center;
		  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
		}
		.form input {
		  font-family: "Roboto", sans-serif;
		  outline: 0;
		  background: #f2f2f2;
		  width: 100%;
		  border: 0;
		  margin: 0 0 15px;
		  padding: 15px;
		  box-sizing: border-box;
		  font-size: 14px;
		}
		.form button {
		  font-family: "Microsoft YaHei","Roboto", sans-serif;
		  text-transform: uppercase;
		  outline: 0;
		  background: #4CAF50;
		  width: 100%;
		  border: 0;
		  padding: 15px;
		  color: #FFFFFF;
		  font-size: 14px;
		  -webkit-transition: all 0.3 ease;
		  transition: all 0.3 ease;
		  cursor: pointer;
		}
		.form button:hover,.form button:active,.form button:focus {
		  background: #43A047;
		}
		.form .message {
		  margin: 15px 0 0;
		  color: #b3b3b3;
		  font-size: 12px;
		}
		.form .message a {
		  color: #4CAF50;
		  text-decoration: none;
		}
		.form .register-form {
		  display: none;
		}
		.container {
		  position: relative;
		  z-index: 1;
		  max-width: 300px;
		  margin: 0 auto;
		}
		.container:before, .container:after {
		  content: "";
		  display: block;
		  clear: both;
		}
		.container .info {
		  margin: 50px auto;
		  text-align: center;
		}
		.container .info h1 {
		  margin: 0 0 15px;
		  padding: 0;
		  font-size: 36px;
		  font-weight: 300;
		  color: #1a1a1a;
		}
		.container .info span {
		  color: #4d4d4d;
		  font-size: 12px;
		}
		.container .info span a {
		  color: #000000;
		  text-decoration: none;
		}
		.container .info span .fa {
		  color: #EF3B3A;
		}
		body {
		  background: #76b852; /* fallback for old browsers */
		  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
		  background: -moz-linear-gradient(right, #76b852, #8DC26F);
		  background: -o-linear-gradient(right, #76b852, #8DC26F);
		  background: linear-gradient(to left, #76b852, #8DC26F);
		  font-family: "Roboto", sans-serif;
		  -webkit-font-smoothing: antialiased;
		  -moz-osx-font-smoothing: grayscale;      
		}
		.shake_effect{
		 	-webkit-animation-name: shake;
  			animation-name: shake;
  			-webkit-animation-duration: 1s;
  			animation-duration: 1s;
		}
		@-webkit-keyframes shake {
		  from, to {
		    -webkit-transform: translate3d(0, 0, 0);
		    transform: translate3d(0, 0, 0);
		  }

		  10%, 30%, 50%, 70%, 90% {
		    -webkit-transform: translate3d(-10px, 0, 0);
		    transform: translate3d(-10px, 0, 0);
		  }

		  20%, 40%, 60%, 80% {
		    -webkit-transform: translate3d(10px, 0, 0);
		    transform: translate3d(10px, 0, 0);
		  }
		}

		@keyframes shake {
		  from, to {
		    -webkit-transform: translate3d(0, 0, 0);
		    transform: translate3d(0, 0, 0);
		  }

		  10%, 30%, 50%, 70%, 90% {
		    -webkit-transform: translate3d(-10px, 0, 0);
		    transform: translate3d(-10px, 0, 0);
		  }

		  20%, 40%, 60%, 80% {
		    -webkit-transform: translate3d(10px, 0, 0);
		    transform: translate3d(10px, 0, 0);
		  }
		}
		p.center{
			color: #fff;font-family: "Microsoft YaHei";
    }
    .htmleaf-header{
      background-color: #000000;
    }
</style>