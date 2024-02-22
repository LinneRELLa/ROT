<template>
    <div id="app">
        <div id="top">
            <div class="left"><img src="@@/Xlogo2.png" style="height: 100%;position: absolute;left: 10px;
            ">{{mes}}</div>
            <div class="right">
                <div class="minimize" @click="minimize">一</div>
                <div class="close" @click="closewin">X</div>
            </div>
        </div>
        <div class="down">
            <div id="navload">
            </div>
            <div id="nav">
                <router-link to="/home" active-class="active-icon" class="link">首页</router-link>
                <router-link to="/Message" active-class="active-icon" class="link">下载详情</router-link>
                <router-link to="/detail" active-class="active-icon" class="link" v-show="this.$route.name=='detail'">番剧详情</router-link>
                <router-link to="/option" active-class="active-icon" class="link">设置</router-link>
            </div>
            <div class="cont"></div>
            <router-view />
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data(){
      return {
        mes:'',
      }
    },
    methods: {
        minimize() {
            this.$electron.ipcRenderer.send('window-min');
        },
        closewin() {
            console.log('window-close');
            this.$electron.ipcRenderer.send('window-close');
        },
    },
    mounted() {
        const _this=this;
        this.$electron.ipcRenderer.on("message", (event, { message, data }) => {
            console.log(message, data,'updt');
            if (message == 'isUpdateNow') {
                if (confirm("现在更新？")) {
                    this.$electron.ipcRenderer.send("updateNow");
                }
            }
            else{
            _this.mes=message+data;
            }
        });

    },

}
</script>
<style lang="less">
body,
html {
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }
}
</style>
<style lang="less" scoped="">
#root #top {
    height: 42px;
    width: 100%;
    color: white;
    background: rgb(237, 238, 242);
    overflow: hidden;

    img {
        float: left;
    }
}

a {
    text-decoration: none;
}

.link {
    font-size: 30px;
    color: white;
    display: block;
    width: 60px;
    margin: 10px 10px;

    &:hover {
        color: rgba(210, 210, 210, 0.7);
    }
}

#app {
    display: flex;
    flex-direction: column;

    #nav {
        text-align: center;
        position: fixed;
    }
}

#navload {
    width: 90px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.active-icon {
    color: rgba(210, 210, 210, 0.7);
    background: rgba(100, 100, 100, 0.6);
    border-radius: 6px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background: rgba(36, 40, 47, 1);
    min-height: 100vh;
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

#top {
    display: flex;
    justify-content: space-around;
    gap: 4px;
    align-items: center;
    position: fixed;
    width: 100%;
    background: rgb(36, 40, 47);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 31px;
    z-index: 90;

    .left {
        flex: 1;
        height: 31px;
        -webkit-app-region: drag;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right {
        display: flex;

        div {
            cursor: pointer;
            z-index: 99;
            padding-right: 15px;
        }
    }
}

.down {
    display: flex;
    flex-direction: columns;
    margin-top: 31px;
    min-height: calc(100vh - 31px);
}
</style>