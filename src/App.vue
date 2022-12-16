<template>
  <div id="app">
    <div id="navload">
    </div>
    <div id="nav">
      <router-link to="/" active-class="active-icon" class="link">首页</router-link> 
      <router-link to="/Message" active-class="active-icon" class="link">下载详情</router-link>
      <router-link to="/detail" active-class="active-icon" class="link">番剧详情</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less" scoped="">
a{
text-decoration: none;

}
.link{font-size: 30px;
color:white;
display: block;


width: 60px;
margin:10px 10px;
&:hover{
  color:rgba(210,210,210,0.7);
}
}
#app {
  display: flex;

  
  #nav{
    text-align: center;
   
position: fixed;
  }
}
  #navload{
 width: 90px;
  border-right:1px solid rgba(255,255,255,0.3);
  }
.active-icon{
  color:rgba(210,210,210,0.7);
  background:rgba(100,100,100,0.6);
  border-radius: 6px;
}
body,html{
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:white;
    background: rgba(36,40,47,1);
 min-height: 1200px;
}
nav {
  padding: 30px;


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
