const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('storage')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'B',logoType:'text',url:'https://bilibili.com'},
]
const removeX=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //删除'/'开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${removeX(node.url)}</div>
                    <div class="close">
                        <img src='../icons/close.png' style='width:25px'>
                    </div>
                </div>
            </li>`).insertBefore($lastLi)
            $li.on('click',()=>{
                window.open(node.url)
            })
            $li.on('click','.close',(e)=>{
                e.stopPropagation() //阻止冒泡
                hashMap.splice(index,1)
                render()
            })
    })
}
render()
$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请输入添加的网址：')
        if(url.indexOf('http')!== 0){
            url = 'https://' + url
        }
        hashMap.push({
            logo:url[8].toUpperCase(),
            logoType:'text',
            url:url})
    render()
 })

 window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('storage',string)
 }

//  $(document).on('keypress',(e)=>{
//      const key = e.key
//      // const {key} = e 可以简写
//      for(let i =0;i<hashMap.length;i++){
//          if(hashMap[i].logo.toLowerCase()=== key){
//              window.open(hashMap[i].url)
//          }
//      }
//  })

 