# 💪 GYM TRACKER

App web para trackear tu transformación física en 6 meses. Rutina completa + nutrición + analytics.

## Features

✅ **5 páginas:** Dashboard, Registrar, Historial, Análisis, Programa  
✅ **Charts en tiempo real:** Volumen semanal, frecuencia muscular, progresión de ejercicios  
✅ **Backup JSON:** Exporta/importa tus entrenamientos  
✅ **6 meses de rutina** con 3 fases de progresión  
✅ **Guía nutricional** completa (baja glucosa)  
✅ **Dark mode gaming aesthetic** — diseño motivador  

## Uso

Simplemente abrí `index.html` en tu navegador. Todo funciona **offline** — los datos se guardan localmente en tu navegador (localStorage).

### Backup de datos

Antes de cualquier cosa:
1. Ve al **Dashboard** (Inicio)
2. Scroll down hasta "Backup de datos"
3. Clickea **Exportar JSON** — descarga un archivo
4. **Guarda ese archivo en lugar seguro**

Si perdés los datos o cambiás de navegador:
1. Abrí la app en el nuevo lugar
2. Clickea **Importar JSON**
3. Seleccioná tu archivo guardado
4. ¡Listo! Todos tus entrenamientos vuelven

## Estructura

```
├── index.html      # HTML + CSS (todo en uno)
├── app.js          # Toda la lógica y datos
├── README.md       # Este archivo
└── .gitignore      # Lo que no sube a Git
```

## Deploy en Vercel

Esta app está lista para deployarse en **Vercel** sin costo.

### Pasos:

1. **En GitHub:**
   - Ya está en: https://github.com/nachobertero/gymtracker

2. **En Vercel:**
   - Ir a https://vercel.com
   - Click "New Project"
   - Conecta tu cuenta de GitHub
   - Seleccioná el repo `gymtracker`
   - Click "Deploy"
   - ¡Listo! Tu app está en vivo

3. **Auto-deploy:**
   - Cada vez que hagas `git push` a GitHub, Vercel automáticamente redeploya en ~2 minutos
   - Sin hacer nada manualmente

## Tech Stack

- **HTML5** — estructura
- **CSS3** — dark theme diseñado
- **JavaScript vanilla** — sin dependencias
- **Chart.js** (CDN) — gráficos
- **localStorage** — persistencia local

## Data

Todo se guarda **localmente en tu navegador** con localStorage:
- Clave: `gym_workouts_v2`
- Formato: JSON
- Sin servidor, sin base de datos, sin cuentas

## Fases de entrenamiento

**Fase 1 — Re-activación (4 semanas):** Recuperar fuerza post-vacaciones  
**Fase 2 — Volumen (8 semanas):** Aumentar cargas y series  
**Fase 3 — Intensificación (12 semanas):** Técnicas avanzadas, pico de forma  

Glúteos: **2 estímulos por semana** (jueves + viernes) porque 28 años sin crecer = necesita frecuencia.

## Nutrición

3,000–3,200 kcal/día
- Proteína: 190–200g
- Carbs complejos: 300g (batata, arroz integral)
- Grasas saludables: 90g

Baja glucosa: reemplaza pan blanco/fideos/arroz blanco.

---

**Última actualización:** 2026-04-14  
**Autor:** Entrenador personal — Claude  
**Para:** Nacho (58kg → Bestia en 6 meses)
