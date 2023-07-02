const url =require('url');
const path =require('path');
const fs=require('fs');
// static base path: location of your static 
// folder
const staticBasePath=path.join(__dirname,'..','static');
const respond=(request,response)=>{
    //before working with the pathname you,
    // need to decode it
    // get the corresponding full static path located in the static folder
   
    let myUrl= new URL(request.url, "http://127.0.0.1:3001/",true);
let pathname=myUrl.pathname;
//if favicon.ico stop
if(pathname==='favicon.ico'){
    return false;
}

pathname= decodeURIComponent(pathname);
// get the corresponding full static path located
// in the static folder 
const fullStaticPath=path.join(staticBasePath,pathname);
// can we find something in fullStaticPath?
// no send '404' : file not found!;
if(!fs.existsSync(fullStaticPath)){
    console.log(`${fullStaticPath} not exist`);
    response.write('404: not found')
    response.end();
    return false;
}
// we found something
// is it a file or directory
let stats;
try{
 stats=   fs.lstatSync(fullStaticPath)
}catch(error){
    console.log(`${error}`)
}
if(stats.isDirectory()){
    // get content from the template index.html
    let data=fs.readFileSync(path.join(staticBasePath,'project_files/index.html'),'utf-8');


    // build a page title
    console.log(pathname);
    let pathElements=pathname.split('/').reverse();
pathElements=pathElements.filter(element=>element!=='');
const folderName=pathElements[0];
    console.log(folderName);
    data=data.replace('Page_title',folderName);
    response.statusCode=200;
    response.write(data);
    response.end();
    // build a breadcrumb
    // build table rows(main_content)
    // fill the template data with: the page
    // title,breadcrumb and table rows
    // rint data to webpage
}
}
module.exports=respond;
