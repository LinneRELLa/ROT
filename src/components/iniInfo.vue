<template>
  <div class="hello">
    <div v-for="x of this.info" style="overflow: hidden;display: flex;flex-wrap: wrap;" class="ava">
      <div class="hr"><div class="xingqi">{{xingqi[x.day]}}     </div><hr/> </div>
      <div v-for="i of x.children"  class="normal">
       <router-link :to="`detail?key=${i['关键字']}`"> <div :style="`background-image:url(${i['图床']})`" class="font"></div> </router-link>
        {{i.Name}}

      </div>

      <br>
      
    </div>
  </div>
</template>

<script>
  import {normal} from "../http";
export default {
  name: 'iniInfo',
  created(){



       normal().then((res,rea)=>{
        console.log(res.data||rea);
        if(res.data){
     for(let x=1;x<=7;x++){
      this.info.push({day:x,children:[]})
     }

     for(let x of res.data){
      this.info[x.DAY-1].children.push(x);
     }
     console.log(this.info);
        }
       })

       
  },
  data(){
return {info:[],
xingqi:['x','周一','周二','周三','周四','周五','周六','周日']
}
  },
  props: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.xingqi{
  width: 120px;
  margin:10px;
  margin-right:10px;

  font-size: 35px;
  align-self: center;
  background:rgba(255,255,255,0.1);
}

.hello{
  color:white;
    background: rgba(36,40,47,1);
}


h3 {
  margin: 40px 0 0;
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
.hr{width: 100%;}
hr{
  width: 98%;
}
.font{
      transition: all 0.5s ease;
    cursor: pointer;
    width: 205px;

    height: 242px;
 
  
    text-align: center;
     background: rgba(255,255,255,0.2) center  no-repeat;
    background-size: auto 96%;
 &:hover{
   background-size: auto 120%;
 }
}
.normal{margin:0 10px 10px 10px;
max-width: 200px;
}
</style>
