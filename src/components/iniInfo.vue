<template>
  <div class="hello" :style="`background-image: url(${this.bkg});`">
    <div class="mask">
    <div class="top">
  <div class="change" :class="{able:this.done}" @click="change(-3)"><</div><div class="jidu">当前季度:{{this.jidu}}</div><div class="change" :class="{able:this.done}" @click="change(3)">></div>
  </div>
    <div v-for="x of this.info" style="overflow: hidden;display: flex;flex-wrap: wrap;" class="ava">
      <div class="hr"><div class="xingqi">{{xingqi[x.day]}}     </div><hr/> </div>
      <div v-for="i of x.children"  class="normal" @mousemove="GetBKG(i['图床'])">
       <router-link :to="`detail?key=${i['关键字']}`" > <div :style="`background-image:url(${i['图床']})`" class="font" ></div> </router-link>
        {{i.Name}}

      </div>

      <br>
      
    </div>
    </div>
  </div>
</template>

<script>
  import {normal,back} from "../http";

export default {
  methods:{
    GetBKG(bkg){
      this.bkg=bkg;
this.$store.commit('getbkg',bkg)
    },
change(x){
  if(this.done){
  const number=Number(this.jidu);
  let z=Number(this.jidu[2]);
  
  if(z==0&&x==-3){
    this.jidu=this.jidu[0]+this.jidu[1]+7;
    this.load()();
    return;
  }
  if(x==3&&z==0){
    this.jidu=String(number+11);
    this.load()();
    return ;
  }
  z+=x;
  if(z==-2){
     this.jidu=String(number-11);
     this.load()();
     return
  }
  
  if(z==10){
    z=0
  }
  this.jidu=this.jidu[0]+this.jidu[1]+z;

this.load()();
}
},
load(){
console.log('load');
this.done=false;
let fangdou=null;
 
  return function(){
   if(fangdou){
      clearTimeout(fangdou);
    }

  fangdou=setTimeout(()=>{
         normal({jidu:this.jidu}).then((res,rea)=>{
          this.done=true;
            this.info=[];
        console.log(res.data||rea);
        if(res.data){
         if(this.jidu=='获取中'){
          this.jidu=res.data.jidu
         }

     for(let x=1;x<=7;x++){
      this.info.push({day:x,children:[]})
     }

     for(let x of res.data.res){
      this.info[x.DAY-1].children.push(x);
     }
     console.log(this.info);
        }
       });
  },50)
 
    }.bind(this)
},

  },
  name: 'iniInfo',
  created(){


this.load()();
 

       
  },
  computed:{
   
   activeBkg(){

  console.log(this.$store.state.bkg,'state')
    return this.$store.state.bkg},

  },
  data(){


return {

   bkg:'',
  info:[],
done:true,
xingqi:['x','周一','周二','周三','周四','周五','周六','周日'],
jidu:'获取中',
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
    background-size: auto 100%;
    animation: bkg 10s ease 0s infinite alternate;
    .mask{
      background:rgba(0,0, 0, 0.2);
        backdrop-filter: blur(6px);
    }
}

@keyframes bkg{
  0%{background-position: 50% 0;}
  50%{background-position: 50% -5px;}
  100%{background-position: 50% 5px;}
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

.top{
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  margin:10px 0;
  div{
    border: 1px solid rgba(255,255, 255, 0.3);
  }
  .change{
    width: 20px;
   
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .able{
     cursor: pointer;
  }
}
</style>
