<template>
    <div id="hello">
        <div id="newTask" v-if="fileName!=undefined" class="toollip">
            <div style="text-align: right;align-self: stretch;margin-bottom: 8px"><i class="el-icon-close" @click="back" style="cursor: pointer;"></i></div>
            <textarea v-model="fileName" class="textarea" rows="8" disabled></textarea>
            <p style="font-size: 10px;">下载到:</p>
            <div class="outin"><input class="input" v-model="path" placeholder="下载目录（默认为当前目录下Download文件夹）">
                <el-button icon="el-icon-folder-opened" @click="openFile"></el-button>
            </div>
            <div :class="Rdnd" @click='Post'>立即下载</div>
        </div>
        <div id="mask" v-if="fileName!=undefined" @click="back()"></div>
        <div style="flex-basis: 100%;">{{this.$route.query.key}}</div>
        <div style="flex:1;flex-basis: 100%;display: flex;justify-content: center;align-items: center;">
            <div @click="down($route.query.key,--page)" style="text-align: right;" class="fanye"><i class="el-icon-caret-left" v-if="this.page!=1" /></div>
            第{{page}}页
            <div @click="down($route.query.key,++page);" class="fanye"> <i class="el-icon-caret-right" /></div>
        </div>
        <div class="nodec">最近下载:{{this.last}}</div>
        <div v-for="(x,k) of nodes" class="nodec"> <span v-html="k" />
            <div v-for="i of x" class="node"><span v-html="i.t" />
                <div style="display: flex;align-items: center;">
                          <button @click="copy($route.query.key,i.b,i.t)" v-if="(i.t!='暂无结果')&&i.t!='正在加载'" ><i class="el-icon-copy-document" /></i></button>
                <button @click="openPop($route.query.key,i.b,i.t)" v-if="(i.t!='暂无结果')&&i.t!='正在加载'"><i class="el-icon-download" /></i></button> 
                </div>
         </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import { download, add, back } from "../http"

export default {
    name: 'detail',
    created() {
        this.down(this.$route.query.key, this.page);
        this.$electron.ipcRenderer.invoke('getstore', this.$route.query.key).then((m) => {
            console.log(m, 'm');
            this.last = m;
        });

            this.$electron.ipcRenderer.invoke('getstore', 'path').then((m) => {
                console.log(m, 'm');
                this.path = m;
            });

    },
    computed: {
        Rdnd() {
            return this.fileName ? 'Rdnd-active' : 'Rdnd'
        }
    },
    methods: {
        Post() {
            this.addurl(this.key, this.url, this.des, this.path)
        },
        openPop(key, url, des) {
            this.fileName = des;
            this.key = key;
            this.url = url;
            this.des = des;
        },
        async copy(key, url, des){
         await navigator.clipboard.writeText(url);
          window.alert('复制成功');
        },
        openFile() {
            this.$electron.ipcRenderer.invoke('selectpath', this.$route.query.key).then((m) => {
                if (m[0]) {
                    this.path = m[0];
                }
                console.log(m, 'm');
            });

        },
        back() {
            this.fileName = undefined;

        },
        addurl(key, url, des, path) {


            back({ key, url, des }).then((res, err) => {
                if (err) {
                    console.log('err')
                } else {
                    console.log(res)
                }
            })
            add(key, url, path);
            if(path){
              this.$electron.ipcRenderer.send('setstore', { key:'path', des:path });  
            }
            this.$electron.ipcRenderer.send('setstore', { key, des });
            this.$electron.ipcRenderer.invoke('getstore', key).then((m) => {
                console.log(m, 'm');
                this.last = m;
            });

            window.alert('添加下载任务成功');
        },
        down(key, page) {
            this.nodes = { ROREL: [{ t: '正在加载' }] };
            download(key, page, this.$store.state.proxy).then((res, rea) => {


                this.response = res.data;

                this.parse();
            })
        },
        parse() {
            const pag = []
            const a = this.response.match(/<item>(.|\n)*?<\/item>/gm) || [];
            for (let x of a) {

                const t = x.replace(/(.|\n)*?<title>((.|\n)*?)<\/title>(.|\n)*/gm, '$2');
                const d = x.replace(/(.|\n)*?<description>((.|\n)*?)<\/description>(.|\n)*/gm, '$2');

                const l = x.replace(/(.|\n)*?<enclosure url="((.|\n)*?)"(.|\n)*\/>(.|\n)*/gm, '$2');
                let b;
                if (!this.$store.state.proxy) {
                    b = l.replace(/acg.rip/, 'tv.rellal.com:9099/acg')
                } else {
                    b = l;
                }


                pag.push({ t, d, b })


            }




            function nodetotree(array) {
                if (!array.length) { return [] }
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

            this.nodes = nodetotree(pag)

            if (JSON.stringify(this.nodes) == '[]') {

                this.nodes = { ROREL: [{ t: '暂无结果' }] }
            }
        }


    },
    data() {
        return {
            fileName: undefined,
            path: undefined,
            response: '',
            nodes: [{ ROEL: '正在加载...' }],
            page: 1,
            last: '暂无',
            key: undefined,
            url: undefined,
            des: undefined,
        }
    }

}
</script>
<style lang="less" scoped="">
#hello {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    width: 100%;


}

div {

    font-size: 18px;
    text-align: left;
    flex-wrap: wrap;
    margin: 10px 10px 0 10px;
    font-size: 25px;

}

span:hover {
    cursor: pointer;
}

.fanye {
    &:hover {
        color: rgba(255, 255, 255, 0.3);
    }
}

.node {
    font-size: 18px;
   
    &:hover {
        background: rgba(199, 199, 210, 0.3);

    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0 40px;
}

.nodec {
    display: flex;
    justify-content: column;
    align-items: center;
    width: 100%;

}
</style>
<style lang="less" scoped>
.tasks {
    width: 400px;
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
    position: relative;
}

.task:nth-of-type(1) {}

.task:hover {
    background: rgba(229, 240, 254, 0.1);
}

#mask {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
}

.toollip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    margin: 2px;
    background: rgba(48, 56, 65, 1);
    z-index: 4;
    border-radius: 3px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 2px 32px;
    flex-direction: column;
    border-radius: 4px;
    height: 350px;
}

.title {
    font-size: 16px;
    font-weight: 400;
    color: white;
    padding: 15px 40px;
}

#bkg {
    background: rgba(36, 40, 47);
    width: 100%;
    min-width: 728px;
}

.btn:hover {
    cursor: pointer;
    color: rgba(10, 10, 10, 0.5);
}

.btn {
    color: white;
}

#MessageRight {
    overflow: hidden;
    height: 100%;
    font-size: 128px;
    color: white;
    font-family: 'Vivaldi';
    position: relative;
}

#MessageLeft {
    float: left;
    border-right: 1px solid rgba(4, 4, 4, 0.3);
    height: 100%;
}

#Msgup {
    animation: come 1s ease;
}

#Msgdown {
    animation: come1 1s ease;
}

@keyframes come {
    0% {
        transform: perspective(2000px) translate3d(30px, 30px, 0);
    }

    100% {
        transform: perspective(2000px);
    }
}

@keyframes come1 {
    0% {
        transform: perspective(2000px) translate3d(-30px, -30px, 0);
    }

    100% {
        transform: perspective(2000px) translate3d(0, 0, 0);
    }
}

.Logo {
    transform-style: preserve-3d;
    position: absolute;
    margin: -64px -64px;
    left: 50%;
    top: 50%;
}

.tasktitle {
    width: calc(100% - 20px);
    background: rgb(36, 40, 47);
    overflow: hidden;
    padding: 5px 10px;
}

.content {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: rgb(211, 214, 218);
}

.operate {
    font-size: 20px;
    text-align: center;
}

.input {
    flex: 1 0 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 3px 0 0 3px;
    background: rgba(48, 56, 66, 1.0);

    padding: 0 20px;
    color: white;


}

.textarea {
    width: calc(100% - 8px);
    border: 1px solid rgb(230, 230, 230);
    border-radius: 3px;
    color: white;

}

.textarea:focus-visible {
    border: 1px solid rgb(63, 133, 255);
}

textarea:focus {
    border: 1px solid rgb(63, 133, 255);
    outline: none;
}

input:focus {
    border: 1px solid rgb(63, 133, 255);
    outline: none;
}

.outin {
    width: 100%;
    display: flex;
    margin: 0;

    .el-button {
        background: rgba(48, 56, 66, 1.0);
        border-radius: 0 3px 3px 0;
        border-left: none;
    }

}

/*.outin::before {
    content: "电脑";
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    left: 40px;
}*/

.Rdnd {

    width: 100%;
    text-align: center;
    cursor: pointer;
    background: rgb(245, 245, 245);
    padding: 10px 0;
    margin: 20px 0;
    color: rgb(204, 204, 211);
}

.Rdnd-active {
    padding: 10px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
    background: rgb(38, 112, 234);
    font-size: 16px;
    margin: 20px 0;
    color: white;
}

#dnd {
    border: none;
    border-radius: 3px;
    background: rgba(231, 239, 251, 0.8);
    color: rgba(63, 133, 255);
    cursor: pointer;
    font-size: 18px;
    float: left;
    margin: 10px 20px;
}

#dnd:hover {
    background: rgba(231, 239, 251, 1);
}

#msg {
    border: none;
    border-radius: 3px;
    background: rgba(231, 239, 251, 0.8);
    color: rgba(63, 133, 255);
    font-size: 18px;
    float: left;
    user-select: none;
    margin: 10px 20px;
}

.red {
    color: red;
}

.btntop {
    border: none;
    border-radius: 3px;
    background: rgba(231, 239, 251, 0.8);
    color: rgba(63, 133, 255);
    cursor: pointer;
    font-size: 18px;
    float: left;
    margin: 10px 20px;
}
</style>