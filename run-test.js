const { execSync } = require('child_process');

const tests = [
  'tests/Equipamiento/equipamientos.spec.ts',
  'tests/Equipamiento/nuevo_equipamiento.spec.ts',
  'tests/Equipamiento/editar_equipamiento.spec.ts',
  'tests/Equipamiento/filtros_equipamiento.spec.ts',
];

function runTest(testPath) {
  console.log(`🔹 Ejecutando: ${testPath}`);
  execSync(`npx playwright test ${testPath}`, {
    stdio: 'inherit',
  });
}

(async () => {
  for (const test of tests) {
    runTest(test);
  }

  console.log('✅ Todas las pruebas completadas.');
})();
