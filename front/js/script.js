// Définition d'une constante pour alimenter les cartes
const carteKanap = document.getElementById("items");

// requête de l'API
fetch("http://localhost:3000/api/products/")
    // conversion de la réponse de l'API en JSON pour exploitation
    .then((reponse) => reponse.json())
    // on nomme l'objet data
    .then((data) => {
        for (let champ of data) {
			//boucle pour importer chaque champ du JSON et lui attribuer une constante
			const idKanap = champ._id;
			const photoKanap = champ.imageUrl;
			const altTexte = champ.altTxt;
			const nomKanap = champ.name;
			const detailKanap = champ.description;

      //les données sont insérées dynamiquement dans l'HTML de la page d'accueil
      carteKanap.innerHTML += `<a href="./product.html?id=${idKanap}">
        <article>
          <img src="${photoKanap}" alt="${altTexte}">
            <h3 class="productName">${nomKanap}</h3>
            <p class="productDescription">${detailKanap}</p>
        </article>
    </a>`;
		}
    })

