<script>
  import { onMount } from 'svelte';
  import { createCours } from '../src/store/cours.js';
  import { fetchClasses, classes } from './../src/store/classe.js';
  import { fetchProfs, profs } from './../src/store/prof.js';

  let matiere = '';
  let horaire = '';
  let jour = '';
  let prof = null;  // This will store the selected prof object
  let classe = null;  // This will store the selected classe object
  let matiereProf = [];
  let isSubmitting = false;
  let errorMessage = '';
  let successMessage = '';
  
  // Define days of the week for dropdown
  const jourOptions = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  async function handleCreate() {
    // Form validation
    if (!matiere || !horaire || !jour || !prof || !classe) {
      errorMessage = 'Please fill in all fields';
      return;
    }
    
    try {
      isSubmitting = true;
      errorMessage = '';
      await createCours(matiere, prof.id, classe.id, horaire, jour);
      
      // Show success message
      successMessage = 'Course created successfully!';
      
      // Reset form
      matiere = '';
      horaire = '';
      jour = '';
      prof = null;
      classe = null;
      matiereProf = [];
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage = '';
      }, 3000);
    } catch (error) {
      errorMessage = 'Failed to create course. Please try again.';
      console.error('Error creating course:', error);
    } finally {
      isSubmitting = false;
    }
  }

  onMount(async () => {
    try {
      await Promise.all([fetchClasses(), fetchProfs()]);
    } catch (error) {
      errorMessage = 'Failed to load data. Please refresh the page.';
    }
  });

  function updateMatieres(selectedProf) {
    if (selectedProf) {
      console.log("Selected prof: ", selectedProf);
      matiereProf = selectedProf.matiereslist || []; // Assuming prof object has matiereslist property
      
      // Reset matiere selection if the current selection is not in the new list
      if (matiere && !matiereProf.includes(matiere)) {
        matiere = '';
      }
    } else {
      matiereProf = [];
      matiere = '';
    }
  }
</script>

<div class="google-form-container">
  <div class="google-form">
    <div class="form-header">
      <h2>Create New Course</h2>
      <p class="form-subtitle">Enter the details for the new course</p>
    </div>
    
    {#if errorMessage}
      <div class="form-message error">
        <span class="message-icon">⚠️</span>
        <span>{errorMessage}</span>
      </div>
    {/if}
    
    {#if successMessage}
      <div class="form-message success">
        <span class="message-icon">✓</span>
        <span>{successMessage}</span>
      </div>
    {/if}
    
    <div class="form-fields">
      <!-- Professor Selection -->
      <div class="form-field">
        <label for="prof">Professor <span class="required">*</span></label>
        <div class="select-wrapper">
          <select 
            id="prof" 
            bind:value={prof} 
            on:change={() => updateMatieres(prof)}
            class:error={errorMessage && !prof}
          >
            <option value={null} disabled selected>Select a professor</option>
            {#each $profs as profOption}
              <option value={profOption}>{profOption.nom} {profOption.prenom}</option>
            {/each}
          </select>
        </div>
        <div class="field-hint">Professor's available subjects will be loaded</div>
      </div>
      
      <!-- Subject Selection -->
      <div class="form-field">
        <label for="matiere">Subject <span class="required">*</span></label>
        <div class="select-wrapper">
          <select 
            id="matiere" 
            bind:value={matiere}
            disabled={matiereProf.length === 0}
            class:error={errorMessage && !matiere}
          >
            <option value="" disabled selected>Select a subject</option>
            {#each matiereProf as matiereOption}
              <option value={matiereOption}>{matiereOption}</option>
            {/each}
          </select>
        </div>
        {#if matiereProf.length === 0 && prof}
          <div class="field-hint warning">This professor has no assigned subjects</div>
        {:else if !prof}
          <div class="field-hint">Select a professor first</div>
        {/if}
      </div>
      
      <!-- Class Selection -->
      <div class="form-field">
        <label for="classe">Class <span class="required">*</span></label>
        <div class="select-wrapper">
          <select 
            id="classe" 
            bind:value={classe}
            class:error={errorMessage && !classe}
          >
            <option value={null} disabled selected>Select a class</option>
            {#each $classes as classeOption}
              <option value={classeOption}>{classeOption.code} (Level {classeOption.niveau})</option>
            {/each}
          </select>
        </div>
      </div>
      
      <!-- Day Selection -->
      <div class="form-field">
        <label for="jour">Day <span class="required">*</span></label>
        <div class="select-wrapper">
          <select 
            id="jour" 
            bind:value={jour}
            class:error={errorMessage && !jour}
          >
            <option value="" disabled selected>Select a day</option>
            {#each jourOptions as jourOption}
              <option value={jourOption}>{jourOption}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <!-- Time Input -->
      <div class="form-field">
        <label for="horaire">Time (hour) <span class="required">*</span></label>
        <input 
          type="number" 
          id="horaire" 
          bind:value={horaire}
          min="8" 
          max="18" 
          placeholder="e.g. 14 (for 2:00 PM)"
          class:error={errorMessage && !horaire}
        />
        <div class="field-hint">Enter hour in 24-hour format (8-18)</div>
      </div>
    </div>
    
    <div class="form-actions">
      <button class="cancel-button" on:click={() => {
        matiere = '';
        horaire = '';
        jour = '';
        prof = null;
        classe = null;
        matiereProf = [];
        errorMessage = '';
      }}>
        Cancel
      </button>
      
      <button 
        class="create-button" 
        on:click={handleCreate}
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <span class="spinner"></span>
          Creating...
        {:else}
          Create
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .google-form-container {
    display: flex;
    justify-content: center;
    padding: 24px;
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
  }
  
  .google-form {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
    padding: 24px;
    width: 100%;
    max-width: 500px;
  }
  
  .form-header {
    margin-bottom: 24px;
  }
  
  h2 {
    color: #202124;
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 8px 0;
  }
  
  .form-subtitle {
    color: #5f6368;
    font-size: 14px;
    margin: 0;
  }
  
  .form-message {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 16px;
    font-size: 14px;
  }
  
  .form-message.error {
    background-color: #fce8e6;
    color: #d93025;
  }
  
  .form-message.success {
    background-color: #e6f4ea;
    color: #137333;
  }
  
  .message-icon {
    margin-right: 8px;
  }
  
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
  }
  
  label {
    color: #5f6368;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .required {
    color: #d93025;
  }
  
  input, select {
    padding: 12px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-size: 16px;
    color: #202124;
    transition: border 0.2s;
    background-color: white;
  }
  
  .select-wrapper {
    position: relative;
  }
  
  .select-wrapper::after {
    content: '▼';
    font-size: 12px;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #5f6368;
    pointer-events: none;
  }
  
  select {
    appearance: none;
    width: 100%;
    padding-right: 30px;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #1a73e8;
  }
  
  input.error, select.error {
    border-color: #d93025;
  }
  
  input:disabled, select:disabled {
    background-color: #f1f3f4;
    color: #80868b;
    cursor: not-allowed;
  }
  
  .field-hint {
    margin-top: 4px;
    font-size: 12px;
    color: #5f6368;
  }
  
  .field-hint.warning {
    color: #ea8600;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  
  button {
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cancel-button {
    background-color: transparent;
    color: #1a73e8;
    border: none;
  }
  
  .cancel-button:hover {
    background-color: rgba(26, 115, 232, 0.04);
  }
  
  .create-button {
    background-color: #1a73e8;
    color: white;
    border: none;
    transition: background-color 0.2s;
  }
  
  .create-button:hover {
    background-color: #1765cc;
  }
  
  .create-button:disabled {
    background-color: #80b0ec;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    margin-right: 8px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 600px) {
    .google-form {
      padding: 16px;
    }
    
    .form-actions {
      flex-direction: column-reverse;
    }
    
    button {
      width: 100%;
    }
  }
</style>