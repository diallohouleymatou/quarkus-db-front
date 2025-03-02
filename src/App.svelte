// src/App.svelte
<script>
  import CreateEtudiant from './../components/CreateEtudiant.svelte';
  import CreateProf from './../components/CreateProf.svelte';
  import CreateClasse from './../components/CreateClasse.svelte';
	import CreateEmploiDuTemps from './../components/CreateEmploiDuTemps.svelte';
  import EtudiantList from './../components/EtudiantList.svelte';
  import ClasseList from './../components/ClasseList.svelte';
  import EmploiDuTempsList from './../components/EmploiDuTempsListe.svelte';
  import ProfList from './../components/ProfList.svelte';
  import Navbar from './../components/Navbar.svelte';
  
  let activeTab = 'etudiants';

  function handleNavigation(event) {
    activeTab = event.detail;
  }
</script>

<Navbar on:navigate={handleNavigation} />

{#if activeTab === 'etudiants'}
  <EtudiantList />
  <CreateEtudiant />
{:else if activeTab === 'professeurs'}
  <ProfList />
  <CreateProf />
{:else if activeTab === 'classes'}
  <ClasseList />
  <CreateClasse />
{:else if activeTab === 'emploi'}
  <EmploiDuTempsList />
  <CreateEmploiDuTemps />
{/if}

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
  }
</style>
