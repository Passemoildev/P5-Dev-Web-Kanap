// Récupération de l'url de la page pour en récupérer l'ID qui sera la porte d'accès aux bonnes informations
let url=new URL(location.href);
let articleId = url.searchParams.get("id");
// Définition des champs à remplacer dans le document HTML
const champPicture = document.getElementById('test_img');   //image
const champPrice = document.getElementById('price')                 //prix
const champName = document.getElementById('title')                 //nom
const champDescription = document.getElementById('description')     //description du produit
const champColor = document.getElementById('colors')               //couleurs disponibles
const productQuantity = document.getElementById('quantity')  //quantité sélectionnée par l'utilisateur (pour le localstorage)

fetch(`http://localhost:3000/api/products/${articleId}/`)

    // conversion de la réponse de l'API en JSON pour exploitation
    .then((reponse) => reponse.json())
    .then((champ) => {
			const photoKanap = champ.imageUrl;
			const altTexte = champ.altTxt;
			const nomKanap = champ.name;
			const detailKanap = champ.description;
            const priceKanap = champ.price;
            const colorKanap = champ.colors;
            for (let color of colorKanap) {
                champColor.innerHTML += `<option value="${color}">${color}</option>`;
            }
            document.title = `${nomKanap}`    //titre de la page


      //les données sont insérées dynamiquement dans la page HTML
      champPicture.innerHTML += `<img src="${photoKanap}" alt="${altTexte}">`;
      champPrice.innerHTML += `<span id="price">${priceKanap}</span>`;
      champName.innerHTML += ` <h1 id="title">${nomKanap}</h1>`;
      champDescription.innerHTML += `<p id="description">${detailKanap}</p>`
    
// Création du Local Storage pour récupération des données vers la page panier
const button = document.getElementById("addToCart");
button.addEventListener("click", () => {
    let cartValue = {
        //initialisation de la variable cartValue
        idSelectedProduct: articleId,
        nameSelectedProduct: nomKanap,
        colorSelectedProduct: champColor.value,
        quantity: productQuantity.value
    }

    //-----------------------------------------------------------Fonction de récupération des informations

    function getCart() {
        let cartValue = JSON.parse(localStorage.getItem("kanapLs"));
        if (cartValue === null) {
            return [];				//si le LocalStorage est vide, on crée un tableau vide
        } else {
            return cartValue
        }
       
    }

    //-------------------------------------------------------------------------------------------------------------Fonction de mise au panier

    function addCart(product) {
        let cartValue = getCart();
        let target = cartValue.find(
            (item) =>
                item.idSelectedProduct === product.idSelectedProduct &&
                item.colorSelectedProduct === product.colorSelectedProduct	
        ); // La console retournera undefined si les données du localStorage et du panier ne sont pas identiques
        if (
            target == undefined &&
            champColor.value != "" &&			//si les consitions sont OK
            productQuantity.value > 0 &&
            productQuantity.value <= 100
        ) {
            product.quantity = productQuantity.value; //la quantité saisie est définie 
            cartValue.push(product);					 //dans le Ls
        } else {
            let newQuantity =
                parseInt(target.quantity) +
                parseInt(productQuantity.value); //CUMUL Quantité si présent ID et color
            target.quantity = newQuantity;
        }
        saveCart(cartValue);
        alert(
            `Le canapé ${nomKanap} ${champColor.value} a été ajouté en ${productQuantity.value} exemplaires à votre panier !`
        );
    }

    //-----------------------------------------------------------------------------------------------------Fonction de sauvegarde du panier
    function saveCart(cartValue) {
        localStorage.setItem("kanapLs", JSON.stringify(cartValue));
    }

    //---------------------------------------------------------------------------------------------- Verrouillage des conditions pour passer au panier
        //absence de couleur
if (champColor.value ===""){
    alert("Veuillez choisir une couleur")
}
        //quantité sélectionnée incompatible
else if (
    productQuantity.value <= 0 ||
    productQuantity.value > 100
) {
    alert("Veuillez sélectionner une quantité correcte (entre 1 et 100)");
} 
        //Conditions favorables, on push au LocalStorage
else {
    addCart(cartValue);
}
})





    })
    
