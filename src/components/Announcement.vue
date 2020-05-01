<template>
  <div>
        <div>
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in imgs" :key="item.id">
                    <img :src=item.url>
                <!-- <h3>{{ item }}</h3> -->
                </el-carousel-item>
            </el-carousel>
        </div>
        
         <div class="line" center></div>
            <br>
            <br>
         <el-row :gutter="20">
        <el-collapse accordion  >
            <el-row :gutter="20">
                 <el-col :push="1" :span="16">
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item  v-for="an in Anno" :timestamp=an.time placement="top" :key="an.id">
                            <el-card>
                                <el-collapse >
                                <el-collapse-item>
                                <template slot="title">
                                    <h1>{{an.title}}</h1><i class="header-icon el-icon-info"></i>
                                </template>
                                   <li v-html="an.content"></li>

                            
                                </el-collapse-item>
                                </el-collapse>
                            </el-card>
                            </el-timeline-item>
                        </el-timeline>
                        </div>
                </el-col>
                
                <el-col :span="6" :push="1"  >

                    <el-calendar v-model="value" class="block">
                  </el-calendar>
                    
                </el-col>
            </el-row>
        </el-collapse>

        </el-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            value: new Date(),
            imgs:[],
            Anno:[],
           
        }
    },methods:{
        getImgs(){
            // Make a request for a user with a given ID
            var _this=this
            axios.get('/api/pub/img')
            .then(function (response) {
               _this.imgs=response.data.data
                // console.log(response);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
        },
        getAnno(){
            var _this=this
            axios.get('/api/pub/anno')
            .then(function (response) {
               _this.Anno=response.data.data
                // console.log(response);
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
    created(){
        this.getImgs();
        this.getAnno();
    }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item img{
      height: 500px;
      width: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .content {
           
            margin: 0 auto; /*水平居中*/
        }

  .is-selected {
    color: #1989FA;
  }
</style>