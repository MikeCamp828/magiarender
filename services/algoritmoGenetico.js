// services/algoritmoGenetico.js

function calcularRutaOptima({
    listaPueblos,
    tipoRuta,
    startPueblo,
    distancias,
    costos,
    populationSize = 50,
    generations = 200,
    mutationRate = 0.1
  }) {
    // Generar población inicial
    let poblacion = generarPoblacionInicial(listaPueblos, startPueblo, populationSize);
  
    let mejorIndividuoGlobal = null;
  
    for (let gen = 0; gen < generations; gen++) {
      // Calcular fitness
      const poblacionConFitness = poblacion.map((ruta) => {
        const fit = calcularFitness(ruta, distancias, costos);
        return { ruta, fitness: fit };
      });
  
      // Mejor individuo de la generación
      const mejorGen = obtenerMejorIndividuo(poblacionConFitness);
      if (!mejorIndividuoGlobal || mejorGen.fitness < mejorIndividuoGlobal.fitness) {
        mejorIndividuoGlobal = { ...mejorGen };
      }
  
      // Crear nueva generación
      const nuevaPoblacion = crearNuevaPoblacion({
        poblacionConFitness,
        populationSize,
        mutationRate,
        startPueblo
      });
  
      poblacion = nuevaPoblacion;
    }
  
    // Distancia/costo total del mejor
    const distanciaTotal = calcularDistanciaTotal(mejorIndividuoGlobal.ruta, distancias, costos);
  
    return {
      mejorRuta: mejorIndividuoGlobal.ruta,
      distanciaTotal
    };
  }
  
  //////////////////////////////////////
  // 1. Generar población inicial
  //////////////////////////////////////
  function generarPoblacionInicial(listaPueblos, startPueblo, populationSize) {
    const pueblosSinInicio = listaPueblos.filter((p) => p !== startPueblo);
    const poblacion = [];
  
    for (let i = 0; i < populationSize; i++) {
      const permutados = shuffleArray([...pueblosSinInicio]);
      const individuo = [startPueblo, ...permutados, startPueblo];
      poblacion.push(individuo);
    }
    return poblacion;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  //////////////////////////////////////
  // 2. Fitness
  //////////////////////////////////////
  function calcularFitness(ruta, distancias, costos) {
    // Fitness = la suma de distancias + costos (menor = mejor)
    const distTotal = calcularDistanciaTotal(ruta, distancias, costos);
    return distTotal;
  }
  
  function calcularDistanciaTotal(ruta, distancias, costos) {
    let total = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
      const origen = ruta[i];
      const destino = ruta[i + 1];
      const distancia = obtenerDistancia(origen, destino, distancias);
      const costo = costos ? obtenerCosto(origen, destino, costos) : 0;
  
      console.log(
        `Distancia entre ${origen} y ${destino}: ${distancia} km, Costo: ${costo}`
      );
  
      total += distancia;
      total += costo;
    }
    console.log(`Distancia total para la ruta ${ruta.join(' -> ')}: ${total} km`);
    return total;
  }
  
  function obtenerDistancia(o, d, distancias) {
    if (!distancias[o] || distancias[o][d] == null) {
      console.warn(`Distancia no encontrada entre ${o} y ${d}. Verifica la matriz.`);
      return 999999; // fallback para rutas inválidas
    }
    return distancias[o][d];
  }
  
  function obtenerCosto(o, d, costos) {
    if (!costos[o] || costos[o][d] == null) {
      return 0;
    }
    return costos[o][d];
  }
  
  //////////////////////////////////////
  // 3. Nueva Población
  //////////////////////////////////////
  function crearNuevaPoblacion({ poblacionConFitness, populationSize, mutationRate, startPueblo }) {
    // Ordenar asc por fitness
    const ordenada = [...poblacionConFitness].sort((a, b) => a.fitness - b.fitness);
  
    const nueva = [];
    const ELITISM_COUNT = 2; // deja pasar a los 2 mejores
  
    for (let i = 0; i < ELITISM_COUNT; i++) {
      nueva.push([...ordenada[i].ruta]);
    }
  
    while (nueva.length < populationSize) {
      const padre = torneoSeleccion(ordenada).ruta;
      const madre = torneoSeleccion(ordenada).ruta;
  
      const hijo = crossover(padre, madre, startPueblo);
      mutacion(hijo, startPueblo, mutationRate);
      nueva.push(hijo);
    }
  
    return nueva;
  }
  
  function torneoSeleccion(ordenada) {
    const TORNEO_SIZE = 5;
    let mejor = null;
    for (let i = 0; i < TORNEO_SIZE; i++) {
      const idx = Math.floor(Math.random() * ordenada.length);
      const cand = ordenada[idx];
      if (!mejor || cand.fitness < mejor.fitness) {
        mejor = cand;
      }
    }
    return mejor;
  }
  
  function crossover(padre, madre, startPueblo) {
    const padreCentral = padre.slice(1, padre.length - 1);
    const madreCentral = madre.slice(1, madre.length - 1);
  
    const size = padreCentral.length;
    const hijoCentral = new Array(size).fill(null);
  
    const cut1 = Math.floor(Math.random() * size);
    const cut2 = Math.floor(Math.random() * size);
    const start = Math.min(cut1, cut2);
    const end = Math.max(cut1, cut2);
  
    for (let i = start; i <= end; i++) {
      hijoCentral[i] = padreCentral[i];
    }
  
    let idxMadre = 0;
    for (let i = 0; i < size; i++) {
      if (hijoCentral[i] == null) {
        while (hijoCentral.includes(madreCentral[idxMadre])) {
          idxMadre++;
          if (idxMadre >= size) idxMadre = 0;
        }
        hijoCentral[i] = madreCentral[idxMadre];
        idxMadre++;
      }
    }
  
    return [startPueblo, ...hijoCentral, startPueblo];
  }
  
  function mutacion(ruta, startPueblo, mutationRate) {
    for (let i = 1; i < ruta.length - 1; i++) {
      if (Math.random() < mutationRate) {
        const j = 1 + Math.floor(Math.random() * (ruta.length - 2));
        [ruta[i], ruta[j]] = [ruta[j], ruta[i]];
      }
    }
  }
  
  //////////////////////////////////////
  // 4. Mejor Individuo
  //////////////////////////////////////
  function obtenerMejorIndividuo(poblacionConFitness) {
    let mejor = poblacionConFitness[0];
    for (const ind of poblacionConFitness) {
      if (ind.fitness < mejor.fitness) {
        mejor = ind;
      }
    }
    return mejor;
  }
  
  module.exports = {
    calcularRutaOptima
  };
  