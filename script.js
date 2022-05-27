window.addEventListener('load',async()=>{
     let response= await FeatchDataFromApi('https://syntaxdb.com/api/v1/languages/javascript/categories');
     AddInParentList(response);
})
let concept_Array=[];



async function FeatchDataFromApi(url)
{
        let data= await fetch(url);
         return await data.json();
}

function AddInchildList(menuData,targetElement)
{
    let submenuItem=targetElement;
    let submenu=getMenuItem([...menuData],'subMenu');
    console.log(menuData);
    submenuItem.firstElementChild?.remove();
    submenuItem.appendChild(submenu);
}


function AddInParentList(mainmenuItem)
{

      let sideBar=document.getElementById('mainMenu');
      let menu=getMenuItem([...mainmenuItem],'mainMenu');
      sideBar.appendChild(menu);
}


function getConcept(menuDataid)
{
           const {concept_name,description,syntax,notes,example}=concept_Array[menuDataid];
           console.log(concept_Array[menuDataid]);
           let concept={
             [concept_name]:description,
             ['syntax']:syntax,
             ['Notes']:notes,
             ['Example']:example,
}
return concept;

}
function displayconcept(menuItemId)
{
      //console.log(menuItemId);
     let content = document.getElementById('c1');
      content.innerHTML="";
      const concept = getConcept(menuItemId);
    
    for(key in concept){
        let div=document.createElement('div');
        div.className="conceptSection"
        let h2=document.createElement('h2');
        h2.innerHTML=key;
        let pre=document.createElement('pre');
        pre.innerHTML=concept[key];
        div.appendChild(h2);
        div.appendChild(pre);
        content.appendChild(div);
    }

}



function getMenuItem(MenuDataItem,menuType)
{
    //console.log(MenuDataItem);

let menu=document.createElement('div');
menu.className=(menuType=='mainMenu')?'mainMenu':'subMenu';
if(menuType=='subMenu')
{
    concept_Array=[...MenuDataItem];
}
let menuItemId=0;

MenuDataItem.forEach(async({category_name,concept_name,id})=>{
    let menuItems = document.createElement('div');
    //console.log(menuType);
    if(menuType  ==='mainMenu')
     {
    menuItems.innerHTML= category_name;
    menuItems.className='MenuItem';
    //console.log(id);
    menuItems.addEventListener('click',async function(event){
        const data=await FeatchDataFromApi(`https://syntaxdb.com/api/v1/languages/javascript/categories/${id}/concepts`)
        AddInchildList(data,event.target);
    })

}
else{
    menuItems.innerHTML=concept_name;
    //console.log(concept_name);
    menuItems.className='subMenuItem';
    let displayBind=displayconcept.bind(null,menuItemId);
    menuItems.addEventListener('click',function(event)
    {
        event.stopPropagation();
        displayBind();

    })
    
}
menuItemId++;
menu.appendChild(menuItems);
});
return menu;
}