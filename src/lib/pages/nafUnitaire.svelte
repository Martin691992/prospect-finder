<script>
	import { codeActivitePrincipale, NAF, departements } from '$lib/infos';
	import { callInseeAPI } from '$lib/runes/call_api.svelte';
	import MultipleSelect from '$lib/components/multipleSelect.svelte';
	let { actif = $bindable() } = $props();

	const api = callInseeAPI();
	let entreprises = $state();
	let selectedActivitePrincipale = $state('');
	let mainCategories = $derived(NAF.filter((line) => line.section == selectedActivitePrincipale));
	let set_categories = $derived(new Set(mainCategories.map((line) => line.categorie)));
	let selectedCategorie = $state('');
	let naf = $derived(NAF.filter((line) => line.categorie == selectedCategorie));
	let selectedNaf = $state('');
	let selectedDept = $state('');
	let selectedTypeEnt = $state('');
	let selectedNbSalarie = $state('');

	let page = $state(1);
	let maxPage = $derived(entreprises?.data?.total_pages);
</script>

<div class={actif == 1 ? 'wrapp show' : 'wrapp'}>
	<h2>Recherche d'entreprise par code NAF unitaire</h2>
	<p></p>
	<button
		type="button"
		onclick={() => (entreprises = api.callApi(selectedNaf, selectedDept, selectedTypeEnt,selectedNbSalarie, 1, 20))}
		>Appel</button
	>
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
			<label for="">Code NAF :</label>
			<select bind:value={selectedNaf} name="" id="">
				{#each naf as naf_line}
					<option value={naf_line.code}>{naf_line.code} - {naf_line.libelle}</option>
				{/each}
			</select>
			<label for="">Départements :</label>
			<MultipleSelect list={departements} bind:selectList={selectedDept} />
			<p>Type d'entreprise :</p>
			<div>
				<label for="PME">PME</label>
				<input bind:group={selectedTypeEnt} value="PME" type="checkbox" name="PME" id="PME" />
				<label for="ETI">ETI</label>
				<input bind:group={selectedTypeEnt} type="checkbox" value="ETI" name="ETI" id="ETI" />
				<label for="GE">GE</label>
				<input bind:group={selectedTypeEnt} type="checkbox" value="GE" name="GE" id="GE" />
			</div>
			<p for="">Tranche nombre de salariés :</p>
			<div class="inputs" >
				<label for="nn">Unité non-employeuse ou présumée non-employeuse</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="NN" name="nn" id="nn" />

				<label for="00-nb">0 salarié</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="00" name="00-nb" id="00-nb" />

				<label for="01-nb">1 ou 2 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="01" name="01-nb" id="01-nb" />

				<label for="02-nb">3 à 5 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="02" name="02-nb" id="02-nb" />

				<label for="03-nb">6 à 9 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="03" name="03-nb" id="03-nb" />

				<label for="11-nb">10 à 19 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="11" name="11-nb" id="11-nb" />

				<label for="12-nb">20 à 49 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="12" name="12-nb" id="12-nb" />

				<label for="21-nb">50 à 99 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="21" name="21-nb" id="21-nb" />

				<label for="22-nb">100 à 199 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="22" name="22-nb" id="22-nb" />

				<label for="31-nb">200 à 249 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="31" name="31-nb" id="31-nb" />

				<label for="32-nb">250 à 499 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="32" name="32-nb" id="32-nb" />

				<label for="41-nb">500 à 999 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="41" name="41-nb" id="41-nb" />

				<label for="42-nb">1 000 à 1 999 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="42" name="42-nb" id="42-nb" />

				<label for="51-nb">2 000 à 4 999 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="51" name="51-nb" id="51-nb" />

				<label for="52-nb">5 000 à 9 999 salariés</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="52" name="52-nb" id="52-nb" />

				<label for="53-nb">10 000 salariés et plus</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="53" name="53-nb" id="53-nb" />

				<label for="null">Donnée manquante</label>
				<input bind:group={selectedNbSalarie} type="checkbox" value="null" name="null" id="null" />
			</div>
		</div>
		<div class="col">
			<h3>
				Vos resultats :
				{#if entreprises}
					{#await entreprises}
						...
					{:then entreprise}
						<button
							type="button"
							onclick={async () =>
								(entreprises = await api.callApi(
									selectedNaf,
									selectedDept,
									selectedTypeEnt,
									selectedNbSalarie,
									page == 1 ? (page = 1) : --page,
									20
								))}
						>
							{'<'}
						</button>
						<button
							type="button"
							onclick={async () =>
								(entreprises = await api.callApi(
									selectedNaf,
									selectedDept,
									selectedTypeEnt,
									selectedNbSalarie,
									page == maxPage ? (page = maxPage) : ++page,
									20
								))}>{'>'}</button
						>
						<p>Page : {page} / {entreprise.data.total_pages}</p>
					{/await}
				{/if}
			</h3>
			<div class="data">
				{#if entreprises}
					{#await entreprises}
						<p>Chargement...</p>
					{:then entreprises}
						{#if entreprises.erreur}
							<p>Erreur : {entreprises.erreur}</p>
						{:else}
							{#each entreprises.data.results as entreprise}
								<div class="line">
									<div class="resume">
										{#if entreprise.etat_administratif == 'A'}
											<p class="actif">Actif</p>
										{:else}
											<p class="inactif">Inactif</p>
										{/if}
										<p>{entreprise.nom_complet}</p>
										<p>Département siège : {entreprise.siege.departement}</p>
									</div>
									{#if entreprise.dirigeants.length > 0}
										<details>
											<summary>Dirigeants</summary>
											{#each entreprise.dirigeants as dirigeant}
												<p>{dirigeant.nom} - {dirigeant.prenoms} - {dirigeant.qualite}</p>
											{/each}
										</details>
									{/if}
								</div>
							{/each}
						{/if}
					{/await}
				{/if}
			</div>
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
			grid-template-columns: 0.5fr 1fr;
			column-gap: 2em;
			margin-top: 2em;
			.col {
				display: flex;
				flex-direction: column;
				padding: 1em;
				border: solid 1px rgba(0, 0, 0, 0.2);
				overflow-y: scroll;
				height: 65vh;
				label {
					margin: 1em 0 0.5em 0;
					cursor: pointer;
				}
				select{
					padding: 10px;
					cursor: pointer;
				}
				.data {
					display: grid;
					grid-template-columns: 1fr;
					row-gap: 1em;
					.line {
						border-radius: 8px;
						box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
						border: solid 1px rgba(0, 0, 0, 0.2);
						padding: 0.5em;
						.resume {
							display: flex;
							align-items: center;
							gap: 1em;
							p.actif {
								color: white;
								padding: 0.5em;
								background-color: green;
								border-radius: 8px;
							}
						}
					}
					details {
						padding: 0.5em;
						summary {
							cursor: pointer;
						}
					}
				}
				.inputs{
					display: grid;
					grid-template-columns: 0.7fr 35px;
					z-index: 0;
					label{
						margin: 0;
						font-family: var(--mainFont);
					}
				}
			}
		}
	}
</style>
