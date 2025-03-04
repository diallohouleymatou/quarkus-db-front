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

<main class="google-cours">
  <header class="header">
    <h1>Professeurs</h1>
    {#if $profs.length === 0}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    {/if}
  </header>

  <ul class="cours-list">
    {#each $profs as prof}
      <li class="cours-item">
        <div class="cours-column">
          <h2>{prof.prenom} {prof.nom}</h2>
          <p>{prof.matiereslist && Array.isArray(prof.matiereslist) ? prof.matiereslist.join(', ') : 'No subjects listed'}</p>
        </div>
        <div class="actions">
          <button class="icon-button delete" on:click={() => deleteProf(prof.id)}>
            <span class="material-icon">delete</span>
          </button>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style>
  .google-cours {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    color: #202124;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 22px;
    font-weight: 400;
    color: #202124;
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 80px 0;
    text-align: center;
  }

  .loading-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #1a73e8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .cours-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .cours-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s;
  }

  .cours-item:hover {
    background-color: #f8f9fa;
  }

  .cours-column {
    flex: 1;
    font-size: 14px;
  }

  .cours-column h2 {
    font-size: 16px;
    font-weight: 500;
    color: #1a73e8;
  }

  .cours-column p {
    margin: 4px 0;
    font-size: 14px;
  }

  .icon-button {
    background: none;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .icon-button:hover {
    background-color: #f1f3f4;
  }

  .icon-button.delete:hover {
    color: #ea4335;
  }

  .material-icon {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }

    .cours-item {
      padding: 12px;
    }

    .cours-column h2 {
      font-size: 16px;
    }
  }
</style>
