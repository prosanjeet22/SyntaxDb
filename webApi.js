(()=>{window.addEventListener('load',async()=>{
    let response= await getDataFromApi('categories');
    appandMainMenu(response);
})



async function getDataFromApi(url)
{
       let data= await fetch(`https://syntaxdb.com/api/v1/languages/javascript/`+url);
        return await data.json();
}

function appandSubMenu(menuData,targetElement){             //Adding Categories Concept TO MainMenu
   let subMenu=getMenuItem(menuData,'subMenu');
   targetElement.firstElementChild?.remove();
   targetElement.appendChild(subMenu);
}


function appandMainMenu(mainMenuItem){

     let menu=getMenuItem(mainMenuItem,'mainMenu');
     document.getElementById('mainMenu').appendChild(menu);
}


function getConcept(menuDataId){
          const {concept_name,description,syntax,notes,example}=conceptArray[menuDataId];
          return{
            [concept_name]:description,
            ['syntax']:syntax,
            ['Notes']:notes,
            ['Example']:example,
            }
}
function displayConceptData(menuItemId)
{
    let content = document.getElementById('contentData');
     content.innerHTML='';
     const concepts = getConcept(menuItemId);
   for(key in concepts){
       let div=document.createElement('div');
       let h2=document.createElement('h2');
       h2.innerHTML=key;
       let pre=document.createElement('pre');
       pre.innerHTML=concepts[key];
       div.appendChild(h2);
       div.appendChild(pre);
       content.appendChild(div);
   }

}


let conceptArray=[]; //For Storing the concept data

function getMenuItem(MenuDataItem,menuType)
{
          let menu=document.createElement('div');
          menu.className=(menuType==='mainMenu')?'mainMenu':'subMenu';
            if(menuType==='subMenu')
             {
                 conceptArray=MenuDataItem;
            }
          let menuItemId=0;
          MenuDataItem.forEach(async({category_name,concept_name,id})=>{
          let menuItems = document.createElement('div');
           if(menuType  ==='mainMenu')
             {
          menuItems.innerHTML= category_name;
          menuItems.className='MenuItem';
          menuItems.addEventListener('click',async function(event){
          const data=await getDataFromApi(`categories/${id}/concepts`)//Passing the Catogeries id 
           appandSubMenu(data,event.target);
   })

}
else{
   menuItems.innerHTML=concept_name;
   menuItems.className='subMenuItem';
   let displayBind=displayConceptData.bind(null,menuItemId);
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
}})();