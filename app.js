// ─────────────────────────────────────────────
//  GYM TRACKER — Nacho
//  Datos, rutina y lógica completa
// ─────────────────────────────────────────────

const START_DATE = '2026-04-14'; // Día de inicio del programa
const GOAL_WEEKS = 24;

// ─── BASE DE EJERCICIOS ───────────────────────
const EXERCISE_DB = {
  'Pecho':       ['Press de banca', 'Press inclinado con mancuernas', 'Press declinado', 'Aperturas con mancuernas', 'Fondos en paralelas', 'Cable crossover', 'Pullover con mancuerna', 'Push-up con lastre'],
  'Espalda':     ['Dominadas', 'Jalón al pecho', 'Remo con barra', 'Remo con mancuerna', 'Remo en máquina', 'Peso muerto', 'Remo en polea', 'Pullover con mancuerna'],
  'Hombros':     ['Press militar con barra', 'Press Arnold', 'Elevaciones laterales', 'Elevaciones frontales', 'Pájaro', 'Face pulls en polea', 'Encogimientos'],
  'Bíceps':      ['Curl con barra', 'Curl con mancuernas alternado', 'Curl martillo', 'Curl concentrado', 'Curl en polea', 'Curl Scott'],
  'Tríceps':     ['Press francés', 'Extensión de tríceps en polea', 'Fondos en paralelas', 'Pushdown con cuerda', 'Kickback', 'Press cerrado en banca'],
  'Piernas':     ['Sentadilla con barra', 'Prensa de piernas', 'Extensión de cuádriceps', 'Curl de isquiotibiales', 'Sentadilla búlgara', 'Zancadas con mancuernas', 'Elevación de talones', 'Hack squat'],
  'Glúteos':     ['Hip thrust con barra', 'Peso muerto rumano', 'Sentadilla sumo', 'Abductor en máquina', 'Patada de glúteo en polea', 'Zancadas inversas', 'Step up'],
  'Abdominales': ['Crunch', 'Crunch en polea', 'Elevación de piernas', 'Russian twist', 'Rueda abdominal', 'Plancha', 'Oblicuos con mancuerna'],
  'Core':        ['Plancha frontal', 'Plancha lateral', 'Bird dog', 'Dead bug', 'Superman', 'Hollow hold'],
  'Full Body':   ['Peso muerto', 'Clean and press', 'Thruster', 'Burpee con mancuernas', 'Sentadilla + press'],
};

const MUSCLE_GROUPS = Object.keys(EXERCISE_DB);

// ─── RUTINA SEMANAL ───────────────────────────
const WEEKLY_ROUTINE = {
  1: { // Lunes
    label: 'PECHO + TRÍCEPS',
    emoji: '💪',
    groups: ['Pecho', 'Tríceps'],
    note: 'Post-fútbol. Sin piernas. Carga seria desde el minuto uno.',
    exercises: [
      { name: 'Press de banca', sets: 4, reps: '6-8', key: true },
      { name: 'Press inclinado con mancuernas', sets: 4, reps: '8-10' },
      { name: 'Aperturas con mancuernas', sets: 3, reps: '12-15' },
      { name: 'Fondos en paralelas', sets: 3, reps: 'Máx' },
      { name: 'Superserie: Press francés + Pushdown', sets: 3, reps: '10+12' },
      { name: '★ Crunch con peso 3×15 (pausa activa)', sets: null, reps: null, pause: true },
    ]
  },
  2: { // Martes
    label: 'ESPALDA + BÍCEPS',
    emoji: '🏋️',
    groups: ['Espalda', 'Bíceps'],
    note: 'Espalda ancha = V invertida. Dominadas lastradas si podés. Pesado.',
    exercises: [
      { name: 'Dominadas (lastradas si podés)', sets: 4, reps: 'Máx', key: true },
      { name: 'Remo con barra', sets: 4, reps: '6-8', key: true },
      { name: 'Remo con mancuerna unilateral', sets: 3, reps: '10 c/lado' },
      { name: 'Pullover con mancuerna', sets: 3, reps: '12' },
      { name: 'Curl con barra', sets: 3, reps: '8-10' },
      { name: 'Curl martillo', sets: 3, reps: '10' },
      { name: '★ Plancha 3×40s (pausa activa)', sets: null, reps: null, pause: true },
    ]
  },
  3: { // Miércoles
    label: 'HOMBROS + CORE',
    emoji: '🎯',
    groups: ['Hombros', 'Core'],
    note: 'Post-fútbol. Press pesado + laterales controladas. Hombros de bestia.',
    exercises: [
      { name: 'Press militar con barra', sets: 4, reps: '6-8', key: true },
      { name: 'Elevaciones laterales', sets: 4, reps: '12-15' },
      { name: 'Elevaciones frontales con disco', sets: 3, reps: '12' },
      { name: 'Pájaro (deltoides posterior)', sets: 3, reps: '15' },
      { name: 'Face pulls en polea', sets: 3, reps: '15' },
      { name: 'Encogimientos con barra', sets: 3, reps: '12' },
      { name: '★ Russian twist con disco 3×20 (pausa activa)', sets: null, reps: null, pause: true },
    ]
  },
  4: { // Jueves
    label: '🔥 PIERNAS + GLÚTEOS',
    emoji: '🔥',
    groups: ['Piernas', 'Glúteos'],
    note: '28 años sin glúteos terminan HOY. Hip thrust PESADO. Sentadilla PROFUNDA. Patada en polea para rematar.',
    exercises: [
      { name: 'Sentadilla con barra (profunda)', sets: 4, reps: '6-8', key: true },
      { name: 'Hip thrust con barra (pausa 2s arriba)', sets: 4, reps: '10-12', key: true },
      { name: 'Sentadilla búlgara', sets: 3, reps: '10 c/lado' },
      { name: 'Peso muerto rumano', sets: 4, reps: '8-10', key: true },
      { name: 'Abductor en máquina (peso alto)', sets: 3, reps: '15', key: true },
      { name: 'Patada de glúteo en polea (extensión completa)', sets: 3, reps: '12 c/lado', key: true },
      { name: 'Curl de isquiotibiales', sets: 3, reps: '12' },
      { name: 'Elevación de talones', sets: 4, reps: '20' },
      { name: '★ Elevación de piernas colgado 3×12 (pausa activa)', sets: null, reps: null, pause: true },
    ]
  },
  5: { // Viernes
    label: 'FULL BODY + GLÚTEOS',
    emoji: '⚡',
    groups: ['Full Body', 'Glúteos'],
    note: '2do estímulo de glúteos en la semana. Los grupos rezagados necesitan frecuencia 2×/sem mínimo.',
    exercises: [
      { name: 'Peso muerto convencional', sets: 4, reps: '5', key: true },
      { name: 'Hip thrust (más liviano, 15 reps, squeeze arriba)', sets: 3, reps: '15', key: true },
      { name: 'Press militar con barra', sets: 3, reps: '8' },
      { name: 'Dominadas', sets: 3, reps: 'Máx' },
      { name: 'Sentadilla goblet profunda', sets: 3, reps: '12' },
      { name: 'Patada de glúteo en polea', sets: 3, reps: '15 c/lado', key: true },
      { name: 'Superserie: Remo en polea + Curl mancuernas', sets: 3, reps: '10+10' },
      { name: '★ Rueda abdominal 3×12 (pausa activa)', sets: null, reps: null, pause: true },
    ]
  },
  6: { label: 'DESCANSO', emoji: '😴', groups: [], note: 'Recuperación activa. El músculo crece mientras descansás.', exercises: [] },
  0: { label: 'DESCANSO', emoji: '😴', groups: [], note: 'Domingo. Recargar para la semana.', exercises: [] },
};

// ─── FRASES MOTIVACIONALES ────────────────────
const QUOTES = [
  'El cuerpo que querés está del otro lado del esfuerzo que evitás.',
  'En invierno se construye el verano. Levantate.',
  'Cada repetición que hacés cuando no querés vale el doble.',
  'No es el gym que te da el cuerpo, es la constancia.',
  'Los glúteos no van a crecer solos. Jueves sagrado.',
  'Flaco hoy. Bestia en 6 meses. Depende de vos.',
  'La motivación te arranca. El hábito te lleva.',
  'Cada kilo más en la barra es un kilo más cerca del objetivo.',
  'Tu yo del futuro te va a agradecer que fuiste hoy.',
  'Afuera hace frío. Adentro se forjan campeones.',
  'No comparés tu capítulo 1 con el capítulo 20 de otro.',
  'El dolor de no intentarlo dura más que el de entrenar.',
];

// ─── PROGRAMA COMPLETO ────────────────────────
const PROGRAM = [
  {
    phase: 'FASE 1 — RE-ACTIVACIÓN',
    weeks: 'Semanas 1–4',
    desc: 'Re-adaptación post-vacaciones. Recuperar fuerza, afinar técnica, subir cargas rápido. Ya tenés base de 1 año — acá no se arranca suave.',
    color: '#7c3aed',
    days: [
      {
        day: 'LUNES', label: 'PECHO + TRÍCEPS', emoji: '💪',
        note: 'Post-fútbol. Sin piernas. Reactivar pecho con carga seria desde el día 1.',
        exercises: [
          { name: 'Press de banca', spec: '4×6-8 (pesado, buscar tu 80%)', key: true },
          { name: 'Press inclinado con mancuernas', spec: '4×8-10' },
          { name: 'Aperturas con mancuernas', spec: '3×12-15 (contracción lenta)' },
          { name: 'Fondos en paralelas', spec: '3×Máx (lastre si podés +10)' },
          { name: 'Superserie: Press francés + Pushdown cuerda', spec: '3×10+12' },
          { name: '★ Pausa activa: Crunch con peso 3×15', spec: '', pause: true },
        ]
      },
      {
        day: 'MARTES', label: 'ESPALDA + BÍCEPS', emoji: '🏋️',
        note: 'Espalda ancha = V invertida. Dominadas son tu mejor amigo. Si hacés menos de 8, usá jalón pesado.',
        exercises: [
          { name: 'Dominadas (lastradas si podés)', spec: '4×Máx', key: true },
          { name: 'Remo con barra', spec: '4×6-8 (pesado)', key: true },
          { name: 'Remo con mancuerna unilateral', spec: '3×10 c/lado (pausa 1s arriba)' },
          { name: 'Pullover con mancuerna', spec: '3×12' },
          { name: 'Curl con barra (EZ o recta)', spec: '3×8-10' },
          { name: 'Curl martillo', spec: '3×10' },
          { name: '★ Pausa activa: Plancha 3×40s', spec: '', pause: true },
        ]
      },
      {
        day: 'MIÉRCOLES', label: 'HOMBROS + CORE', emoji: '🎯',
        note: 'Post-fútbol. Hombros anchos + trapecios = presencia de bestia. Press pesado.',
        exercises: [
          { name: 'Press militar con barra', spec: '4×6-8 (pesado)', key: true },
          { name: 'Elevaciones laterales', spec: '4×12-15 (sin trampa, controlado)' },
          { name: 'Elevaciones frontales con disco', spec: '3×12' },
          { name: 'Pájaro (deltoides posterior)', spec: '3×15' },
          { name: 'Face pulls en polea', spec: '3×15' },
          { name: 'Encogimientos con barra', spec: '3×12' },
          { name: '★ Pausa activa: Russian twist con disco 3×20', spec: '', pause: true },
        ]
      },
      {
        day: 'JUEVES', label: 'PIERNAS + GLÚTEOS ⭐', emoji: '🔥',
        note: '28 años sin glúteos terminan HOY. Hip thrust PESADO. Patada en polea para rematar.',
        exercises: [
          { name: 'Sentadilla con barra (profunda, romper paralelo)', spec: '4×6-8', key: true },
          { name: 'Hip thrust con barra (PESADO, pausa 2s arriba)', spec: '4×10-12', key: true },
          { name: 'Sentadilla búlgara', spec: '3×10 c/lado' },
          { name: 'Peso muerto rumano', spec: '4×8-10', key: true },
          { name: 'Abductor en máquina (peso alto)', spec: '3×15', key: true },
          { name: 'Patada de glúteo en polea (extensión completa)', spec: '3×12 c/lado', key: true },
          { name: 'Curl de isquiotibiales', spec: '3×12' },
          { name: 'Elevación de talones', spec: '4×20' },
          { name: '★ Pausa activa: Elevación de piernas colgado 3×12', spec: '', pause: true },
        ]
      },
      {
        day: 'VIERNES', label: 'FULL BODY + GLÚTEOS', emoji: '⚡',
        note: '2do estímulo de glúteos. Frecuencia 2×/sem = crecimiento de grupos rezagados.',
        exercises: [
          { name: 'Peso muerto convencional', spec: '4×5 (pesado)', key: true },
          { name: 'Hip thrust (liviano, squeeze arriba)', spec: '3×15', key: true },
          { name: 'Press militar con barra', spec: '3×8' },
          { name: 'Dominadas', spec: '3×Máx' },
          { name: 'Sentadilla goblet profunda', spec: '3×12' },
          { name: 'Patada de glúteo en polea', spec: '3×15 c/lado', key: true },
          { name: 'Superserie: Remo en polea + Curl mancuernas', spec: '3×10+10' },
          { name: '★ Pausa activa: Rueda abdominal 3×12', spec: '', pause: true },
        ]
      },
    ]
  },
  {
    phase: 'FASE 2 — VOLUMEN',
    weeks: 'Semanas 5–12',
    desc: '+1 serie por ejercicio. Rotar variantes de ejercicios. Introducir superseries antagonistas. Overload progresivo obligatorio.',
    color: '#ec4899',
    days: [
      {
        day: 'LUNES', label: 'PECHO + TRÍCEPS', emoji: '💪',
        note: 'Misma estructura, +1 serie, rotar ejercicios: inclinado → declinado → neutro.',
        exercises: [
          { name: 'Press de banca / Press declinado (alternar)', spec: '5×6-8', key: true },
          { name: 'Press inclinado mancuernas', spec: '4×10' },
          { name: 'Cable crossover', spec: '4×12 + drop set final' },
          { name: 'Fondos en paralelas', spec: '4×Máx' },
          { name: 'Press cerrado en banca', spec: '3×10' },
          { name: '★ Pausa activa: Crunch con peso 3×15', spec: '', pause: true },
        ]
      },
      {
        day: 'MARTES', label: 'ESPALDA + BÍCEPS', emoji: '🏋️',
        note: 'Superseries espalda+bíceps. Más densidad de entrenamiento.',
        exercises: [
          { name: 'Dominadas lastradas (o jalón)', spec: '5×Máx', key: true },
          { name: 'Remo con barra', spec: '5×8', key: true },
          { name: 'Superserie: Remo mancuerna + Curl martillo', spec: '3×10+10' },
          { name: 'Remo en máquina', spec: '3×12' },
          { name: 'Curl Scott', spec: '3×10' },
          { name: 'Curl concentrado', spec: '3×12 c/lado' },
          { name: '★ Pausa activa: Plancha lateral 3×30s c/lado', spec: '', pause: true },
        ]
      },
      {
        day: 'MIÉRCOLES', label: 'HOMBROS + CORE', emoji: '🎯',
        note: 'Aumentar carga en press militar. Agregar trabajo de trapecios.',
        exercises: [
          { name: 'Press Arnold', spec: '4×10', key: true },
          { name: 'Press militar con barra', spec: '4×8' },
          { name: 'Elevaciones laterales', spec: '5×12-15 + drop set' },
          { name: 'Pájaro inclinado', spec: '4×15' },
          { name: 'Encogimientos con barra', spec: '3×15' },
          { name: '★ Pausa activa: Dead bug 3×10 c/lado', spec: '', pause: true },
        ]
      },
      {
        day: 'JUEVES', label: 'PIERNAS + GLÚTEOS ⭐', emoji: '🔥',
        note: 'Aumentar hip thrust cada semana. Patada en polea + abductor para matar glúteos.',
        exercises: [
          { name: 'Sentadilla con barra', spec: '5×6-8', key: true },
          { name: 'Hip thrust con barra', spec: '5×10-12 + pausa 1s arriba', key: true },
          { name: 'Sentadilla búlgara', spec: '4×10 c/lado' },
          { name: 'Peso muerto rumano', spec: '4×10', key: true },
          { name: 'Prensa de piernas (pie alto = más glúteo)', spec: '3×12' },
          { name: 'Abductor en máquina', spec: '4×15' },
          { name: 'Patada de glúteo en polea', spec: '4×12 c/lado', key: true },
          { name: 'Elevación de talones', spec: '4×20' },
          { name: '★ Pausa activa: Elevación de piernas 3×15', spec: '', pause: true },
        ]
      },
      {
        day: 'VIERNES', label: 'FULL BODY + GLÚTEOS', emoji: '⚡',
        note: '2do estímulo de glúteos. Superseries para densidad.',
        exercises: [
          { name: 'Peso muerto', spec: '5×4-5', key: true },
          { name: 'Hip thrust (liviano, alto reps)', spec: '3×15', key: true },
          { name: 'Superserie: Press militar + Jalón al pecho', spec: '3×8+10' },
          { name: 'Sentadilla frontal o goblet', spec: '3×10' },
          { name: 'Patada de glúteo en polea', spec: '3×15 c/lado', key: true },
          { name: 'Superserie: Curl barra + Pushdown', spec: '3×10+10' },
          { name: '★ Pausa activa: Rueda abdominal 3×12', spec: '', pause: true },
        ]
      },
    ]
  },
  {
    phase: 'FASE 3 — INTENSIFICACIÓN',
    weeks: 'Semanas 13–24',
    desc: 'Técnicas avanzadas: drop sets, rest-pause, superseries antagonistas. Pico de forma. Máxima intensidad.',
    color: '#f59e0b',
    days: [
      {
        day: 'LUNES', label: 'PECHO + TRÍCEPS', emoji: '💪',
        note: 'Drop sets en cada último set. Rest-pause en press de banca.',
        exercises: [
          { name: 'Press de banca (rest-pause en último set)', spec: '5×5 + rest-pause', key: true },
          { name: 'Press inclinado mancuernas', spec: '4×8 + drop set' },
          { name: 'Aperturas en polea alta', spec: '4×12-15' },
          { name: 'Fondos lastrados', spec: '4×Máx' },
          { name: 'Superserie: Press francés + Press cerrado', spec: '3×10+10' },
          { name: '★ Pausa activa: Crunch con rueda 3×12', spec: '', pause: true },
        ]
      },
      {
        day: 'MARTES', label: 'ESPALDA + BÍCEPS', emoji: '🏋️',
        note: 'Máxima intensidad. Cada set al límite.',
        exercises: [
          { name: 'Dominadas lastradas', spec: '5×Máx', key: true },
          { name: 'Peso muerto (estilo sumo o convencional)', spec: '4×5', key: true },
          { name: 'Remo con barra', spec: '4×8 + drop set' },
          { name: 'Remo en máquina', spec: '3×10 + pausa 2s' },
          { name: 'Curl con barra (rest-pause)', spec: '3×8 + rest-pause' },
          { name: 'Curl concentrado', spec: '3×12 c/lado' },
          { name: '★ Pausa activa: Bird dog 3×10 c/lado', spec: '', pause: true },
        ]
      },
      {
        day: 'MIÉRCOLES', label: 'HOMBROS + CORE', emoji: '🎯',
        note: 'Drop sets en elevaciones laterales. Press pesado.',
        exercises: [
          { name: 'Press militar pesado', spec: '5×5', key: true },
          { name: 'Elevaciones laterales', spec: '5×10 + 3 drop sets' },
          { name: 'Pájaro', spec: '4×15' },
          { name: 'Superserie: Face pulls + Elevaciones frontales', spec: '3×12+12' },
          { name: '★ Pausa activa: Hollow hold 3×30s', spec: '', pause: true },
        ]
      },
      {
        day: 'JUEVES', label: 'PIERNAS + GLÚTEOS ⭐', emoji: '🔥',
        note: 'El día definitivo. Hip thrust máximo peso. Patada en polea con drop set. Glúteos al límite absoluto.',
        exercises: [
          { name: 'Sentadilla con barra', spec: '5×5 pesado', key: true },
          { name: 'Hip thrust con barra (máximo peso)', spec: '5×8-10', key: true },
          { name: 'Sentadilla búlgara + drop set', spec: '4×8 c/lado' },
          { name: 'Peso muerto rumano', spec: '4×8 + pausa 2s abajo', key: true },
          { name: 'Superserie: Abductor + Patada de glúteo en polea', spec: '4×15+12', key: true },
          { name: 'Prensa (pie alto)', spec: '3×10 + drop set' },
          { name: 'Elevación de talones', spec: '5×20' },
          { name: '★ Pausa activa: Elevación de piernas + oblicuos', spec: '', pause: true },
        ]
      },
      {
        day: 'VIERNES', label: 'FULL BODY + GLÚTEOS', emoji: '⚡',
        note: '2do estímulo de glúteos. Todo al máximo. Vos lo pediste.',
        exercises: [
          { name: 'Peso muerto (PR intent)', spec: '5×3-4', key: true },
          { name: 'Hip thrust (mecánico: pesado→liviano, sin parar)', spec: '3×8+8+8', key: true },
          { name: 'Press militar', spec: '4×6' },
          { name: 'Dominadas', spec: '4×Máx' },
          { name: 'Patada de glúteo en polea + drop set', spec: '3×12 c/lado', key: true },
          { name: 'Superserie: Curl barra + Pushdown cuerda', spec: '4×10+10' },
          { name: '★ Pausa activa: Rueda + planchas 3×10', spec: '', pause: true },
        ]
      },
    ]
  },
];

// ─── NUTRICIÓN ────────────────────────────────
const NUTRITION = {
  goal: '3.000–3.200 kcal/día',
  macros: [
    { name: 'Proteína', amount: '190–200g', kcal: '~800 kcal', note: 'Prioridad absoluta' },
    { name: 'Carbohidratos (complejos)', amount: '300g', kcal: '~1.200 kcal', note: 'Batata, arroz integral, quinoa' },
    { name: 'Grasas saludables', amount: '90g', kcal: '~810 kcal', note: 'Huevos, aceite oliva, frutos secos' },
  ],
  meals: [
    {
      name: 'Desayuno (pre-gym)',
      kcal: '~700 kcal · 45g prot',
      items: '5-6 huevos revueltos · 2 rodajas pan integral · 30g nueces o almendras · Café sin azúcar'
    },
    {
      name: 'Almuerzo',
      kcal: '~750 kcal · 55g prot',
      items: '200g pechuga o milanesas de pollo · Batata o arroz integral · Ensalada con aceite de oliva'
    },
    {
      name: 'Merienda (post-gym)',
      kcal: '~450 kcal · 30g prot',
      items: '3-4 huevos hervidos · Pan integral con queso crema · 1 fruta'
    },
    {
      name: 'Cena',
      kcal: '~700 kcal · 50g prot',
      items: '200g pollo / carne vacuna (3×/sem) / salmón · Verduras salteadas · Sin fideos blancos'
    },
    {
      name: 'Antes de dormir',
      kcal: '~300 kcal · 25g prot',
      items: '200g yogur griego sin azúcar · 30g frutos secos'
    },
  ],
  supplements: [
    { name: 'Creatina', dose: '5g/día', when: 'Cualquier hora', ok: true },
    { name: 'Vitamina D3 + K2', dose: '2.000–4.000 IU', when: 'Con el desayuno', ok: false },
    { name: 'Omega-3', dose: '2-3g/día', when: 'Con comidas', ok: false },
    { name: 'Zinc + Magnesio (ZMA)', dose: 'Según dosis', when: 'Antes de dormir', ok: false },
  ],
  changes: [
    'Reemplazar pan lactal blanco por pan integral',
    'Reemplazar arroz blanco por arroz integral, batata o quinoa',
    'Eliminar fideos blancos en cena',
    'Agregar carne vacuna 2-3 veces/semana (hierro + zinc)',
    'Siempre aceite de oliva en ensaladas',
    'Agregar frutos secos como snack diario',
  ]
};

// ─── ESTADO Y DATOS ───────────────────────────
let workouts = [];
let weights = [];
let currentWorkout = null;
let charts = {};

function loadData() {
  const saved = localStorage.getItem('gym_workouts_v2');
  if (saved) {
    try { workouts = JSON.parse(saved); }
    catch (e) { workouts = []; }
  }
  const savedWeights = localStorage.getItem('gym_weights_v1');
  if (savedWeights) {
    try { weights = JSON.parse(savedWeights); }
    catch (e) { weights = []; }
  }
}

function saveData() {
  localStorage.setItem('gym_workouts_v2', JSON.stringify(workouts));
  localStorage.setItem('gym_weights_v1', JSON.stringify(weights));
}

// ─── HELPERS ──────────────────────────────────
function today() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

function getDayOfWeek() {
  return new Date().getDay(); // 0=Dom, 1=Lun...6=Sáb
}

function getStreak() {
  if (!workouts.length) return 0;
  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  const t = new Date(); t.setHours(0, 0, 0, 0);
  for (let i = 0; i < 60; i++) {
    const d = new Date(t); d.setDate(t.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    if (sorted.find(w => w.date === ds)) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function getTotalVolume(w) {
  return w.exercises.reduce((sum, ex) => {
    return sum + ex.sets.reduce((s2, set) => s2 + (parseFloat(set.reps) || 0) * (parseFloat(set.weight) || 0), 0);
  }, 0);
}

function getWeekVolume() {
  const start = new Date(); start.setDate(start.getDate() - start.getDay());
  const sv = start.toISOString().split('T')[0];
  return workouts
    .filter(w => w.date >= sv)
    .reduce((sum, w) => sum + getTotalVolume(w), 0);
}

function getProgressWeeks() {
  const start = new Date(START_DATE + 'T00:00:00');
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7));
  return Math.min(Math.max(diff, 0), GOAL_WEEKS);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── NAVIGATE ─────────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById(`nav-${page}`).classList.add('active');

  if (page === 'dash') renderDash();
  if (page === 'log') renderLog();
  if (page === 'hist') renderHist();
  if (page === 'anal') renderAnal();
  if (page === 'prog') renderProg();
  if (page === 'weight') renderWeight();
}

// ─── TOAST ────────────────────────────────────
function toast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '') + ' show';
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── DASHBOARD ────────────────────────────────
function renderDash() {
  const dow = getDayOfWeek();
  const dayData = WEEKLY_ROUTINE[dow];
  const streak = getStreak();
  const weekVol = Math.round(getWeekVolume());
  const totalW = workouts.length;
  const progWeeks = getProgressWeeks();
  const progPct = Math.round((progWeeks / GOAL_WEEKS) * 100);
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const now = new Date();
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`;

  let todayHTML = '';
  if (dayData && dayData.exercises.length) {
    const mainExs = dayData.exercises.filter(e => !e.pause).slice(0, 4);
    todayHTML = `
      <div class="card">
        <div class="card-title"><span class="dot"></span>Entrenamiento de hoy</div>
        <div class="today-day">${dayData.emoji} ${dayData.label}</div>
        <div class="today-muscle">${dayData.groups.join(' + ')}</div>
        ${mainExs.map(e => `
          <div class="exercise-preview">
            <span${e.key ? ' style="color:var(--accent-l);font-weight:700"' : ''}>${e.name}</span>
            <span class="ex-spec">${e.sets ? e.sets + '×' + e.reps : ''}</span>
          </div>
        `).join('')}
        ${dayData.exercises.length > 4 ? `<div class="text-muted mt8" style="font-size:13px">+${dayData.exercises.filter(e=>!e.pause).length - 4} ejercicios más</div>` : ''}
        <button class="btn btn-primary mt14" onclick="startWorkoutFromRoutine()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Empezar entrenamiento
        </button>
      </div>
    `;
  } else {
    todayHTML = `
      <div class="card">
        <div class="card-title"><span class="dot"></span>Hoy</div>
        <div style="text-align:center;padding:16px 0">
          <div style="font-size:40px">😴</div>
          <div style="font-weight:700;margin-top:8px">Día de descanso</div>
          <div class="text-muted mt8">El músculo crece mientras descansás.</div>
        </div>
      </div>
    `;
  }

  document.getElementById('page-dash').innerHTML = `
    <div class="hero">
      <div class="hero-date">${dateStr}</div>
      <div class="hero-title">Vamos, <span>Nacho</span> 💪</div>
      <div class="hero-sub">Semana ${progWeeks} de ${GOAL_WEEKS} · ${GOAL_WEEKS - progWeeks} semanas para el objetivo</div>
      <div class="prog-wrap">
        <div class="prog-label">
          <span>Progreso al objetivo</span>
          <span>${progPct}%</span>
        </div>
        <div class="prog-bar"><div class="prog-fill" style="width:${progPct}%"></div></div>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-val">${streak}</div>
        <div class="stat-lbl">🔥 Racha días</div>
      </div>
      <div class="stat">
        <div class="stat-val">${totalW}</div>
        <div class="stat-lbl">Total entrenamientos</div>
      </div>
      <div class="stat">
        <div class="stat-val">${weekVol > 0 ? (weekVol >= 1000 ? (weekVol/1000).toFixed(1)+'t' : weekVol+'kg') : '—'}</div>
        <div class="stat-lbl">Volumen esta semana</div>
      </div>
      <div class="stat">
        <div class="stat-val">${progWeeks}</div>
        <div class="stat-lbl">Semanas completadas</div>
      </div>
    </div>

    ${todayHTML}

    <div class="quote-card">
      <div class="quote-text">"${quote}"</div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--warning)"></span>Backup de datos</div>
      <div class="text-muted mb10" style="font-size:13px">Exportá tu progreso antes de perderlo. localStorage vive en el navegador — si limpiás datos, se borra.</div>
      <div class="row">
        <button class="btn btn-secondary btn-sm" onclick="exportData()">⬇ Exportar JSON</button>
        <button class="btn btn-secondary btn-sm" onclick="importData()">⬆ Importar JSON</button>
      </div>
    </div>
  `;
}

// ─── REGISTRAR WORKOUT ────────────────────────
let logState = {
  date: today(),
  muscleGroups: [],
  exercises: [],   // { id, name, sets: [{reps, weight, done}] }
  notes: '',
};

function startWorkoutFromRoutine() {
  const dow = getDayOfWeek();
  const dayData = WEEKLY_ROUTINE[dow];
  logState = { date: today(), muscleGroups: [...(dayData?.groups || [])], exercises: [], notes: '' };
  // Pre-cargar ejercicios de la rutina (solo los principales, sin pausas activas)
  if (dayData) {
    dayData.exercises.filter(e => !e.pause).forEach(e => {
      const sets = [];
      const n = e.sets || 3;
      for (let i = 0; i < n; i++) sets.push({ reps: '', weight: '', done: false });
      logState.exercises.push({ id: uid(), name: e.name, sets });
    });
  }
  navigate('log');
}

function renderLog() {
  const page = document.getElementById('page-log');

  const chipsHTML = MUSCLE_GROUPS.map(g => `
    <div class="chip ${logState.muscleGroups.includes(g) ? 'on' : ''}"
      onclick="toggleGroup('${g}')">${g}</div>
  `).join('');

  const exsHTML = logState.exercises.map((ex, ei) => renderExBlock(ex, ei)).join('');

  page.innerHTML = `
    <h2>Registrar entrenamiento</h2>

    <div class="card">
      <div class="form-group">
        <label>Fecha</label>
        <input type="date" id="log-date" value="${logState.date}" onchange="logState.date=this.value">
      </div>
      <div class="form-group">
        <label>Grupos musculares</label>
        <div class="chips">${chipsHTML}</div>
      </div>
    </div>

    <div id="exercises-container">${exsHTML}</div>

    <button class="btn btn-secondary btn-full mb10" onclick="openExModal()">
      + Agregar ejercicio
    </button>

    <div class="card">
      <div class="form-group" style="margin:0">
        <label>Notas</label>
        <textarea id="log-notes" rows="2" placeholder="Cómo te sentiste, PR, dolor..."
          onchange="logState.notes=this.value">${logState.notes}</textarea>
      </div>
    </div>

    <button class="btn btn-primary mt14" onclick="saveWorkout()">
      Guardar entrenamiento
    </button>
    <button class="btn btn-ghost btn-full mt8" onclick="clearLog()">
      Limpiar todo
    </button>
  `;
}

function renderExBlock(ex, ei) {
  const setsHTML = ex.sets.map((set, si) => `
    <div class="sets-grid" style="margin-bottom:6px">
      <div class="set-num">${si + 1}</div>
      <input type="number" class="set-input" placeholder="Reps" value="${set.reps}"
        oninput="updateSet(${ei},${si},'reps',this.value)" inputmode="decimal" min="0">
      <input type="number" class="set-input" placeholder="Kg" value="${set.weight}"
        oninput="updateSet(${ei},${si},'weight',this.value)" inputmode="decimal" min="0" step="0.5">
      <button class="set-done${set.done ? ' checked' : ''}" onclick="toggleSetDone(${ei},${si})">
        ${set.done ? '✓' : '○'}
      </button>
    </div>
  `).join('');

  return `
    <div class="ex-block" id="exblock-${ei}">
      <div class="ex-block-head">
        <div class="ex-name">${ex.name}</div>
        <button class="btn btn-danger btn-sm" onclick="removeExercise(${ei})">✕</button>
      </div>
      <div class="sets-grid" style="margin-bottom:8px">
        <div></div>
        <div class="set-label">REPS</div>
        <div class="set-label">KG</div>
        <div></div>
      </div>
      <div id="sets-${ei}">${setsHTML}</div>
      <button class="add-set-btn" onclick="addSet(${ei})">+ Serie</button>
    </div>
  `;
}

function refreshExercises() {
  const cont = document.getElementById('exercises-container');
  if (cont) cont.innerHTML = logState.exercises.map((ex, ei) => renderExBlock(ex, ei)).join('');
}

function toggleGroup(g) {
  if (logState.muscleGroups.includes(g)) {
    logState.muscleGroups = logState.muscleGroups.filter(x => x !== g);
  } else {
    logState.muscleGroups.push(g);
  }
  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('on', logState.muscleGroups.includes(c.textContent.trim()));
  });
}

function updateSet(ei, si, field, val) {
  if (logState.exercises[ei] && logState.exercises[ei].sets[si]) {
    logState.exercises[ei].sets[si][field] = val;
  }
}

function toggleSetDone(ei, si) {
  if (logState.exercises[ei] && logState.exercises[ei].sets[si]) {
    logState.exercises[ei].sets[si].done = !logState.exercises[ei].sets[si].done;
    const btn = document.querySelector(`#exblock-${ei} #sets-${ei} .set-done:nth-of-type(${si + 1})`);
    // Re-render just the set row
    const setsDiv = document.getElementById(`sets-${ei}`);
    if (setsDiv) setsDiv.innerHTML = logState.exercises[ei].sets.map((set, si2) => `
      <div class="sets-grid" style="margin-bottom:6px">
        <div class="set-num">${si2 + 1}</div>
        <input type="number" class="set-input" placeholder="Reps" value="${set.reps}"
          oninput="updateSet(${ei},${si2},'reps',this.value)" inputmode="decimal" min="0">
        <input type="number" class="set-input" placeholder="Kg" value="${set.weight}"
          oninput="updateSet(${ei},${si2},'weight',this.value)" inputmode="decimal" min="0" step="0.5">
        <button class="set-done${set.done ? ' checked' : ''}" onclick="toggleSetDone(${ei},${si2})">
          ${set.done ? '✓' : '○'}
        </button>
      </div>
    `).join('');
  }
}

function addSet(ei) {
  if (!logState.exercises[ei]) return;
  // Smart default: copy last set weight
  const last = logState.exercises[ei].sets.slice(-1)[0];
  logState.exercises[ei].sets.push({ reps: last?.reps || '', weight: last?.weight || '', done: false });
  const setsDiv = document.getElementById(`sets-${ei}`);
  if (setsDiv) setsDiv.innerHTML = logState.exercises[ei].sets.map((set, si) => `
    <div class="sets-grid" style="margin-bottom:6px">
      <div class="set-num">${si + 1}</div>
      <input type="number" class="set-input" placeholder="Reps" value="${set.reps}"
        oninput="updateSet(${ei},${si},'reps',this.value)" inputmode="decimal" min="0">
      <input type="number" class="set-input" placeholder="Kg" value="${set.weight}"
        oninput="updateSet(${ei},${si},'weight',this.value)" inputmode="decimal" min="0" step="0.5">
      <button class="set-done${set.done ? ' checked' : ''}" onclick="toggleSetDone(${ei},${si})">
        ${set.done ? '✓' : '○'}
      </button>
    </div>
  `).join('');
}

function removeExercise(ei) {
  logState.exercises.splice(ei, 1);
  refreshExercises();
}

function saveWorkout() {
  if (!logState.exercises.length) {
    toast('Agregá al menos un ejercicio', 'error'); return;
  }
  const workout = {
    id: uid(),
    date: logState.date,
    dayOfWeek: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][new Date(logState.date + 'T00:00:00').getDay()],
    muscleGroups: [...logState.muscleGroups],
    exercises: logState.exercises.map(ex => ({
      name: ex.name,
      sets: ex.sets.filter(s => s.reps || s.weight).map(s => ({
        reps: parseFloat(s.reps) || 0,
        weight: parseFloat(s.weight) || 0,
        done: s.done
      }))
    })).filter(ex => ex.sets.length),
    notes: logState.notes,
  };
  workouts.unshift(workout);
  saveData();
  toast('Entrenamiento guardado 💪');
  logState = { date: today(), muscleGroups: [], exercises: [], notes: '' };
  setTimeout(() => navigate('hist'), 500);
}

function clearLog() {
  logState = { date: today(), muscleGroups: [], exercises: [], notes: '' };
  renderLog();
}

// ─── MODAL: EJERCICIOS ────────────────────────
function openExModal() {
  document.getElementById('ex-modal').classList.add('open');
  buildExList('');
  document.getElementById('ex-search').value = '';
  document.getElementById('ex-search').focus();
}

function closeExModal(e) {
  if (e.target === document.getElementById('ex-modal')) {
    document.getElementById('ex-modal').classList.remove('open');
  }
}

function buildExList(filter) {
  const fl = filter.toLowerCase();
  const list = document.getElementById('ex-list');
  let html = '';
  for (const [group, exercises] of Object.entries(EXERCISE_DB)) {
    const matched = exercises.filter(e => e.toLowerCase().includes(fl));
    matched.forEach(name => {
      html += `<div class="ex-opt" onclick="selectExercise('${name.replace(/'/g,"\\'")}')">
        <span>${name}</span>
        <span class="ex-opt-group">${group}</span>
      </div>`;
    });
  }
  // Custom exercise option
  if (filter && !Object.values(EXERCISE_DB).flat().some(e => e.toLowerCase() === fl)) {
    html += `<div class="ex-opt" onclick="selectExercise('${filter.replace(/'/g,"\\'")}')">
      <span>➕ Agregar "${filter}"</span>
      <span class="ex-opt-group">Personalizado</span>
    </div>`;
  }
  list.innerHTML = html || '<div style="padding:14px;color:var(--muted);text-align:center">Sin resultados</div>';
}

function filterExList() {
  buildExList(document.getElementById('ex-search').value);
}

function selectExercise(name) {
  document.getElementById('ex-modal').classList.remove('open');
  logState.exercises.push({ id: uid(), name, sets: [{ reps: '', weight: '', done: false }] });
  refreshExercises();
}

// ─── HISTORIAL ────────────────────────────────
function renderHist() {
  const page = document.getElementById('page-hist');
  if (!workouts.length) {
    page.innerHTML = `<h2>Historial</h2>
      <div class="empty">
        <div class="empty-icon">📋</div>
        <div class="empty-text">Sin entrenamientos todavía</div>
        <div class="empty-sub">Registrá tu primer entrenamiento</div>
      </div>`;
    return;
  }

  const items = workouts.map((w, i) => {
    const vol = Math.round(getTotalVolume(w));
    const totalSets = w.exercises.reduce((s, ex) => s + ex.sets.length, 0);
    return `
      <div class="hist-item" onclick="toggleDetail(${i})">
        <div class="hist-date">${formatDate(w.date)} · ${w.dayOfWeek}</div>
        <div class="hist-muscles">
          ${w.muscleGroups.map(g => `<span class="hist-tag">${g}</span>`).join('')}
        </div>
        <div class="hist-exlist">${w.exercises.map(e => e.name).join(' · ')}</div>
        <div class="hist-stats">
          <div class="hist-stat"><span>${w.exercises.length}</span> ejercicios</div>
          <div class="hist-stat"><span>${totalSets}</span> series</div>
          ${vol > 0 ? `<div class="hist-stat"><span>${vol >= 1000 ? (vol/1000).toFixed(1)+'t' : vol+'kg'}</span> volumen</div>` : ''}
        </div>
        <div class="hist-detail" id="detail-${i}">
          ${w.exercises.map(ex => `
            <div style="margin-bottom:12px">
              <div style="font-weight:700;font-size:14px;margin-bottom:6px">${ex.name}</div>
              ${ex.sets.map((s,si) => `
                <div style="font-size:13px;color:var(--muted);padding:2px 0">
                  Serie ${si+1}: <span style="color:var(--text)">${s.reps} reps</span>
                  ${s.weight ? `× <span style="color:var(--accent-l);font-weight:700">${s.weight} kg</span>` : ''}
                  ${s.done ? ' ✓' : ''}
                </div>
              `).join('')}
            </div>
          `).join('')}
          ${w.notes ? `<div style="background:var(--surface3);border-radius:10px;padding:10px;font-size:13px;color:var(--muted);margin-top:6px">📝 ${w.notes}</div>` : ''}
          <button class="btn btn-danger btn-sm mt8" onclick="deleteWorkout('${w.id}', event)">Eliminar</button>
        </div>
      </div>
    `;
  }).join('');

  page.innerHTML = `<h2>Historial <span style="color:var(--muted);font-size:15px;font-weight:400">(${workouts.length})</span></h2>${items}`;
}

function toggleDetail(i) {
  const d = document.getElementById(`detail-${i}`);
  if (d) d.classList.toggle('open');
}

function deleteWorkout(id, e) {
  e.stopPropagation();
  if (!confirm('¿Eliminar este entrenamiento?')) return;
  workouts = workouts.filter(w => w.id !== id);
  saveData();
  renderHist();
  toast('Eliminado');
}

// ─── ANÁLISIS / CHARTS ────────────────────────
function renderAnal() {
  const page = document.getElementById('page-anal');

  // Get all exercises for the selector
  const allExercises = [...new Set(workouts.flatMap(w => w.exercises.map(e => e.name)))];

  page.innerHTML = `
    <h2>Análisis</h2>
    <div class="chart-card">
      <div class="chart-title">Volumen por semana (kg)</div>
      <div class="chart-wrap"><canvas id="chart-vol"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Frecuencia muscular</div>
      <div class="chart-wrap"><canvas id="chart-muscle"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Progresión de ejercicio</div>
      <div class="form-group" style="margin-bottom:12px">
        <select id="ex-selector" onchange="renderExProgress()">
          <option value="">— Seleccionar ejercicio —</option>
          ${allExercises.map(e => `<option value="${e}">${e}</option>`).join('')}
        </select>
      </div>
      <div class="chart-wrap"><canvas id="chart-ex"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Entrenamientos por día de semana</div>
      <div class="chart-wrap"><canvas id="chart-days"></canvas></div>
    </div>
  `;

  setTimeout(() => {
    renderVolChart();
    renderMuscleChart();
    renderDaysChart();
    if (allExercises.length) {
      document.getElementById('ex-selector').value = allExercises[0];
      renderExProgress();
    }
  }, 50);
}

const CHART_DEFAULTS = {
  color: 'rgba(167,139,250,1)',
  colorAlpha: 'rgba(167,139,250,0.15)',
  grid: 'rgba(255,255,255,0.05)',
  text: '#6666aa',
};

function chartOptions(yLabel = '') {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#22223a', titleColor: '#e4e4f0', bodyColor: '#a78bfa', padding: 10, cornerRadius: 10 } },
    scales: {
      x: { ticks: { color: CHART_DEFAULTS.text, font: { size: 11 } }, grid: { color: CHART_DEFAULTS.grid } },
      y: { ticks: { color: CHART_DEFAULTS.text, font: { size: 11 } }, grid: { color: CHART_DEFAULTS.grid }, title: { display: !!yLabel, text: yLabel, color: CHART_DEFAULTS.text } }
    }
  };
}

function renderVolChart() {
  // Group workouts by ISO week
  const weekMap = {};
  workouts.forEach(w => {
    const d = new Date(w.date + 'T00:00:00');
    const week = getISOWeek(d);
    if (!weekMap[week]) weekMap[week] = 0;
    weekMap[week] += getTotalVolume(w);
  });
  const sorted = Object.entries(weekMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-10);
  const labels = sorted.map(([k]) => 'Sem ' + k.split('-W')[1]);
  const data = sorted.map(([, v]) => Math.round(v));

  const ctx = document.getElementById('chart-vol');
  if (!ctx) return;
  if (charts.vol) charts.vol.destroy();
  charts.vol = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, backgroundColor: 'rgba(124,58,237,0.6)', borderColor: 'rgba(167,139,250,1)', borderWidth: 1, borderRadius: 6 }]
    },
    options: chartOptions('kg')
  });
}

function renderMuscleChart() {
  const freq = {};
  workouts.forEach(w => w.muscleGroups.forEach(g => { freq[g] = (freq[g] || 0) + 1; }));
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const labels = sorted.map(([k]) => k);
  const data = sorted.map(([, v]) => v);
  const colors = ['#7c3aed','#a855f7','#ec4899','#f59e0b','#22c55e','#3b82f6','#ef4444','#06b6d4','#8b5cf6','#d946ef'];

  const ctx = document.getElementById('chart-muscle');
  if (!ctx) return;
  if (charts.muscle) charts.muscle.destroy();
  charts.muscle = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, data.length), borderRadius: 6 }]
    },
    options: chartOptions('veces')
  });
}

function renderExProgress() {
  const exName = document.getElementById('ex-selector')?.value;
  if (!exName) return;

  const points = [];
  [...workouts].reverse().forEach(w => {
    const ex = w.exercises.find(e => e.name === exName);
    if (ex && ex.sets.length) {
      const maxWeight = Math.max(...ex.sets.map(s => s.weight || 0));
      if (maxWeight > 0) points.push({ date: w.date, weight: maxWeight });
    }
  });

  const labels = points.map(p => formatDate(p.date));
  const data = points.map(p => p.weight);

  const ctx = document.getElementById('chart-ex');
  if (!ctx) return;
  if (charts.ex) charts.ex.destroy();
  charts.ex = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data, label: exName,
        borderColor: 'rgba(236,72,153,1)',
        backgroundColor: 'rgba(236,72,153,0.1)',
        pointBackgroundColor: 'rgba(236,72,153,1)',
        tension: 0.3, fill: true, pointRadius: 4,
      }]
    },
    options: {
      ...chartOptions('kg max'),
      plugins: { ...chartOptions().plugins, legend: { display: true, labels: { color: '#a78bfa', font: { size: 12 } } } }
    }
  });
}

function renderDaysChart() {
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const freq = [0, 0, 0, 0, 0, 0, 0];
  workouts.forEach(w => {
    const d = new Date(w.date + 'T00:00:00').getDay();
    freq[d]++;
  });
  const ctx = document.getElementById('chart-days');
  if (!ctx) return;
  if (charts.days) charts.days.destroy();
  charts.days = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dayNames,
      datasets: [{ data: freq, backgroundColor: freq.map((v, i) => i >= 1 && i <= 5 ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.1)'), borderRadius: 6 }]
    },
    options: chartOptions('veces')
  });
}

function getISOWeek(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

// ─── PROGRAMA ─────────────────────────────────
function renderProg() {
  const page = document.getElementById('page-prog');

  const phaseColors = { 0: '#7c3aed', 1: '#ec4899', 2: '#f59e0b' };

  const phasesHTML = PROGRAM.map((ph, pi) => `
    <div class="phase-header" style="border-color: ${phaseColors[pi]}44; background: linear-gradient(135deg, ${phaseColors[pi]}22 0%, ${phaseColors[pi]}11 100%)">
      <div class="phase-name">${ph.phase}</div>
      <div class="phase-weeks">${ph.weeks}</div>
      <div class="phase-desc">${ph.desc}</div>
    </div>
    ${ph.days.map((d, di) => `
      <div class="rday">
        <div class="rday-head" onclick="toggleRDay('${pi}-${di}')">
          <div class="rday-left">
            <span class="rday-emoji">${d.emoji}</span>
            <div>
              <div class="rday-name">${d.day}</div>
              <div class="rday-muscle">${d.label}</div>
            </div>
          </div>
          <span class="rday-arrow" id="arr-${pi}-${di}">▼</span>
        </div>
        <div class="rday-body" id="rday-${pi}-${di}">
          <div class="rday-note">${d.note}</div>
          ${d.exercises.map(e => `
            <div class="rex${e.key ? ' key' : ''}${e.pause ? ' pause' : ''}">
              <span class="rex-name">${e.name}</span>
              ${e.spec ? `<span class="rex-spec">${e.spec}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
    <div style="height:8px"></div>
  `).join('');

  // Nutrition section
  const nutriHTML = `
    <div class="card mt14">
      <div class="card-title"><span class="dot" style="background:var(--success)"></span>Nutrición · ${NUTRITION.goal}</div>
      <table class="nutr-table">
        ${NUTRITION.macros.map(m => `<tr><td><div style="font-weight:600">${m.name}</div><div style="font-size:12px;color:var(--muted)">${m.note}</div></td><td><div>${m.amount}</div><div style="font-size:12px;color:var(--muted)">${m.kcal}</div></td></tr>`).join('')}
      </table>
    </div>
    <h3 style="margin-top:16px;margin-bottom:10px">Plan diario</h3>
    ${NUTRITION.meals.map(m => `
      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-name">${m.name}</div>
          <div class="meal-kcal">${m.kcal}</div>
        </div>
        <div class="meal-items">${m.items}</div>
      </div>
    `).join('')}
    <h3 style="margin-top:16px;margin-bottom:10px">Suplementos</h3>
    <div class="card">
      ${NUTRITION.supplements.map(s => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
          <div>
            <div style="font-weight:600;font-size:14px">${s.name} ${s.ok ? '<span style="color:var(--success);font-size:11px">✓ Ya tomás</span>' : ''}</div>
            <div style="font-size:12px;color:var(--muted)">${s.when}</div>
          </div>
          <div style="font-size:13px;color:var(--accent-l);font-weight:600">${s.dose}</div>
        </div>
      `).join('')}
    </div>
    <h3 style="margin-top:16px;margin-bottom:10px">Cambios clave en tu dieta</h3>
    <div class="card">
      ${NUTRITION.changes.map(c => `<div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:14px">✅ ${c}</div>`).join('')}
    </div>
  `;

  page.innerHTML = `
    <h2>Programa 6 meses</h2>
    ${phasesHTML}
    <h2 style="margin-top:8px">Nutrición</h2>
    ${nutriHTML}
  `;
}

function toggleRDay(id) {
  const body = document.getElementById(`rday-${id}`);
  const arr = document.getElementById(`arr-${id}`);
  if (body) {
    const open = body.classList.toggle('open');
    if (arr) arr.textContent = open ? '▲' : '▼';
  }
}

// ─── PESO & MEDIDAS ───────────────────────────
function renderWeight() {
  const page = document.getElementById('page-weight');

  const currentW = weights.length > 0 ? weights[weights.length - 1].weight : null;
  const startW = weights.length > 0 ? weights[0].weight : null;
  const gainW = currentW && startW ? (currentW - startW).toFixed(1) : '—';
  const weeks = getProgressWeeks();
  const avgGain = weeks > 0 && gainW !== '—' ? (gainW / weeks).toFixed(2) : '—';

  const chartData = weights.slice(-12).map(w => ({
    date: formatDate(w.date),
    weight: w.weight
  }));

  page.innerHTML = `
    <h2>Peso & Progreso</h2>

    <div class="card">
      <div class="card-title"><span class="dot"></span>Registrar peso</div>
      <div class="form-group">
        <label>Fecha</label>
        <input type="date" id="weight-date" value="${today()}">
      </div>
      <div class="form-group">
        <label>Peso (kg)</label>
        <input type="number" id="weight-input" placeholder="58.5" step="0.1" inputmode="decimal" ${currentW ? `value="${currentW}"` : ''}>
      </div>
      <button class="btn btn-primary" onclick="saveWeight()">Guardar peso</button>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-val">${currentW ? currentW + ' kg' : '—'}</div>
        <div class="stat-lbl">Peso actual</div>
      </div>
      <div class="stat">
        <div class="stat-val">${gainW}</div>
        <div class="stat-lbl">Ganancia total</div>
      </div>
      <div class="stat">
        <div class="stat-val">${avgGain}</div>
        <div class="stat-lbl">kg/semana</div>
      </div>
      <div class="stat">
        <div class="stat-val">${weights.length}</div>
        <div class="stat-lbl">Registros</div>
      </div>
    </div>

    ${chartData.length > 0 ? `
      <div class="chart-card">
        <div class="chart-title">Progresión de peso (últimas semanas)</div>
        <div class="chart-wrap"><canvas id="chart-weight"></canvas></div>
      </div>
    ` : ''}

    ${weights.length > 0 ? `
      <div class="card">
        <div class="card-title"><span class="dot"></span>Historial de peso</div>
        ${[...weights].reverse().map((w, i) => `
          <div style="padding:10px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:700;font-size:15px">${w.weight} kg</div>
              <div style="font-size:12px;color:var(--muted)">${formatDate(w.date)}</div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteWeight('${w.date}')">✕</button>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="card">
        <div style="text-align:center;padding:20px;color:var(--muted)">
          Comienza a registrar tu peso para ver el progreso
        </div>
      </div>
    `}
  `;

  if (chartData.length > 0) {
    setTimeout(() => renderWeightChart(), 50);
  }
}

function saveWeight() {
  const dateInput = document.getElementById('weight-date');
  const weightInput = document.getElementById('weight-input');
  const date = dateInput.value;
  const weight = parseFloat(weightInput.value);

  if (!weight || weight <= 0) {
    toast('Ingresá un peso válido', 'error');
    return;
  }

  // Remove existing entry for this date if exists
  weights = weights.filter(w => w.date !== date);
  // Add new entry
  weights.push({ date, weight });
  // Sort by date
  weights.sort((a, b) => a.date.localeCompare(b.date));

  saveData();
  toast('Peso guardado 💪');
  renderWeight();
}

function deleteWeight(date) {
  if (!confirm('¿Eliminar este registro?')) return;
  weights = weights.filter(w => w.date !== date);
  saveData();
  renderWeight();
  toast('Eliminado');
}

function renderWeightChart() {
  const data = weights.slice(-12);
  const labels = data.map(w => formatDate(w.date));
  const values = data.map(w => w.weight);

  const ctx = document.getElementById('chart-weight');
  if (!ctx) return;
  if (charts.weight) charts.weight.destroy();

  charts.weight = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: 'rgba(124,58,237,1)',
        backgroundColor: 'rgba(124,58,237,0.1)',
        pointBackgroundColor: 'rgba(124,58,237,1)',
        pointRadius: 5,
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#22223a', titleColor: '#e4e4f0', bodyColor: '#a78bfa', padding: 10, cornerRadius: 10 }
      },
      scales: {
        x: { ticks: { color: '#6666aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#6666aa', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// ─── EXPORT / IMPORT ──────────────────────────
function exportData() {
  if (!workouts.length) {
    toast('No hay datos para exportar', 'error');
    return;
  }
  const data = {
    version: 2,
    exportDate: new Date().toISOString(),
    totalWorkouts: workouts.length,
    workouts: workouts,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gym-backup-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(`Backup exportado (${workouts.length} entrenamientos)`);
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        let imported = [];

        if (data.version && data.workouts) {
          imported = data.workouts;
        } else if (Array.isArray(data)) {
          imported = data;
        } else {
          toast('Formato de archivo inválido', 'error');
          return;
        }

        if (!imported.length) {
          toast('El archivo no contiene entrenamientos', 'error');
          return;
        }

        // Merge: add only workouts with IDs that don't already exist
        const existingIds = new Set(workouts.map(w => w.id));
        let added = 0;
        imported.forEach(w => {
          if (!existingIds.has(w.id)) {
            workouts.push(w);
            added++;
          }
        });

        // Sort by date descending
        workouts.sort((a, b) => b.date.localeCompare(a.date));
        saveData();
        toast(`Importados ${added} entrenamientos nuevos (${imported.length - added} ya existían)`);
        renderDash();
      } catch (err) {
        toast('Error leyendo el archivo', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ─── INIT ─────────────────────────────────────
loadData();
renderDash();
