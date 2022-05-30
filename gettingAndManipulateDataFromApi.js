(()=>{window.addEventListener('load',async()=>{
    let response= await getDataFromApi('categories');
    addInParentList(response);
})



async function getDataFromApi(url)
{
       let data= await fetch(`https://syntaxdb.com/api/v1/languages/javascript/`+url);
        return await data.json();
}

function addInChildList(menuData,targetElement){             //Adding Categories Concept TO MainMenu
   let submenu=getMenuItem(menuData,'subMenu');
   targetElement.firstElementChild?.remove();
   targetElement.appendChild(submenu);
}


function addInParentList(mainmenuItem){
     let menu=getMenuItem(mainmenuItem,'mainMenu');
     document.getElementById('mainMenu').appendChild(menu);
}


function getConcept(menuDataid){
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
function displayConceptData(menuItemId)
{
     //console.log(menuItemId);
    let content = document.getElementById('contentData');
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


let concept_Array=[]; //For Storing the concept data

function getMenuItem(MenuDataItem,menuType)
{
          let menu=document.createElement('div');
          menu.className=(menuType=='mainMenu')?'mainMenu':'subMenu';
            if(menuType==='subMenu')
             {
                 concept_Array=MenuDataItem;
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
           addInChildList(data,event.target);
   })

}
else{
   menuItems.innerHTML=concept_name;
   //console.log(concept_name);
   menuItems.className='subMenuItem';
   let displayBind=displayConceptData.bind(null,menuItemId);
   console.log(displayBind);
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