<template>
  <div id="hello">
         <div style="flex-basis: 100%;">{{this.$route.query.key}}</div>  
        <div style="flex:1;flex-basis: 100%;display: flex;justify-content: center;align-items: center;">
          <div @click="down($route.query.key,--page)" style="text-align: right;" class="fanye"><i class="el-icon-caret-left"  v-if="this.page!=1"/></div>
         
        第{{page}}页
         <div @click="down($route.query.key,++page);" class="fanye" > <i class="el-icon-caret-right"/></div>
         </div> 


         <div class="nodec">最近下载:{{this.last}}</div>
           <div v-for="(x,k) of nodes" class="nodec"> <span v-html="k"/> 
           <div v-for="i of x" class="node"><span v-html="i.t"/><button @click="addurl($route.query.key,i.b,i.t)" v-if="(i.t!='暂无结果')&&i.t!='正在加载'"><i class="el-icon-download"/></i></button></div>     
</div>


        
  </div>

</template>

<script>
// @ is an alias to /src
import {download,add,back} from "../http"

export default {
  name: 'detail',
  created(){
this.down(this.$route.query.key,this.page);
   this.$electron.ipcRenderer.invoke('getstore',this.$route.query.key).then((m)=>{console.log(m,'m');  this.last=m;});

  },
  methods:{
    addurl(key,url,des){
    
    back({key,url,des}).then((res,err)=>{
      if(err){
        console.log('err')
      }else{
         console.log(res)
      }
    })
   add(key,url);
      this.$electron.ipcRenderer.send('setstore',{key,des});
   this.$electron.ipcRenderer.invoke('getstore',key).then((m)=>{console.log(m,'m');  this.last=m;});
   
     window.alert('添加下载任务成功');
    },
    down(key,page){
      this.nodes={ROREL:[{t:'正在加载'}]};
    download(key,page).then((res,rea)=>{


      this.response=res.data;

      this.parse();
    })
    },
    parse(){
     const pag=[]
      const a=this.response.match(/<item>(.|\n)*?<\/item>/gm)||[];
      for(let x of a){
        
        const t=x.replace(/(.|\n)*?<title>((.|\n)*?)<\/title>(.|\n)*/gm,'$2');
          const d=x.replace(/(.|\n)*?<description>((.|\n)*?)<\/description>(.|\n)*/gm,'$2');
        
          const l=x.replace(/(.|\n)*?<enclosure url="((.|\n)*?)"(.|\n)*\/>(.|\n)*/gm,'$2');
        const b=l.replace(/acg.rip/,'tv.rellal.com:9099/acg')
             pag.push({t,d,b})


      }


  

       function nodetotree(array) {
        if(!array.length){return []}
        const arr = array
const result = arr.reduce((acc, cur) => {
  const prefix = cur.t.match(/^\[(.*?)\]/) || cur.t.match(/^【(.*?)】/);
  if (prefix && prefix[1]) {
    if (!acc[prefix[1]]) {
      acc[prefix[1]] = [];
    }
    acc[prefix[1]].push(cur);
  }
  return acc;
}, {});
return result
       }

  this.nodes=nodetotree(pag)

  if (JSON.stringify(this.nodes)=='[]'){

        this.nodes={ROREL:[{t:'暂无结果'}]}
      }
    }


  },
  data(){
    return {
      response:'',
      nodes:[{ROEL:'正在加载...'}],
      page:1,
      last:'暂无',
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
 
  font-size: 18px;
  text-align: left;
  flex-wrap: wrap;
  margin: 10px 10px 0 10px;
 font-size: 25px;

}
span:hover{
  cursor: pointer;
}
  
.fanye{
  &:hover{
    color: rgba(255,255,255,0.3);
  }
}
.node{
  font-size:18px;
  &:hover{
     background: rgba(199,199,210,0.3);

  }
  display: flex;
  justify-content: space-between;
 width: 100%;
 text-align: left;
 padding: 0 40px;
}
.nodec{
  display: flex;
  justify-content: column;
  width: 100%;

}
</style>