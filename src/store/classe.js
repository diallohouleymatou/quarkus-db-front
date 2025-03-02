import { writable } from 'svelte/store';

export const classes = writable([]);

export async function fetchClasses() {
  try {
    const response = await fetch('http://localhost:8080/graphql', {  // Update to the correct backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            allClasses {
              id
              code
              niveau
              capacite
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data, errors } = await response.json();
    if (errors) {
      console.error('GraphQL Errors:', errors);
      return;  // Exit if there are GraphQL errors
    }

    if (data && data.allClasses) {
      classes.set(data.allClasses);  // Populate the store with fetched data
    } else {
      console.error('No classes found in the response');
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
}

export async function createClasse(code, niveau, taille) {
  try {
    const response = await fetch('http://localhost:8080/graphql', {  // Update to the correct backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            createClasse(code: "${code}", niveau: "${niveau}", capacite: ${taille}) {
              id
              code
              niveau
              capacite
            }
          }
        `,
      }),
    });

    const { data } = await response.json();
    if (data && data.createClasse) {
      classes.update((prevClasses) => [...prevClasses, data.createClasse]);
    }
  } catch (error) {
    console.error('Error creating class:', error);
  }
}

export async function deleteClasse(id) {
  try {
    const response = await fetch('http://localhost:8080/graphql', {  // Update to the correct backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

    const { data } = await response.json();
    if (data && data.deleteClasse) {
      classes.update((prevClasses) => prevClasses.filter((classe) => classe.id !== data.deleteClasse.id));
    }
  } catch (error) {
    console.error('Error deleting class:', error);
  }
}
