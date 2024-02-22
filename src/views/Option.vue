<template>
    <div> 全局代理:<el-switch v-model="open">
        </el-switch>
    </div>
</template>
<script type="text/javascript">
export default {

    data() {
        return {
            open: this.$store.state.proxy,
        }
    },
    watch: {
        open(n) {
             this.$store.commit('switchproxy', n)
            if (n) {

                this.$electron.ipcRenderer.send("set_proxy", {
                    proxy: 'socks5://127.0.0.1:7890',
                });
            } else {
                  this.$electron.ipcRenderer.send("remove_proxy");
            }

        }
    }
}
</script>
<style lang="less"></style>