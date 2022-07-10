// Setting up the table
let kanapData = [];

// Data recovery
const fetchKanap = async ()=> {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        kanapData = promise;
        console.log(kanapData);
    })
};

// Display of furniture
// We are waiting for fetchKanap to work with his answers
const kanapDisplay = async () => {
    await fetchKanap();

    document.getElementById("items").innerHTML = kanapData.map((kanap) => `
    <a class="items a" href="${kanap._id}">
    <article class="items article"> 
    <div id=card${kanap._id}" class="items article img "></div>
    <img src="${kanap.imageUrl}" alt="image de meuble ${kanap.name}"/>
    <h3 class="items article h3">${kanap.name}</h3>
    <p class="items article p">${kanap.description}</p>
    <p>${kanap.price}€</p>
    </article>
    </a>
    `).join("");

}

kanapDisplay ();
