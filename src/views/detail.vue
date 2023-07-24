<template>
  <div id="hello">
         <div style="flex-basis: 100%;">{{this.$route.query.key}}</div>
         
           <div v-for="i of nodes">{{i.t}} <button @click="addurl($route.query.key,i.b)">下载</button></div>
         <div ></div>
  </div>

</template>

<script>
// @ is an alias to /src
import {download,add} from "../http"
export default {
  name: 'detail',
  created(){
this.down(this.$route.query.key);

  },
  methods:{
  	addurl(key,url){
  		console.log()
     add(key,url);
     window.alert('添加下载任务成功');
  	},
  	down(key){
    download(key).then((res,rea)=>{
    	console.log(res.data)
    	this.response=res.data;
    	this.parse();
    })
  	},
  	parse(){
  		const a=this.response.match(/<item>(.|\n)*?<\/item>/gm);
  		for(let x of a){
  			
  			const t=x.replace(/(.|\n)*?<title>((.|\n)*?)<\/title>(.|\n)*/gm,'$2');
  		    const d=x.replace(/(.|\n)*?<description>((.|\n)*?)<\/description>(.|\n)*/gm,'$2');
        
  		    const l=x.replace(/(.|\n)*?<enclosure url="((.|\n)*?)"(.|\n)*\/>(.|\n)*/gm,'$2');
        const b=l.replace(/acg.rip/,'tv.rellal.com:9099/acg')
             this.nodes.push({t,d,b})

  		}
  		console.log(this.nodes)
  	}


  },
  data(){
  	return {
  		response:'',
  		nodes:[],
  	}
  }

}
</script>
<style   lang="less" scoped="">
#hello{display: flex;
width: 100%;}
div{
  font-size: 25px;
  text-align: left;
  width: 450px;
  flex-wrap: wrap;
  margin: 10px;
  border: 0.5px white solid;

}
span:hover{
	cursor: pointer;
}
	

</style>