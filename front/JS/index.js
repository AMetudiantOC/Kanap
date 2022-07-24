//----------------------------------------------------------------------
// Récupération des produits de l'api
//----------------------------------------------------------------------

/* on déclare une constante avec async/await
async s'assure que la fonction renvoie une promesse */
const fetchProducts = async() => { 

    /* on va chercher l'API avec la méthode fetch
    await fait en sorte que JavaScript attende que cette promesse se réalise et renvoie son résultat */
    await fetch('http://localhost:3000/api/products')

    // quand on a la réponse JavaScript donne le résultat en .json (informations sous forme textuelle et structurées)
    .then(res => res.json()

    // les informations reçues en .json seront regroupées dans une variable nommée "products"
    .then(JSON => products = JSON))

    // dans le cas d'une erreur, on remplace le contenu du titre par "erreur 404" (en H1)
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404, sur ressource api:" + err);
      });

    /* on demande le résultat "products" sous forme de tableau dans la console
    pour le nombre de produit, se fier surtour à la ligne "Array" située en-dessous du tableau*/
    console.table(products);

    // on exécute la fonction "showProducts" qui a pour paramètre la réponse de la requête "fetch"
    showProducts(products);

};

//----------------------------------------------------------------------
// Fonction d'affichage des produits de l'api sur la page index.html
//----------------------------------------------------------------------

// on exécute la fonction précédente ("fetchProducts") pour récupérer les données de l'API
fetchProducts();

// on déclare la fonction d'affichage "showProducts" // ici, le paramètre "productsArray" correspond au paramètre "products"
function showProducts(productsArray) {

    /* on déclare une variable de zone pour les articles
    puis, on indique où est ce qu'elle doit être placée en lui assignant la class CSS ("#items") prévue à cet effet */
    let zoneArticle = document.querySelector("#items");

    // on crée une boucle pour aller chercher chaque article 
    for (let i = 0; i < productsArray.length; i++) {

        // on déclare la fonction "element" qui permet de récupérer l'objet à l'index du tableau
        const article = productsArray[i];
        // pour comprendre
        console.log(article);

        /* création et ajout des zones d'articles en HTML (template), insertion de l'adresse produit via chemin produit + paramètres (son "_id")
        La page index est http://.../front/html/index.html donc la page du produit sera http://.../front/html/product.html 
        (d'où le ./product.html) pour rajouter son paramètre on met "?" puis la clé (ici "_id") associé (=) à sa valeur dynamique ${article._id} */
        zoneArticle.innerHTML += 
            `<a href="./product.html?_id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>`;
    }
}

//----------------------------------------------------------------------