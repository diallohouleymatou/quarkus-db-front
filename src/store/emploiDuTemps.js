// src/store/emploiDuTemps.js
import { writable } from 'svelte/store';

export const emploisDuTemps = writable([]);

export async function fetchEmploiDuTemps() {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          getEmploiDuTemps {
            id
            jour
            heureDebut
            heureFin
            matiere
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  emploisDuTemps.set(data.getEmploiDuTemps);
}

export async function createEmploiDuTemps(jour, heureDebut, heureFin, matiere) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          createEmploiDuTemps(jour: "${jour}", heureDebut: "${heureDebut}", heureFin: "${heureFin}", matiere: "${matiere}") {
            id
            jour
            heureDebut
            heureFin
            matiere
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  emploisDuTemps.update((prevEmplois) => [...prevEmplois, data.createEmploiDuTemps]);
}

export async function deleteEmploiDuTemps(id) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          deleteEmploiDuTemps(id: "${id}") {
            id
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  emploisDuTemps.update((prevEmplois) => prevEmplois.filter((emploi) => emploi.id !== data.deleteEmploiDuTemps.id));
}
