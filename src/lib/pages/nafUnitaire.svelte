<script>
    import { codeActivitePrincipale, NAF} from "$lib/infos"
    import { callInseeAPI } from "$lib/runes/call_api.svelte";
    let { actif = $bindable() } = $props()

    const api = callInseeAPI()
    let entreprises = $state()
    let selectedActivitePrincipale = $state('')
    let mainCategories = $derived(NAF.filter(line=> line.section == selectedActivitePrincipale))
    let set_categories = $derived(new Set(mainCategories.map(line=> line.categorie)))
    let selectedCategorie = $state('')
    let naf = $derived(NAF.filter(line => line.categorie == selectedCategorie))
    let selectedNaf = $state('')
    
</script>
<select bind:value={selectedActivitePrincipale} name="activite_principal" id="activite_principal">
    <option value="">- - -</option>
    {#each codeActivitePrincipale as activite}
        <option value={activite.code}>{activite.label}</option>
    {/each}
</select>
{#if selectedActivitePrincipale}
    <label for="">Sous classe d'activité :</label>
    <select bind:value={selectedCategorie} name="" id="">
    {#each set_categories as line}
        <option value="{line}">{line}</option>
    {/each}
    </select>
{/if}
{#if selectedCategorie}
    <select bind:value={selectedNaf} name="" id="">
        {#each naf as naf_line}
            <option value="{naf_line.code}">{naf_line.code} - {naf_line.libelle}</option>
        {/each}
    </select>
{/if}


<button type="button" onclick="{() => entreprises = api.callApi(selectedNaf)}">Appel</button>

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