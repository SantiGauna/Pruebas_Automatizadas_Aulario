# 🧪 Descripción de pruebas automatizadas

Este repositorio contiene las pruebas automatizadas, orientadas a validar funcionalidades clave del sistema. Incluyen:

✅ Pruebas E2E con Playwright, adaptadas para ejecución en múltiples navegadores y entornos móviles.

✅ Integración con GitHub Actions para ejecución automática desde el pipeline.

Estas pruebas permiten detectar regresiones rápidamente y asegurar la estabilidad en diferentes escenarios de uso.

# 🚀 Instalación y ejecución

# Clonar el repositorio
git clone https://github.com/SantiGauna/Pruebas_Automatizadas_Aulario.git
cd repositorio

# Instalar dependencias
npm install

# Instalar navegadores necesarios para Playwright
npx playwright install

# Ejecutar todas las pruebas
node run-test.js -> Se tienen que ejecutar de esta manera que es en cadena


# Ejecutar una prueba específica
npx playwright test tests/Equipamiento/equipamientos.spec.ts