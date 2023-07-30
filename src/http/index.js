import axios from 'axios'
import aria2path from '../config/path.js'

const http=axios.create({
	baseURL:'http://185.243.241.36:4016',
   timeout:0,
   method:'post'

})

const downurl=axios.create({
  baseURL:'https://tv.rellal.com:9099/acg',
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







const normal=(data)=>{return http({
	url:'/api/iniInfo',
  data,
})}  

const download=(key,page)=>{
  console.log(`/page/${page}.xml?term=${key}`);
  return downurl({
   url:`/page/${page}.xml?term=${key}`

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