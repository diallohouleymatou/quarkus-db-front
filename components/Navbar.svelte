<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let currentTab = 'etudiants';

  function navigate(tab) {
    currentTab = tab;
    dispatch('navigate', tab);
  }
</script>

<nav class="google-nav">
  <div class="logo-container">
    <span class="logo">EduPortal</span>
  </div>
  <div class="tabs-container">
    <ul class="tabs">
      <li 
        class={`tab ${currentTab === 'etudiants' ? 'active' : ''}`}
        on:click={() => navigate('etudiants')}
      >
        <span class="tab-icon">👥</span>
        <span class="tab-text">Étudiants</span>
      </li>
      <li 
        class={`tab ${currentTab === 'professeurs' ? 'active' : ''}`}
        on:click={() => navigate('professeurs')}
      >
        <span class="tab-icon">👨‍🏫</span>
        <span class="tab-text">Professeurs</span>
      </li>
      <li 
        class={`tab ${currentTab === 'classes' ? 'active' : ''}`}
        on:click={() => navigate('classes')}
      >
        <span class="tab-icon">🏫</span>
        <span class="tab-text">Classes</span>
      </li>
      <li 
        class={`tab ${currentTab === 'cours' ? 'active' : ''}`}
        on:click={() => navigate('cours')}
      >
        <span class="tab-icon">📚</span>
        <span class="tab-text">Cours</span>
      </li>
      <li 
        class={`tab ${currentTab === 'emploi' ? 'active' : ''}`}
        on:click={() => navigate('emploi')}
      >
        <span class="tab-icon">📅</span>
        <span class="tab-text">Emploi Du Temps</span>
      </li>
    </ul>
  </div>
  <div class="user-section">
    <button class="settings-button">⚙️</button>
    <div class="user-avatar">A</div>
  </div>
</nav>

<style>
  .google-nav {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
  }

  .logo-container {
    padding-right: 24px;
  }

  .logo {
    font-size: 22px;
    font-weight: 500;
    color: #5f6368;
    letter-spacing: -0.5px;
  }

  .tabs-container {
    flex: 1;
  }

  .tabs {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
  }

  .tab {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 48px;
    color: #5f6368;
    font-size: 14px;
    font-weight: 500;
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .tab:hover {
    background-color: #f1f3f4;
  }

  .tab.active {
    color: #1a73e8;
    background-color: #e8f0fe;
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 3px;
    background-color: #1a73e8;
    display: none; /* Disabled for pill style */
  }

  .tab-icon {
    margin-right: 8px;
    font-size: 18px;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .settings-button {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
  }

  .settings-button:hover {
    background-color: #f1f3f4;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #1a73e8;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .tab-text {
      display: none;
    }
    
    .tab {
      padding: 0 12px;
    }
    
    .tab-icon {
      margin-right: 0;
    }
  }
</style>