export function callInseeAPI(){

    async function callApi(code_naf) {
        const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?activite_principale=${code_naf}&page=1&per_page=20`)
        if(response.status != 200){
            return {erreur : "Mauvaise requete"}
        }
        const data = await response.json()
        return data.results
    }
    return {
        callApi
    }
}