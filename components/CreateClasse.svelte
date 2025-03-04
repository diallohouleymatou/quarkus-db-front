<script>
  import { createClasse } from '../src/store/classe';
  let code = '';
  let niveau = '';
  let taille = '';
  let isSubmitting = false;
  let errorMessage = '';
  let successMessage = '';

  async function handleCreate() {
    if (!code || !niveau || !taille) {
      errorMessage = 'Please fill in all fields';
      return;
    }

    try {
      isSubmitting = true;
      errorMessage = '';
      await createClasse(code, niveau, taille);
      
      // Show success message
      successMessage = 'Class created successfully!';
      
      // Reset form
      code = '';
      niveau = '';
      taille = '';
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage = '';
      }, 3000);
    } catch (error) {
      errorMessage = 'Failed to create class. Please try again.';
      console.error('Error creating class:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="google-form-container">
  <div class="google-form">
    <div class="form-header">
      <h2>Create New Class</h2>
      <p class="form-subtitle">Enter the details for the new class</p>
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
      <div class="form-field">
        <label for="code">Class Code <span class="required">*</span></label>
        <input 
          type="text" 
          id="code" 
          placeholder="e.g. MATH101"
          bind:value={code}
          class:error={errorMessage && !code}
        />
      </div>
      
      <div class="form-field">
        <label for="niveau">Level <span class="required">*</span></label>
        <input 
          type="text" 
          id="niveau" 
          placeholder="e.g. Advanced"
          bind:value={niveau}
          class:error={errorMessage && !niveau}
        />
      </div>
      
      <div class="form-field">
        <label for="taille">Capacity <span class="required">*</span></label>
        <input 
          type="number" 
          id="taille" 
          placeholder="e.g. 30"
          bind:value={taille}
          min="1"
          class:error={errorMessage && !taille}
        />
      </div>
    </div>
    
    <div class="form-actions">
      <button class="cancel-button" on:click={() => {
        code = '';
        niveau = '';
        taille = '';
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
  
  input {
    padding: 12px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-size: 16px;
    color: #202124;
    transition: border 0.2s;
  }
  
  input:focus {
    outline: none;
    border-color: #1a73e8;
  }
  
  input.error {
    border-color: #d93025;
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