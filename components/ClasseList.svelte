<script>
  import { onMount } from "svelte";
  import { classes, fetchClasses, deleteClasse } from "./../src/store/classe.js";
  import { writable } from 'svelte/store';

  let isLoading = true;
  let error = null;
  let searchQuery = "";
  let showAddClassModal = false;

  let filteredClassesStore = writable([]);

  onMount(async () => {
    try {
      await fetchClasses();
      console.log("Classes loaded:", $classes);
      filterClasses();
    } catch (err) {
      error = "Failed to fetch classes";
    } finally {
      isLoading = false;
    }
  });

  function filterClasses() {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      filteredClassesStore.set($classes);
    } else {
      const filtered = $classes.filter(classe =>
        classe.code.toLowerCase().includes(query) || 
        classe.niveau.toString().includes(query)
      );
      filteredClassesStore.set(filtered);
    }
  }

  $: searchQuery, filterClasses();
</script>

<main class="google-classes">
  <div class="header">
    <h1>Classes</h1>
    <div class="actions">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search classes..." 
          bind:value={searchQuery}
        />
      </div>
      <button class="add-button" on:click={() => showAddClassModal = true}>
        <span class="add-icon">+</span>
        <span class="add-text">Add Class</span>
      </button>
    </div>
  </div>

  {#if isLoading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading classes...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <span class="error-icon">⚠️</span>
      <p class="error">{error}</p>
      <button class="retry-button" on:click={() => fetchClasses()}>Retry</button>
    </div>
  {:else if $classes.length === 0}
    <div class="empty-state">
      <div class="empty-illustration">📚</div>
      <p>No classes found</p>
      <button class="add-button small" on:click={() => showAddClassModal = true}>
        Add Your First Class
      </button>
    </div>
  {:else}
    <div class="list-header">
      <div class="list-column">Class Code</div>
      <div class="list-column">Level</div>
      <div class="list-column">Capacity</div>
      <div class="list-column actions-column">Actions</div>
    </div>

    <ul class="class-list">
      {#each $filteredClassesStore as classe (classe.id)}
        <li class="class-item">
          <div class="class-column class-code">{classe.code}</div>
          <div class="class-column">Level {classe.niveau}</div>
          <div class="class-column">{classe.capacite} students</div>
          <div class="class-column actions">
            <button class="icon-button edit">
              <span class="material-icon">✏️</span>
            </button>
            <button class="icon-button delete" on:click={() => deleteClasse(classe.id)}>
              <span class="material-icon">🗑️</span>
            </button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  .google-classes {
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

  .search-box {
    position: relative;
    width: 300px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #5f6368;
    font-size: 16px;
  }

  input[type="text"] {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 1px solid #dfe1e5;
    border-radius: 24px;
    font-size: 14px;
    color: #202124;
    outline: none;
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  input[type="text"]:focus {
    border-color: #1a73e8;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  .add-button {
    display: flex;
    align-items: center;
    background-color: #1a73e8;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .add-button:hover {
    background-color: #1765cc;
  }

  .add-icon {
    margin-right: 8px;
    font-size: 18px;
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

  .add-button.small {
    margin-top: 16px;
    font-size: 13px;
    padding: 8px 16px;
  }

  .list-header {
    display: flex;
    padding: 0 16px 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
    color: #5f6368;
    font-size: 14px;
  }

  .list-column {
    flex: 1;
  }

  .actions-column {
    flex: 0.5;
    text-align: right;
  }

  .class-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .class-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s;
  }

  .class-item:hover {
    background-color: #f8f9fa;
  }

  .class-column {
    flex: 1;
    font-size: 14px;
  }

  .class-code {
    font-weight: 500;
    color: #1a73e8;
  }

  .actions {
    flex: 0.5;
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

  .icon-button.edit:hover {
    color: #1a73e8;
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

    .search-box {
      width: 100%;
    }

    .add-text {
      display: none;
    }

    .add-button {
      padding: 12px;
      justify-content: center;
    }

    .add-icon {
      margin-right: 0;
    }
  }
</style>
