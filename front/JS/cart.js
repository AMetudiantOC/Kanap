//----------------------------------------------------------------------
// Fonction pour récupérer les données de l'api
//----------------------------------------------------------------------

const fetchProducts = async() => { 
    await fetch('http://localhost:3000/api/products') // on va chercher l'API avec la methode fetch 
    .then(res => res.json()
    .then(json => products = json)); // on fait une promesse en renvoyant la réponse au format JSON. // on définit un paramètre pour products en réutilisant .then 
    

let addProduct = JSON.parse(localStorage.getItem("prod")); // on recupere ce qu'il y a dans le local storage
console.log(addProduct);

const cartDisplay = async () => {

    if (addProduct) { // on récupere bien addProduct 
        await addProduct;
    }
};
cartDisplay();

let allArticles = [];
allArticles.push(addProduct);

//----------------------------------------------------------------------
// Affichage des produits
//----------------------------------------------------------------------

for (let i=0; i < addProduct.length; i++) {

let cartItems = document.getElementById("cart__items");

// on ajoute l'element article
let cartArticles = document.createElement("article");
    cartItems.appendChild(cartArticles);
    cartArticles.setAttribute("data-id", addProduct[i].addIdProduct);
    cartArticles.setAttribute("data-color", addProduct[i].addColors)
    cartArticles.className = "cart__item";
    

// on ajoute l'element div qui va contenir l'img 
let divCartImages = document.createElement("div");
    divCartImages.className = "cart__item__img";
    cartArticles.appendChild(divCartImages);

// on ajoute l'élement img 
let cartImages = document.createElement("img");
    cartImages.setAttribute('src', addProduct[i].imageUrl);
    cartImages.setAttribute('alt', addProduct[i].altTxt);
    divCartImages.appendChild(cartImages);
    
// on ajoute une div
let divCartItems = document.createElement("div");
    divCartItems.className = "cart__item__content";
    cartArticles.appendChild(divCartItems);

// on ajoute une div
let divCartItemsDescription = document.createElement("div");   
    divCartItemsDescription.className = "cart__item__content__description";
    divCartItems.appendChild(divCartItemsDescription);

// ajout du h2 qui va contenir le nom du produit
let divCartItemsDescriptionName = document.createElement("h2");
    divCartItemsDescription.appendChild(divCartItemsDescriptionName);
    divCartItemsDescriptionName.innerHTML = addProduct[i].name;

// ajout d'un p qui va contenir la couleur du produit
let divCartItemsDescriptionColor = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
    divCartItemsDescriptionColor.innerHTML = addProduct[i].addColors;

// ajout d'un p qui va contenir le prix du produit
let divCartItemsDescriptionPrice = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
    divCartItemsDescriptionPrice.innerHTML = products[i].price + " €"; // ici le prix a été récupéré de l'api directement

// ajout d'une div    
let divCartItemsSetting = document.createElement("div");
    divCartItemsSetting.className = "cart__item__content__settings";
    divCartItems.appendChild(divCartItemsSetting);

// ajout d'une div
let divCartItemsSettingQuantity = document.createElement("div");
    divCartItemsSettingQuantity.className = "cart__item__content__settings__quantity";
    divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

// ajout d'un p qui va contenir le mot "Qté :" 
let divCartItemsSettingQty = document.createElement("p");
    divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
    divCartItemsSettingQty.innerHTML = "Qté : ";

// ajout de l'input qui va contenir la quantité 
let inputQuantity = document.createElement("input");
    divCartItemsSettingQuantity.appendChild(inputQuantity); 
    inputQuantity.value = addProduct[i].addQuantity;
    inputQuantity.className = "itemQuantity";
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("name", "itemQuantity");

// ajout d'une div   
let divCartItemsDelete = document.createElement("div");
    divCartItemsDelete.className = "cart__item__content__settings__delete";
    divCartItems.appendChild(divCartItemsDelete);

// ajout d'un p qui va contenir le bouton "Supprimer"   
let pDeleteItem = document.createElement("p");
    pDeleteItem.className = "deleteItem";
    divCartItemsDelete.appendChild(pDeleteItem);
    pDeleteItem.innerHTML = "Supprimer";

//----------------------------------------------------------------------
// Affichage de la quantité et du prix pour les produits
//----------------------------------------------------------------------

    const quantityAndPrice = () => {
    
    let elQuantity = document.getElementsByClassName('itemQuantity'); // on cible la class "itemQuantity"
    let productQuantity = elQuantity.length; // on stock la quantité des produits dans une variable
    totalQuantity = 0; // on fixe la quantité à 0 de base

    for (let j = 0; j < productQuantity; ++j) {
        totalQuantity += elQuantity[j].valueAsNumber; // on va chercher la quantité dans le tableau avec une boucle for    
    }

    let valueQuantity = document.getElementById('totalQuantity'); // on cible l'id totalQuantity
    valueQuantity.innerHTML = totalQuantity; // on ajoute la quantité dans le html 

    console.log(localStorage);

    // affichage du prix total
    let totalPrice = (totalQuantity *= products[i].price); // on fixe la prix total à 0 de base
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    };
    quantityAndPrice();

    // fonction pour modifier la quantité 
    const quantityChanged = () => {
    let qtyModif = document.querySelectorAll(".itemQuantity");
    

    for (let l= 0; l < qtyModif.length; l++) {
        qtyModif[l].addEventListener("change" , (e) => {
        e.preventDefault();
        

        let qtyInputValue = qtyModif[l].valueAsNumber; // on stock la quantité reçu par la boucle dans une variable
    
        addProduct[l].addQuantity = qtyInputValue; // on récupere la quantité du localstorage 

        quantityAndPrice(); // on rappelle la fonction pour que le prix s'actualise en temps réel.   

        localStorage.setItem("prod", JSON.stringify(addProduct)); // on modifie ou supprime la quantité dans le localStorage
   
    });
    }
};
quantityChanged();

//----------------------------------------------------------------------
// Fonction pour supprimer un produit
//----------------------------------------------------------------------

const deleteProducts = () => {
         
    pDeleteItem.addEventListener("click" , (e) => {
        e.preventDefault();
         // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
         let deleteId = addProduct[i].addIdProduct;
         let deleteColor = addProduct[i].addColors;

         // filtrer l'élément cliqué par le bouton supprimer
         addProduct = addProduct.filter( el => el.addIdProduct !== deleteId || el.addColors !== deleteColor);
         console.log(pDeleteItem);


         localStorage.setItem("prod", JSON.stringify(addProduct)); // on modifie ou supprime la quantité dans le localStorage

         location.reload();

    });
    }

deleteProducts();

let btnCommand = document.getElementById("order");

btnCommand.addEventListener("click", (e) => {
e.preventDefault();

const contact = { 
    firstName: document.getElementById("firstName").value,
    lastName:  document.getElementById("lastName").value,
    address:   document.getElementById("address").value,
    city:      document.getElementById("city").value,
    email:     document.getElementById("email").value
}

let contactRegex= [
    firstName.reportValidity(),
    lastName.reportValidity(),
    address.reportValidity(),
    city.reportValidity(),
    email.reportValidity()
]

let products = [];
products.push(addProduct[i].addIdProduct);
console.log(products);

const send = {
    products,
    contact
};

const promise =  {
    method: 'POST',
    body: JSON.stringify(send),
    headers: {
        'Content-Type': 'application/json',
    }
}

let contactRegexEnd = true;
for (let n= 0; n < contactRegex.length; n++) {
    if (contactRegex[n] == false) contactRegexEnd = false;
}
if (contactRegexEnd == true) {
    
    fetch("http://localhost:3000/api/products/order", promise)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
        console.log(data.orderId);
      });
}  
});
};
};
fetchProducts();

//----------------------------------------------------------------------