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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  profs.set(data.allProfesseur);
}

export async function createProf(prenom, nom, specialite) {
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          CreateProf(prenom: "${prenom}", nom: "${nom}") {
            id
            prenom
            nom
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
