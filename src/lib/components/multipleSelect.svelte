<script>

    let { list, selectList = $bindable('') } = $props()

    let show = $state(false)
</script>
<div class="selection-multiple">
    <button onclick="{()=> show= !show}" type="button">
        <p>Départements : {selectList}</p>
        <p>ouvrir</p>
    </button>
    <div class={show ? "list show" : "list"}>
        {#each list as line}
            <div>
                <input bind:group={selectList} value="{line.code}" type="checkbox" name="{line.code}" id="{line.code}">
                <label for="{line.code}">{line.code} - {line.departements}</label>
            </div>
        {/each}
    </div>
</div>
<style>
    .selection-multiple{
        position: relative;
        button{
            width: 100%;
            border: solid 1px rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            cursor: pointer;
            p{
                padding: .4em;
                margin: 0;
            }
        }
        .list{
            position: absolute;
            top: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 100%;
            gap: 5px;
            max-height: 40vh;
            scrollbar-width: thin;
            overflow-y: scroll;
            opacity: 0;
            z-index: -200;
            background-color: white;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
            div{
                display: flex;
                padding-left: 0.5em;
                &:hover{
                    background-color: blue;
                    label{
                        color: white;
                    }
                }
            }
            &.show{
                opacity: 1;
                z-index: 5;
            }
            input, label{
                cursor: pointer;
                font-family: var(--mainFont);
                padding: 0.5em 1em;
            }
            label{
                width: 100%;
            }
        }
    }
</style>