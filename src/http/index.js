import axios from 'axios'
import aria2path from '../config/path.js'

const http=axios.create({
	baseURL:'http://185.243.241.148:4016',
   timeout:0,
   method:'post'

})

const downurl=axios.create({
  baseURL:'https://www.rellal.com:9099/acg',
   timeout:0,
   method:'get'

})


const addurl=axios.create({
baseURL:'http://127.0.0.1:6800/jsonrpc',
   timeout:0,
   method:'post'
})

/*http.interceptors.request.use(config => {
  let url = config.url.split('/')[2];
  let RORELTOKEN=localStorage.getItem('RORELTOKEN')
  let token=RORELTOKEN==null?'':JSON.parse(RORELTOKEN).token
  if(url=='ac'){


  	config.headers.Token=token
  }
  return config;
},);

http.interceptors.request.use(
    config=>{

config.headers.axios=true;
  return config;
    }

	)*/
const zhoushan=axios.create({
  baseURL:'http://sgpt.slj.jinhua.gov.cn:9897/apistatistic/screen/getBillboardLis',
  method:'get',
})






const normal=()=>{return http({
	url:'/api/iniInfo'
})}  

const download=(key)=>{
  return downurl({
   url:`/1.xml?term=${key}`

  })
}
const add=(key='',url='')=>{
  console.log(JSON.stringify(
    {'jsonrpc':'2.0', 
    'method':'aria2.addUri', 
    'params':[[url],{
    'dir':`../Download/${key}`,}],
  'id':'add',
  },
   

    ))
 return addurl({
   data:JSON.stringify(
    {'jsonrpc':'2.0', 
    'method':'aria2.addUri', 
    'params':[[url],{
    'dir':`../Download/${key}`,}],
    
    'id':'add',
  },
   

    ),
     

})

}

export {normal,download,add}