<script>
    import NafUnitaire from "$lib/pages/nafUnitaire.svelte";
    import NafMultiple from "$lib/pages/nafMultiple.svelte";
    import SaisieNaf from "$lib/pages/saisieNaf.svelte";
    let navOnglets = $state(1)
</script>
<section>
<h1>Recherche de prospect : </h1>
<div class="onglets">
    <button type="button" class="onglet" onclick="{()=> navOnglets=1}">NAF Unitaire</button>
    <button type="button" class="onglet" onclick="{()=> navOnglets=2}">Multi NAF</button>
    <button type="button" class="onglet" onclick="{()=> navOnglets=3}">Saisie NAF</button>
    <button type="button" class="onglet" onclick="{()=> navOnglets=4}">Recherche Lat Lon</button>
</div>
<div class="wrapper-pages">
    <NafUnitaire actif={navOnglets}/>
    <NafMultiple actif={navOnglets}/>
    <SaisieNaf actif={navOnglets}/>
</div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em;
        .onglets{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            gap: 1em;
            button{
                padding: .5em 1.5em;
                font-size: clamp(0.4em, .7em + .2vw,3vw);
                cursor: pointer;
            }
        }
        .wrapper-pages{
            display: grid;
            grid-template-areas: "stack";
        }
    }

</style>