<script>
    import { codeActivitePrincipale, NAF} from "$lib/infos"
    let entreprises = $state()
    let selectedActivitePrincipale = $state('')
    let categories = $derived(NAF.filter(line=> line.section == selectedActivitePrincipale))
    let set_categories = $derived(new Set(categories.map(line=> line.categorie)))
    $inspect(set_categories)
    async function callApi() {
        const response = await fetch('https://recherche-entreprises.api.gouv.fr/search?activite_principale=12.00z&page=1&per_page=20')
        if(response.status != 200){
            return {erreur : "Mauvaise requete"}
        }
        const data = await response.json()
        return data.results
    }
</script>
<h1>Recherche de prospect</h1>
<button type="button" onclick="{() => entreprises = callApi()}">Appel</button>

{#if entreprises}
{#await entreprises}
    <p>Chargement...</p>
{:then entreprises}
    {#if entreprises.erreur}
        <p>Erreur : {entreprises.erreur}</p>
        {:else}
        {#each entreprises as entreprise}
            <p>{entreprise.nom_complet}</p>
        {/each}
    {/if}
{/await}

{/if}
<select bind:value={selectedActivitePrincipale} name="activite_principal" id="activite_principal">
    <option value="">- - -</option>
    {#each codeActivitePrincipale as activite}
        <option value={activite.code}>{activite.label}</option>
    {/each}
</select>
{#if selectedActivitePrincipale}
    {#each categories as line}
        <p>{line.code} - {line.categorie} - {line.libelle}</p>
    {/each}
{/if}