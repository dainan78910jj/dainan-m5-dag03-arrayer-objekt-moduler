// Dag 3, del 2: Funktioner som arbetar med menyn. Gör alla tester gröna på tests.html.
// Använd filter, map, find, reduce och sort där det passar.
// Typerna (Ratt, OrderRad) finns i typer.ts. Röda understrykningar tills du skrivit return är normalt.
import { formateraPris } from "./pris";
import type { Ratt, OrderRad } from "./typer";

// 1. Alla vegetariska rätter (filter). Returnerar en ny array.

// Guessing vegetariskaRatter is expected to return a new array containing only vegetarian dishes.
// I think it’s `filter`.

export function vegetariskaRatter(meny: Ratt[]): Ratt[] {
  const res = meny.filter((m) => m.vegetarisk);
  return res;
}

// 2. Bara namnen, som en array av text (map). ["Kardemummabulle", ...]
export function rattNamn(meny: Ratt[]): string[] {
  return meny.map((m) => m.namn);
}

// 3. En prislista som text: "Kardemummabulle – 35 kr" (map + formateraPris)
export function prislista(meny: Ratt[]): string[] {
  return meny.map((m) => `${m.namn} – ${formateraPris(m.pris)}`);
}

// 4. Hitta en rätt via id (find). Returnerar objektet, eller undefined om det saknas.
export function hittaRatt(meny: Ratt[], id: number): Ratt | undefined {
  return meny.find((m) => m.id === id);
}

// 5. Den billigaste rätten (reduce). Returnerar objektet. Tom lista ger undefined.
export function billigast(meny: Ratt[]): Ratt | undefined {
  if (meny.length === 0) {
    return undefined;
  }

  if (meny.length === 1) {
    return meny[0];
  }

  return meny.reduce((a, b) => (a.pris > b.pris ? b : a));
}

// 6. Sortera efter pris, billigast först. Returnerar en NY array.
//    Den ursprungliga listan får INTE ändras (sort ändrar originalet, så kopiera först).
export function sorteraEfterPris(meny: Ratt[]): Ratt[] {
  const res: Ratt[] = [...meny];
  res.sort((a, b) => a.pris - b.pris);
  return res;
}

// 7. Totalpris för en order. order = [{ id: 1, antal: 2 }, { id: 5, antal: 1 }]
//    Slå upp priset för varje id i menyn. Okända id räknas som 0 kr.
export function totalPris(order: OrderRad[], meny: Ratt[]): number {
  // solution 1
  let sum: number = 0;
  for (let i = 0; i < order.length; i++) {
    for (let j = 0; j < meny.length; j++) {
      if (order[i].id === meny[j].id) {
        sum += meny[j].pris * order[i].antal;
      }
    }
  }
  return sum;

  // solution 2
  // return order.reduce((sum: number, o: OrderRad) => {
  //   const ratt = meny.find((m) => m.id === o.id);
  //   if (ratt) {
  //     sum += ratt.pris * o.antal;
  //   }
  //   return sum;
  // }, 0);

  // solution 3
  // return meny.reduce((sum: number, m: Ratt) => {
  //   const od = order.find((o) => o.id === m.id);
  //   if (od) {
  //     sum += m.pris * od.antal;
  //   }
  //   return sum;
  // }, 0);
}

// 8. Antal rätter per kategori som ett objekt: { bakverk: 3, dryck: 2, lunch: 3 } (reduce)
export function perKategori(meny: Ratt[]): Record<string, number> {
  return meny.reduce<Record<string, number>>((category, m) => {
    if (category[m.kategori]) {
      category[m.kategori]++;
    } else {
      category[m.kategori] = 1;
    }
    return category;
  }, {});
}

// 9. En kopia av rätten med nytt pris. Originalet får INTE ändras (spread: { ...ratt }).
export function medNyttPris(ratt: Ratt, nyttPris: number): Ratt {
  // TODO
}
