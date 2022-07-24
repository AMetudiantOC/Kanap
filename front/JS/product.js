//----------------------------------------------------------------------
// Récupération de l'ID des produits
//----------------------------------------------------------------------

// on récupére l'id avec les paramétres de l'url
let idProduct = new URL(window.location.href).searchParams.get("_id");

// on affiche le résultat dans la console
console.log(idProduct);

//----------------------------------------------------------------------
// Récupération des sélecteurs css et des id du HTML pour après
//----------------------------------------------------------------------

// on récupère le selecteur css pour pouvoir mettre l'image après
let picture     = document.querySelector(".item__img");

// on récupère l'id "title" du document HTML
let title       = document.getElementById("title");

// on récupère l'id "price" du document HTML
let price       = document.getElementById("price");

// on récupère l'id "description" du document HTML
let description = document.getElementById("description");

// on récupère l'id "colors" du document HTML
let colorsArray = document.getElementById("colors");

//----------------------------------------------------------------------
// Fonction pour récuperer les données de l'api avec l'id du produit
//----------------------------------------------------------------------

// On déclare la fonction pour récupérer les données de l'API
const getProduct = async() => {

  // on va chercher l'API avec la méthode fetch et on ajoute notre variable qui contient l'id
    await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => res.json()
    .then(json => product = json));
    
    console.log(product);

    // on appel la fonction d'affichage du produit
    showProduct(product);
};

// On appel la fonction précédente
getProduct();

//----------------------------------------------------------------------
// Fonction d'affichage de la page produit
//----------------------------------------------------------------------

// fonction permet de lier les élements HTML que l'on va créer avec les données de l'api
function showProduct(product) {

  // on crée et ajoute les balises "img" pour y mettre les images
  let image = document.createElement("img");

  // on règle les attributs de "img" comme on le ferait en HTML
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);
  image.setAttribute('title', "ceci est l'image du " + product.name);

  // on ajoute l'image en tant qu'enfant de la variable "picture" (qui fait référence à la balise ayant une classe CSS ".item__img")
  picture.appendChild(image);

  // on ajoute le nom
  title.innerHTML = product.name;

  // on ajoute les prix
  price.innerHTML = product.price;

  // on ajout la description
  description.innerHTML = product.description;

  // On va chercher les couleurs du tableau colors avec une boucle for et on créait la liste d'option de couleurs
  for (let i=0; i < product.colors.length; i++) {

    // on crée la balise "option"
    let color = document.createElement("option");

    // on règle ses attributs
    color.setAttribute('value', product.colors[i]);

    // ajout du code HTML 
    color.innerHTML = product.colors[i];
    
    // que l'on place au bon endroit dans le HTML
    colorsArray.appendChild(color);
  }
}

//----------------------------------------------------------------------
// Fonction pour ajouter les articles dans le panier
//----------------------------------------------------------------------

// on stock l'id dans une variable
let quantity = document.getElementById("quantity");

// on cible la balise du bouton
let button = document.getElementById("addToCart");
let clickNumber = 0;

/* on écoute la variable "button" au "click"
le code se déclenche au click */
button.addEventListener("click", () => {

  // on utilise la méthode "Object.assign" pour ajouter l'objet "product" qui contient les données du canapé // le tout devient un objet "addIdAndValue"
  const addIdAndValue = Object.assign({}, product, {

    // on y ajoute l'id
    addIdProduct: `${idProduct}` ,

    // on y ajoute la couleur sélectionnée
    addColors: `${colorsArray.value}` ,

    // on y ajoute la quantité selectionnée
    addQuantity: `${quantity.value}` ,
  });

  // variable qui permet de vérifier si le localstorage est vide ou non
  const store = localStorage.getItem('prod');

  if(quantity.value > 100) {

    alert ("pas possible")

  } else {

    if(store != null){

      // on crée une variable "prodArray" et on utilise la méthode ".parse" pour convertir en JSON ce que l'on récupère dans le localstorage (convertit du string en JSON)
      let prodArray  = JSON.parse(localStorage.getItem("prod"));
  
      // on compare les attributs (id et couleur) de chaque objet // on déclare une variable "foundProduct" qui nous retourne le résultat de la comparaison (par ses critères)
      let foundProduct = prodArray.find(p => p.addIdProduct == addIdAndValue.addIdProduct && p.addColors == addIdAndValue.addColors);
  
      // si le produit est déjà dans le localstorage
      if(foundProduct != undefined) {
        foundProduct.addQuantity++;
  
      } else {
      // on ajoute l'article et ses données ("addIdAndValue") à ma liste/panier ("prodArray")
        prodArray.push(addIdAndValue);
      }
  
      // on enregistre la commande dans le localstorage (on convertit du JSON en string) // le localStorage n'enregistre que que du string !
      localStorage.setItem("prod",JSON.stringify(prodArray));
  
    } else {
  
      // sinon on initialise le store avec le premier article sous forme de tableau ([])
      localStorage.setItem("prod",JSON.stringify([addIdAndValue]));
    }
  }
})


//----------------------------------------------------------------------

const addBasket = () => {

  // on cible la balise du bouton
  let button     = document.getElementById("addToCart");

  // on stock l'id dans une variable
  const quantity = document.getElementById("quantity");

  // on utilise la méthode .parse pour les convertir en JSON
  let prodArray  = JSON.parse(localStorage.getItem("prod")); 
  console.log(product);

  /* on écoute la variable "button" au "click"
  le code se déclenche au click */
  button.addEventListener("click", () => {
  
    // si la quantité est supérieure à 0 et que la quantité est inférieure ou égale à 100 et qu'il y a une couleur selectionnée, alors tu m'exécutes le code si dessous
    if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value.length != 0) { 
  
  //----------------------------------------------------------------------
  // Fonction qui récupère ce qu'il y a dans le local storage dans une variable avec un objet "prod"
  //----------------------------------------------------------------------

  // on utilise la méthode "Object.assign" pour ajouter
  const addIdAndValue = Object.assign({}, product, {

    // on ajoute l'id
    addIdProduct: `${idProduct}` ,

    // on ajoute la couleur sélectionnée
    addColors: `${colorsArray.value}` ,

    // on ajoute la quantité selectionnée
    addQuantity: `${quantity.value}` ,
  });

  console.log(addIdAndValue);

  //----------------------------------------------------------------------
  // Fonction ajouter un produit séléctionné dans le local storage
  //----------------------------------------------------------------------

  const addProductLocalStorage = () => {

    // on push la const avec la méthode .push
    prodArray.push(addIdAndValue); 

    // on met "prod" dans le local storage et on transforme "prodArray" en string dans notre local storage
    localStorage.setItem("prod", JSON.stringify(prodArray)); 
  };

  if (prodArray) { 
      console.log(prodArray);
  }

  else {
      prodArray = [];
      console.log(prodArray);
  }

  addBasket(prodArray, idProduct, colorsArray.value);

  //----------------------------------------------------------------------
  // Fonction pour ajouter un produit ou modifier la quantité dans le localstorage.
  //----------------------------------------------------------------------

  function addBasket (product, id, colors) { 

      let basket       = product;
      let foundProduct = basket.find(p => p.addIdProduct == id && p.addColors == colors);

      // si le produit est déjà dans le localstorage
      if(foundProduct != undefined) {
         foundProduct.addQuantity++;
         console.log(foundProduct.addQuantity);
         localStorage.setItem("prod", JSON.stringify(prodArray));
      }

      // si le produit n'est pas dans le localstorage.
      else {
           
         addProductLocalStorage(); 
         console.log("ko");
              
      }
      alert("Le produit a été ajouté à votre panier");
    }
  }

  else { 
      alert("veuillez selectionner une couleur et une quantité comprise entre 1 et 100"); 
  }     
  });
};

//----------------------------------------------------------------------