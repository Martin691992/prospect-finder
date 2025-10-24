<script>
	import { callInseeAPI } from '$lib/runes/call_api.svelte';
	let { actif = $bindable() } = $props();

	const api = callInseeAPI();
	let entreprises = $state();
    let naf = $state('')
</script>

<div class={actif == 3 ? 'wrapp show' : 'wrapp'}>
    <h2>Recherche d'entreprise par code NAF </h2>
    <button type="button" onclick={() => (entreprises = api.callApi(naf))}>Appel</button>
    <div class="container">
        <div class="col">
            <h3>Selectionnez un secteur d'activité avec un code NAF</h3>
            <label for="naf">Code NAF</label>
            <input bind:value={naf} type="text" name="" id="">
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
			grid-template-columns: 30vw 1fr;
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
