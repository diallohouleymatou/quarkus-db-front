// src/components/Navbar.svelte
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let currentTab = 'etudiants';

  function navigate(tab) {
    currentTab = tab;
    dispatch('navigate', tab);
  }
</script>

<nav class="navbar">
  <ul>
    <li on:click={() => navigate('etudiants')} class={currentTab === 'etudiants' ? 'active' : ''}>Etudiants</li>
    <li on:click={() => navigate('professeurs')} class={currentTab === 'professeurs' ? 'active' : ''}>Professeurs</li>
    <li on:click={() => navigate('classes')} class={currentTab === 'classes' ? 'active' : ''}>Classes</li>
    <li on:click={() => navigate('emploi')} class={currentTab === 'emploi' ? 'active' : ''}>Emploi Du Temps</li>
  </ul>
</nav>

