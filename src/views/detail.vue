<template>
  <div id="hello">
         <div style="flex-basis: 100%;">{{this.$route.query.key}}</div>  
        <div style="flex:1;flex-basis: 100%;display: flex;justify-content: center;align-items: center;">
          <div @click="down($route.query.key,--page)">上一页</div>
         
        {{page}}
         <div @click="down($route.query.key,++page);">下一页</div>
         </div> 
           <div v-for="i of nodes">{{i.t}} <button @click="addurl($route.query.key,i.b)" v-if="i.t!='暂无结果'">下载</button></div>



         <div ></div>
  </div>

</template>

<script>
// @ is an alias to /src
import {download,add} from "../http"
export default {
  name: 'detail',
  created(){
    console.log(this.page,'page')
this.down(this.$route.query.key,this.page);

  },
  methods:{
  	addurl(key,url){
  		console.log()
     add(key,url);
     window.alert('添加下载任务成功');
  	},
  	down(key,page){
      this.nodes=[];
    download(key,page).then((res,rea)=>{
    	console.log(res.data)

    	this.response=res.data;

    	this.parse();
    })
  	},
  	parse(){

  		const a=this.response.match(/<item>(.|\n)*?<\/item>/gm)||[];
  		for(let x of a){
  			
  			const t=x.replace(/(.|\n)*?<title>((.|\n)*?)<\/title>(.|\n)*/gm,'$2');
  		    const d=x.replace(/(.|\n)*?<description>((.|\n)*?)<\/description>(.|\n)*/gm,'$2');
        
  		    const l=x.replace(/(.|\n)*?<enclosure url="((.|\n)*?)"(.|\n)*\/>(.|\n)*/gm,'$2');
        const b=l.replace(/acg.rip/,'tv.rellal.com:9099/acg')
             this.nodes.push({t,d,b})

  		}


  		if (this.nodes.length==0){
        this.nodes=[{t:'暂无结果'}]
      }
  	}


  },
  data(){
  	return {
  		response:'',
  		nodes:[{t:'正在加载...'}],
      page:1,
  	}
  }

}
</script>
<style  lang="less" scoped="">
#hello{display: flex;
  align-items: flex-start;
  align-content: flex-start;
width: 100%;


}
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