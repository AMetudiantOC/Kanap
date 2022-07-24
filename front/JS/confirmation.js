//----------------------------------------------------------------------
// Fonction affichage de la page confirmation
//----------------------------------------------------------------------

const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// 
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// on vide le localstorage
localStorage.clear();

//----------------------------------------------------------------------