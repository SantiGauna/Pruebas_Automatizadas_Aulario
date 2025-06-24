const { execSync } = require('child_process');

const tests = [
  'tests/Equipamiento/equipamientos.spec.ts',
  'tests/Equipamiento/nuevo_equipamiento.spec.ts',
  'tests/Equipamiento/editar_equipamiento.spec.ts',
  'tests/Equipamiento/filtros_equipamiento.spec.ts',
  
];

function runTest(path) {
  console.log(`Ejecutando: ${path}`);
  execSync(`npx playwright test ${path}`, { stdio: 'inherit' });
}

(async () => {
  for (const test of tests) {
    runTest(test);
  }
})();
