export function callInseeAPI(){

    async function callApi(code_naf,departements) {
        const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?page=1&
            ${code_naf ? `&activite_principale=${code_naf}`:''}
            ${departements ? `&departement=${departements}`:''}&per_page=20`)
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