import { writable } from 'svelte/store';

export const cours = writable([]);

export async function fetchCours() {
  try {
    const response = await fetch('http://localhost:8080/graphql', {  // Update to the correct backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            allCours {
              id
              matiere
              classe {
            id
            capacite
            code
            niveau
        }
        professeur {
            id
            matiereslist
            nom
            prenom
        }
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
      return; 
    }

    if (data && data.allCours) {
      console.log(data.allCours);
      cours.set(data.allCours); 
      console.error('No classes found in the response');
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
}

export async function createCours(matiere, prof, classe, horaire, jour) {
  try {
    console.log("test0");
    console.log(prof, classe); // Log to check if the objects are correct.

    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation CreateCours($matiere: String!, $horaire: Int!, $jour: String!, $prof: Int!, $classe: Int!) {
            CreateCours(matiere: $matiere, prof: $prof, classe: $classe, jour: $jour, horaire: $horaire) {
              id
              matiere
            }
          }
        `,
        variables: {
          prof: prof,
          classe: classe,
          matiere: matiere,
          horaire: horaire,
          jour: jour,
        },
      }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      console.error('GraphQL errors:', errors);
    }
    console.log(data);

    if (data && data.CreateCours) {
      cours.update((prevCours) => [...prevCours, data.CreateCours]);
    }
  } catch (error) {
    console.error('Error creating class:', error);
  }
}


export async function deleteCours(id) {
  try {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation DeleteClasse {
              deleteClasse(id: ${id})
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
      return; 
    }

    if (data?.deleteClasse) {
      console.log(`Class with ID ${id} deleted successfully.`);
    } else {
      console.error('Delete operation failed');
    }
  } catch (error) {
    console.error('Error deleting class:', error);
  }
}