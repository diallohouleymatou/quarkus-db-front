// src/components/ProfList.svelte
<script>
  import { onMount } from "svelte";
  import { profs, fetchProfs } from "./../src/store/prof.js";

  onMount(() => {
    fetchProfs();
    console.log(profs)
  });

  async function deleteProf(id) {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deleteProf(id: "${id}") {
              id
            }
          }
        `,
      }),
    });
    await fetchProfs();
  }
  
</script>

<main>
  <h1 class="title">Professeurs</h1>

  {#if $profs.length === 0}
    <p>Loading...</p>
  {/if}

  <ul class="list">
    {#each $profs as prof}
      <li class="card">
        <div class="content">
          <h2>{prof.prenom} {prof.nom}</h2>
          <button on:click={() => deleteProf(prof.id)}>Delete</button>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
  }

  .card {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  .card .content h2 {
    font-size: 1.5rem;
    color: #333;
  }

  .card .content p {
    color: #666;
  }

  .card button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }

  .card button:hover {
    background-color: #c0392b;
  }
</style>
