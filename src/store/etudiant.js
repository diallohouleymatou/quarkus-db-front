
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
              id
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    etudiants.set(data.allEtudiants);
  } catch (error) {
    console.error('Error fetching Etudiants:', error);
  }
}

export async function createEtudiant(prenom, nom, email, classeId) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            createEtudiant(prenom: "${prenom}", nom: "${nom}", email: "${email}", classe: { id: ${classeId} }) {
              id
              prenom
              nom
              email
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    etudiants.update(current => [...current, data.data.createEtudiant]);
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
    return data.data.deleteEtudiant; // Assuming the backend returns true or false on success/failure
  } catch (error) {
    console.error('Error deleting Etudiant:', error);
  }
}
