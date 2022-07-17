
// Fonction pour aller chercher l'api
const fetchProducts = async() => { 
    await fetch('http://localhost:3000/api/products') // on va chercher l'API avec la methode fetch 
    .then(res => res.json()
    .then(JSON => products = JSON)); // on récupere les informations de l'api qu'on va mettre au format json.  
    console.table(products);
};

fetchProducts(); // On appelle la fonction précédente pour récupérer les données de l'API

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const showProducts = async() => {  // on créait une fonction asynchrone et on attends la réponse de fetchProducts.
    await fetchProducts(); 
    
        for (let i=0; i < products.length; i++) { 
           
           let items = document.getElementById("items");

           // Ajout des liens
           let link = document.createElement("a");
           link.setAttribute('href', "product.html?id=" + products[i]._id);
           items.appendChild(link);

           // Création des balises article
           let article = document.createElement("article");
           link.appendChild(article);
           
           // Ajout des images
           let images = document.createElement("img");
           images.setAttribute('src', products[i].imageUrl);
           images.setAttribute('alt', products[i].altTxt);
           article.appendChild(images);
           
           // Création des titres h3
           let title = document.createElement("h3");
           title.innerHTML = products[i].name;
           article.appendChild(title);

           // Création des paragraphes
           let description = document.createElement("p");
           article.appendChild(description);
           description.innerHTML = products[i].description;
    } 
};
showProducts();



 
 


   
    



    

    
    