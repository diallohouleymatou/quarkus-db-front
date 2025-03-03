// src/store/prof.js
import { writable } from 'svelte/store';
const api = "http://localhost:8080/graphql";

export const profs = writable([]);

export async function fetchProfs() {
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          allProfesseur {
            id
            prenom
            nom
            matiereslist
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  profs.set(data.allProfesseur);
}

export async function createProf(prenom, nom, matieres) {
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          CreateProfesseur(prenom: "${prenom}", nom: "${nom}", matieres: ${JSON.stringify(matieres)}) {
            id
            prenom
            nom
          }
        }
      `,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) {
    console.error(errors);
    return;
  }

  console.log(data);
  // Update the profs list with the newly created professor
  profs.update((prevProfs) => [...prevProfs, data.CreateProfesseur]);
}


export async function deleteProf(id) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          deleteProf(id: "${id}") {
            id
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  profs.update((prevProfs) => prevProfs.filter((prof) => prof.id !== data.deleteProf.id));
}
