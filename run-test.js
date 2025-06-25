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

function runTest(testPath) {
  console.log(`🔹 Ejecutando: ${testPath}`);
  execSync(`npx playwright test ${testPath}`, {
    stdio: 'inherit',
  });
}

(async () => {
  const tests =
    tipoTest === 'espacios' ? testsEspacio : testsEquipamiento;

  for (const test of tests) {
    runTest(test);
  }

  console.log('✅ Todas las pruebas completadas.');
})();
