const { execSync } = require('child_process');

const tipoTest = process.argv[3];

const testsEquipamiento = [
  'tests/Equipamiento/equipamientos.spec.ts',
  'tests/Equipamiento/nuevo_equipamiento.spec.ts',
  'tests/Equipamiento/editar_equipamiento.spec.ts',
  'tests/Equipamiento/filtros_equipamiento.spec.ts',
];

const testsEspacio = [
  'tests/Espacios/espacio.spec.ts',
  'tests/Espacios/nuevo_espacio.spec.ts',
  'tests/Espacios/filtros_espacio.spec.ts',
];

const testsSectores = [
  'tests/Sectores/sector.spec.ts',
  'tests/Sectores/nuevo_sector.spec.ts',
  'tests/Sectores/filtros_sector.spec.ts',
];

function runTest(testPath) {
  console.log(`🔹 Ejecutando: ${testPath}`);
  execSync(`npx playwright test ${testPath}`, {
    stdio: 'inherit',
  });
}

(async () => {
  let tests;

  if (tipoTest === 'espacios') {
    tests = testsEspacio;
  } else if (tipoTest === 'equipamientos') {
    tests = testsEquipamiento;
  } else if (tipoTest === 'sectores') {
    tests = testsSectores;
  } else {
    console.error(`❌ Tipo de test no válido: ${tipoTest}`);
    process.exit(1);
  }

  for (const test of tests) {
    runTest(test);
  }

  console.log('✅ Todas las pruebas completadas.');
})();
