<script>
  import { onMount } from "svelte";
  import { classes, fetchClasses } from "./../src/store/classe.js";

  let isLoading = true;
  let error = null;

  onMount(async () => {
    try {
      fetchClasses();
      console.log("Loading classes");
    } catch (err) {
      error = "Failed to fetch classes";
    } finally {
      isLoading = false;
    }
  });

  async function deleteClasse(id) {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              deleteClasse(id: "${id}") {
                id
              }
            }
          `,
        }),
      });
      await fetchClasses(); // Refresh list after deletion
    } catch (err) {
      error = "Failed to delete class";
    }
  }
</script>

<main>
  <h1 class="title">Classes</h1>

  {#if isLoading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if $classes.length === 0}
    <p>No classes found.</p>
  {/if}

  <ul class="list">
    {#each $classes as classe}
      <li class="card">
        <div class="content">
          <h2>{classe.code} (Niveau {classe.niveau})</h2>
          <p>Size: {classe.capacite}</p>
          <button on:click={() => deleteClasse(classe.id)}>Delete</button>
        </div>
      </li>
    {/each}
  </ul>
  <ul>
    {#if $classes.length > 0}
      {#each $classes as classe}
        <li>
          {classe.code} - {classe.niveau} - {classe.capacite}
        </li>
      {/each}
    {:else}
      <li>No classes found</li>
    {/if}
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

  .error {
    color: red;
    font-weight: bold;
  }
</style>
