<script>
    import NafUnitaire from "$lib/pages/nafUnitaire.svelte";
    import NafMultiple from "$lib/pages/nafMultiple.svelte";
    import SaisieNaf from "$lib/pages/saisieNaf.svelte";
    let navOnglets = $state(1)
</script>
<section>
<h1>Recherche de prospect : </h1>
<div class="onglets">
    <button type="button" class={navOnglets == 1 ? 'onglets focus' : "onglets"} onclick="{()=> navOnglets=1}">NAF Unitaire</button>
    <button type="button" class={navOnglets == 2 ? 'onglets focus' : "onglets"} onclick="{()=> navOnglets=2}">Multi NAF</button>
    <button type="button" class={navOnglets == 3 ? 'onglets focus' : "onglets"} onclick="{()=> navOnglets=3}">Saisie NAF</button>
    <button type="button" class={navOnglets == 4 ? 'onglets focus' : "onglets"} onclick="{()=> navOnglets=4}">Recherche Lat Lon</button>
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
        padding: 2em;
        gap: 1em;
        .onglets{
            display: flex;
            justify-content: flex-start;
            gap: 1em;
            &.focus{
                background-color: red;
            }
            button{
                padding: .5em 1.5em;
                font-size: clamp(0.4em, .7em + .2vw,3vw);
                cursor: pointer;
            }
        }
        .wrapper-pages{
            display: grid;
            grid-template-areas: "stack";
            padding: 1em;
            border: solid 1px rgba(0, 0, 0, 0.4);
            border-radius: 8px;
        }
    }

</style>