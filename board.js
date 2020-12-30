'use strict'

function loadContent()
{
    return fetch('../data/board.json')
    .then(res=>res.json())
    .then(json=>json.contents);
}

function display(contents)
{
    const container=document.querySelector('.contents');
    container.innerHTML=contents.map(content=>getHtml(content)).join('');
}


function getHtml(content)
{
    return `
        
            <div class="content">
                <div class="pic">
                    <img src='../img+video/profile.jpg' alt="profile">
                    <span class="content_writer">${content.writer}</span>
                </div>
                <div class="main">
                    
                    <span class="title">${content.title}</span>
                    <span class="date">${content.date}</span>
                    <span class="writing">${content.content}</span>
                    <div class="keyword">
                        <span>${content.words}</span>
                    </div>
                </div>
            </div>
            
    `
}


function openWindow()
{
    const btn=document.querySelector('.add_content');
    const window=document.querySelector('.writing_window');

    btn.addEventListener('click',()=>{
        window.style.display='flex';
        document.querySelector('.window_title').value="";
        document.querySelector('.window_writer').value="";
        document.querySelector('#window_content').value="";
        document.querySelector('.tags').value="";
    });
}


function addData()
{
   const close_btn=document.querySelector('.close');
   const submit_btn=document.querySelector('.submit');
   const window=document.querySelector('.writing_window');
   const contents=document.querySelector('.contents');

   close_btn.addEventListener('click',()=>{
       window.style.display='none';
   })


   submit_btn.addEventListener('click',(e)=>{
       alert('Successed!');
       e.preventDefault();
        const window_title=document.createTextNode(document.querySelector('.window_title').value);
        const window_writer=document.createTextNode(document.querySelector('.window_writer').value);
        const window_content=document.createTextNode(document.querySelector('#window_content').value);
        const window_tags=document.createTextNode(document.querySelector('.tags').value);
        const current_date=document.createTextNode(currentDate());
        
        
        

         //making elements
        let div1=document.createElement('div');
        let div2=document.createElement('div');
        let div3=document.createElement('div');
        let div4=document.createElement('div');
        let img=document.createElement('img');
        let span1=document.createElement('span');
        let span2=document.createElement('span');
        let span3=document.createElement('span');
        let span4=document.createElement('span');
        let span5=document.createElement('span');

        
        //create attributes
            div1.setAttribute('class','content');
            div2.setAttribute('class','pic');
            img.setAttribute('src','../img+video/profile.jpg');
            img.setAttribute('alt','profile');
            div3.setAttribute('class','main');
            div4.setAttribute('class','keyword');
            span1.setAttribute('class','title');
            span2.setAttribute('class','date');
            span3.setAttribute('class','content_writer');
            span4.setAttribute('class','writing');
        

            //append child node 
            contents.appendChild(div1);
            div1.appendChild(div2);
            div2.appendChild(img);
            div2.appendChild(span3);
            div1.appendChild(div3);
            div3.appendChild(span1);
            div3.appendChild(span2);
            div3.appendChild(span4);
            div3.appendChild(div4);
            div4.appendChild(span5);
            span1.appendChild(window_title);
            span2.appendChild(current_date);
            span3.appendChild(window_writer);
            span4.appendChild(window_content);
            span5.appendChild(window_tags);
            window.style.display='none';
        
   });

}

function currentDate()
{
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();

    return `${year}-${month}-${day}`;
}



loadContent()
.then(contents=>{
    console.log('hello');
    display(contents);
    openWindow();
    addData();
}).catch(console.log);