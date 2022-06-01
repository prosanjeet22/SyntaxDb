(() => {
    window.addEventListener('load', async () => {
        let response = await getDataFromApi('categories');
        appendMainMenu(response);
    })



    async function getDataFromApi(subDirectory) {
        let data = await fetch(`https://syntaxdb.com/api/v1/languages/javascript/${subDirectory}`);
        return await data.json();
    }

    function appendSubMenu(menuData, targetElement) {             //Adding Categories Concept TO MainMenu
        let subMenu = getMenuItem(menuData, 'subMenu');
        targetElement.firstElementChild?.remove();
        targetElement.appendChild(subMenu);
    }


    function appendMainMenu(mainMenuItem) {
        
        let menu = getMenuItem(mainMenuItem, 'mainMenu');
        document.getElementById('mainMenu').appendChild(menu);
    }


    function getConcept(menuDataid) {
        const { concept_name, description, syntax, notes, example } = conceptArray[menuDataid];
        return {
            [concept_name]: description,
            ['syntax']: syntax,
            ['Notes']: notes,
            ['Example']: example,
        }
    }


    function displayConceptData(menuItemId) {
        let content = document.getElementById('contentData');
        content.innerHTML = '';
        const concepts = getConcept(menuItemId);
        for (key in concepts) {
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerHTML = key;
            let pre = document.createElement('pre');
            pre.innerHTML = concepts[key];
            div.appendChild(h2);
            div.appendChild(pre);
            content.appendChild(div);
        }

    }


    
function getMainMenu(menuItems,category_name,id){
    menuItems.innerHTML = category_name;
    menuItems.className = 'MenuItem';
    menuItems.addEventListener('click', async function (event) {
        const data = await getDataFromApi(`categories/${id}/concepts`)//Passing the Catogeries id 
        appendSubMenu(data, event.target);
    })
    
}

function getConceptNameContent(menuItems,concept_name,index){
    menuItems.innerHTML = concept_name;
    menuItems.className = 'subMenuItem';
    menuItems.addEventListener('click', function (event) {
        event.stopPropagation();
        displayConceptData(index);
    })
}

let conceptArray = []; //For Storing the concept data
    function getMenuItem(menuDataItem, menuType) {
        let menu = document.createElement('div');
        menu.className = (menuType === 'mainMenu') ? 'mainMenu' : 'subMenu';
        if (menuType === 'subMenu') {
            conceptArray = menuDataItem;
        }
        menuDataItem.forEach(async ({ category_name, concept_name, id }, index) => {
        let menuItems = document.createElement('div');
        (menuType=='mainMenu')?getMainMenu(menuItems,category_name,id):getConceptNameContent(menuItems,concept_name,index);
            menu.appendChild(menuItems);
        });
        return menu;
    }
})();