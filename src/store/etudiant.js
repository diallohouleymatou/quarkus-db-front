
import { writable } from 'svelte/store';
const api = "http://localhost:8080/graphql";

export const etudiants = writable([]);

export async function fetchEtudiants() {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            allEtudiants {
              id,
              nom,
              prenom,
              classe {
                id
                capacite
                code
                niveau
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
   
    const { data } = await response.json();

    if (data && data.allEtudiants) {
      console.log(data.allEtudiants);
      etudiants.set(data.allEtudiants);
    } else {
      console.error("No students found in response data.");
    }
    
  } catch (error) {
    console.error('Error fetching Etudiants:', error);
  }
}

export async function createEtudiant(prenom, nom, classeId) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            CreateEtudiant(prenom: "${prenom}", nom: "${nom}", classeId: "${parseInt(classeId)}") {
              id
              prenom
              nom
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    etudiants.update(current => [...current, data.createEtudiant]);
  } catch (error) {
    console.error('Error creating Etudiant:', error);
  }
}

export async function deleteEtudiant(id) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            deleteEtudiant(id: ${id})
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.deleteEtudiant; // Assuming the backend returns true or false on success/failure
  } catch (error) {
    console.error('Error deleting Etudiant:', error);
  }
}
