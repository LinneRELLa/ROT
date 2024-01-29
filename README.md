# 介绍

开发请使用yarn electron:serve命令
新番下载工具，基于aira2和miobt，acgrip等种子站，目前仅在windows进行了测试
下载番剧时会根据番剧名称自动创建文件夹
![image text](https://raw.githubusercontent.com/LinneRELLa/ROT/master/imgs/readme4.png)
__因种子站被墙，下载番剧前（有时可能）需要在修改aria2/start.bat最后的--all-proxy选项__

示例:
@echo off & title Aria2
aria2c.exe --conf-path=aria2.conf --all-proxy=http://127.0.0.1:7890

![image text](https://raw.githubusercontent.com/LinneRELLa/ROT/master/imgs/readme1.png)
![image text](https://raw.githubusercontent.com/LinneRELLa/ROT/master/imgs/readme2.png)
![image text](https://raw.githubusercontent.com/LinneRELLa/ROT/master/imgs/readme3.png)




# 致谢
* https://github.com/aria2/aria2