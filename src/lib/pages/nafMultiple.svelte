<script>
	import { codeActivitePrincipale, NAF } from '$lib/infos';
	import { callInseeAPI } from '$lib/runes/call_api.svelte';
	let { actif = $bindable() } = $props();

	const api = callInseeAPI();
	let entreprises = $state();
	let selectedActivitePrincipale = $state('');
	let mainCategories = $derived(NAF.filter((line) => line.section == selectedActivitePrincipale));
	let set_categories = $derived(new Set(mainCategories.map((line) => line.categorie)));
	let selectedCategorie = $state('');
	let naf = $derived(NAF.filter((line) => line.categorie == selectedCategorie));
	let selectedNafs = $state([]);
</script>

<div class={actif == 2 ? 'wrapp show' : 'wrapp'}>
    <h2>Recherche d'entreprise par code NAF multiples</h2>
    <p>{selectedNafs}</p>
    <button type="button" onclick={() => (entreprises = api.callApi(selectedNafs))}>Appel</button>
	<div class="container">
		<div class="col">
            <h3>Selectionnez un secteur d'activité</h3>
            <label for="">Classe d'activité :</label>
			<select
				bind:value={selectedActivitePrincipale}
				name="activite_principal"
				id="activite_principal"
			>
				<option value="">- - -</option>
				{#each codeActivitePrincipale as activite}
					<option value={activite.code}>{activite.label}</option>
				{/each}
			</select>
				<label for="">Sous classe d'activité :</label>
				<select bind:value={selectedCategorie} name="" id="">
					{#each set_categories as line}
						<option value={line}>{line}</option>
					{/each}
				</select>
		</div>
		<div class="col inputs">
			{#if selectedCategorie}
				{#each naf as naf_line}
                <div class="input">
					<input bind:group={selectedNafs} type="checkbox" name={naf_line.code} value={naf_line.code} id={naf_line.code} />
					<label for={naf_line.code}>{naf_line.libelle}</label>
                </div>

				{/each}
			{/if}
		</div>
		<div class="col">
			<h3>Vos resultats : </h3>
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
		</div>
	</div>
</div>

<style>
	.wrapp {
		grid-area: stack;
		visibility: hidden;
		&.show {
			visibility: visible;
		}
		.container {
			display: grid;
			grid-template-columns: .3fr 1fr 1fr;
            column-gap: 2em;
            margin-top: 2em;
			.col {
				display: flex;
				flex-direction: column;
                padding: 1em;
                border: solid 1px rgba(0, 0, 0, 0.2);
                label{
                    margin: 1em 0 0.5em 0;
                    cursor: pointer;
                }
                select{
                    padding: 0.3em .5em;
                    cursor: pointer;
                }
                input{
                    cursor: pointer;
                }
                .input{

                }
			}
		}
	}
</style>
