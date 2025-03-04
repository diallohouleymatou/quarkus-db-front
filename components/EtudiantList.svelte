<script>
  import { onMount } from "svelte";
  import { etudiants, fetchEtudiants, deleteEtudiant } from "./../src/store/etudiant.js";

  let isLoading = true;
  let error = null;

  onMount(async () => {
    try {
      fetchEtudiants();
    } catch (err) {
      error = "Failed to fetch etudiants";
    } finally {
      isLoading = false;
    }
  });
</script>

<main class="google-etudiants">
  <div class="header">
    <h1>Etudiants</h1>
  </div>

  {#if isLoading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <span class="error-icon">⚠️</span>
      <p class="error">{error}</p>
      <button class="retry-button" on:click={() => fetchEtudiants()}>Retry</button>
    </div>
  {:else if $etudiants.length === 0}
    <div class="empty-state">
      <div class="empty-illustration">📚</div>
      <p>No etudiants found</p>
    </div>
  {:else}
    <ul class="etudiants-list">
      {#each $etudiants as etudiant (etudiant.id)}
        <li class="etudiant-item">
          <div class="etudiant-column">
            <h2>{etudiant.prenom} {etudiant.nom}</h2>
            <p>{etudiant.classe.code}</p>
          </div>
          <div class="actions">
            <button class="icon-button delete" on:click={() => { deleteEtudiant(etudiant.id), fetchEtudiants() }}>
              <span class="material-icon">🗑️</span>
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  .google-etudiants {
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

  .loading-container, .error-container, .empty-state {
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

  .error-container {
    color: #ea4335;
  }

  .error-icon {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .retry-button {
    margin-top: 16px;
    background-color: transparent;
    color: #1a73e8;
    border: 1px solid #1a73e8;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }

  .empty-state {
    color: #5f6368;
  }

  .empty-illustration {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .etudiants-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .etudiant-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s;
  }

  .etudiant-item:hover {
    background-color: #f8f9fa;
  }

  .etudiant-column {
    flex: 1;
    font-size: 14px;
  }

  .etudiant-column h2 {
    font-size: 16px;
    font-weight: 500;
    color: #1a73e8;
  }

  .etudiant-column p {
    margin: 4px 0;
    font-size: 14px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
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

    .etudiant-item {
      padding: 12px;
    }

    .etudiant-column h2 {
      font-size: 16px;
    }
  }
</style>
