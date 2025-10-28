import { json } from "@sveltejs/kit"
export const POST = async ({ request }) => {
    const { code_naf, departements, typeEnt, page, nbParPages } = await request.json()
    const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?page=${page}${code_naf ? `&activite_principale=${code_naf}` : ''}${departements ? `&departement=${departements}` : ''}${typeEnt ? `&categorie_entreprise=${typeEnt}` : ''}&per_page=${nbParPages}`)
    if (response.status != 200) {
        return { erreur: "Mauvaise requete" }
    }
    const data = await response.json()
    return json(data)
}