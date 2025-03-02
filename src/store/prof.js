// src/store/prof.js
import { writable } from 'svelte/store';

export const profs = writable([]);

export async function fetchProfs() {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          getProfesseurs {
            id
            prenom
            nom
            specialite
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  profs.set(data.getProfesseurs);
}

export async function createProf(prenom, nom, specialite) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          createProf(prenom: "${prenom}", nom: "${nom}", specialite: "${specialite}") {
            id
            prenom
            nom
            specialite
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  profs.update((prevProfs) => [...prevProfs, data.createProf]);
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
