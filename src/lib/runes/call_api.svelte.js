export function callInseeAPI(){

    async function callApi(code_naf,departements, typeEnt, page, nbParPages) {
        console.log(`https://recherche-entreprises.api.gouv.fr/search?page=${page}${code_naf ? `&activite_principale=${code_naf}`:''}${departements ? `&departement=${departements}`:''}${typeEnt ? `&categorie_entreprise=${typeEnt}` : ''}&per_page=${nbParPages}`)
        const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?page=${page}${code_naf ? `&activite_principale=${code_naf}`:''}${departements ? `&departement=${departements}`:''}${typeEnt ? `&categorie_entreprise=${typeEnt}` : ''}&per_page=${nbParPages}`,{
            method:"GET"
        })
        if(response.status != 200){
            return {erreur : "Mauvaise requete"}
        }
        const data = await response.json()
        console.log(data)
        return data.results
    }
    return {
        callApi
    }
}