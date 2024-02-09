const r=10,c=15;
const si=0,sj=1,di=8,dj=9;
var arr=[];// this will help to make barrier
for(let i=0;i<r;i++)
{
    let row=document.createElement("div");
    row.className="row";
    let row1=document.createElement("div");
    row1.className="row1";
    // let parent_div=document.querySelector(".container");
    let parent_div=document.getElementsByClassName("container");
    // console.log(parent_div);
  parent_div[0].appendChild(row);
//   console.log(parent_div[0].children);
arr[i]=[];

    for(let j=0;j<c;j++)
    {
        let square=document.createElement("div");
if(i==si&&j==sj)
{ 
    square.className="source";
    square.style.backgroundColor="blue";
}
if(i==di&&j==dj)
{
    square.className="destination";
    square.style.backgroundColor="blue";
}
square.setAttribute("data-row",i);
square.setAttribute("data-col",j);
arr[i][j]=1;
var parent=document.getElementsByClassName("row");
if(square.classList.contains("column")===false)// it is not required
{square.classList.add("column");}
parent[parent.length-1].appendChild(square);
// parent[parent.length-1].children[len-1].classList.add("me");
// console.log(parent,"this is parent",parent.length);
    }

}

// this one is for color change 
const container=document.getElementsByClassName("column");
for (let i=0;i<container.length;i++)
{ var x=container[i].getAttribute("data-row");
    var y=container[i].getAttribute("data-col");
    if((x==si&&y==sj)||(x==di&&y==dj))
    continue;
    // console.log(container[i]);
    container[i].addEventListener("pointerover",function(){      
        let cur_color=this.style.backgroundColor;
        if(cur_color==""||cur_color=="red"||cur_color=="gray")

{
this.style.backgroundColor="white";
const x=this.getAttribute("data-row");
const y=this.getAttribute("data-col");
arr[+x][+y]=1-arr[+x][+y];
}    
        else

{
this.style.backgroundColor="red";
const x=this.getAttribute("data-row");
const y=this.getAttribute("data-col");
arr[+x][+y]=1-arr[+x][+y];
}
// console.log(this.style.backgroundColor);
});

}
// click for run

const run=document.getElementsByClassName("btn")[0];
run.addEventListener("click",()=>{
    const cL=document.getElementsByClassName("column");
    for(let i=0;i<cL.length;i++)
        {var cur=cL[i].style.backgroundColor;
            if(cur=="blue"||cur=="white")
                continue;
            else
                cL[i].style.backgroundColor="red";
        }
    algo_1();
})


// click for reset
const reset=document.getElementsByClassName("btn")[1];
reset.addEventListener("click",()=>{
    location.reload();
})


// algo to print the path
function show(mp)
{
    var cur;
    var next=`${di}_${dj}`;
    while(true)
    {
       cur=next;
       if(!(cur==`${si}_${sj}` || cur==`${di}_${dj}`))
      { var idx=cur.indexOf('_');
       var i=cur.slice(0,idx);
       var j=cur.slice(idx+1);
       var pth=document.querySelector(`div[data-row="${i}"][data-col="${j}"]`);
       pth.style.backgroundColor="green";
      }
       next=mp.get(cur);

if(next==`${si}_${sj}`)
break;
    }


}

// algo 1 for finding the shoretest path
function d(){
for(let i=0;i<r;i++)
{
    for(let j=0;j<c;j++)
    {
        console.log(arr[i][j]);
    }
}
}
let check=0;
function algo_1()
{
let vis=new Set();// for visited or not
vis.add(`${si}_${sj}`);
let mp=new Map();
let count=0;
    var q=[];
    q.push([si,sj]);
    while(q.length!=0)
    {
       
        let len=q.length;
var q1=[];
        for(let i=0;i<len;i++)
        {
            let x= +q[i][0];
            let y= +q[i][1];
            var p=[0,1,0,-1,0];// this will help to go in the 4 directions
            if(di==x&&dj==y)
            {
                show(mp);// this will print the path
                check=1;
                return count;
            }
           
            for( let j=0;j<4;j++)
            {
                let x1=x+p[j];
                let y1=y+p[j+1];
                if(x1>=0&&x1<r&&y1>=0&&y1<c&&!vis.has(`${x1}_${y1}`)&&arr[x1][y1]==1)
                {  
                    if(!(x1==di&&y1==dj))   
                    {var now=document.querySelector(`div[data-row="${x1}"][data-col="${y1}"]`);
                    now.style.backgroundColor="gray";}
                    //add in the queue if not already taken
                    mp.set(`${x1}_${y1}`,`${x}_${y}`);

                    q1.push([x1,y1]);

                    vis.add(`${x1}_${y1}`);  // make x1 and y1 visited
                    

                }

              
            }
        }
        count++;
        q=q1;

    }
if(check==0)
alert('No path is possible !!');
return count;
}
