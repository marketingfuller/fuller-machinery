// ────────────────────────────────────────────────────────────
// KEYWORD RESEARCH — fuente única de keywords por TIPO de equipo.
//
// Investigado contra el SERP de Google Colombia (MercadoLibre CO, Homecenter,
// Falabella, Éxito y competidores Pallomaro, Industrias Talsa, Joserrago,
// Exhibir Equipos, Grupo Zingal, BBG) — junio 2026. Refleja CÓMO BUSCA LA GENTE,
// no cómo nombra el fabricante. Sin volúmenes inventados: prioridad por dominancia
// observada en títulos del SERP, autocompletar y categorías de retailers.
//
// Por tipo:
//   primary  → término cabeza a ganar (el más buscado/transaccional)
//   keywords → 8-14 variantes de intención (cabeza, +industrial, +capacidad,
//              +precio, +ciudad, sinónimos y subtipos)
//   synonyms → nombres alternativos/regionalismos para tejer en el cuerpo del copy
//   h1Seo    → H2 keyword-rich (front-load del primary) que también vende beneficio
//
// Lo consumen scripts/compose-vertical.mjs y scripts/compose-bebidas-seed.mjs.
// Los productos insignia (STAR_COPY / O) pueden sobreescribir con keywords bespoke.
// ────────────────────────────────────────────────────────────

export const KW_RESEARCH = {
  // ── BEBIDAS frías ──
  granizadora: {
    primary: "granizadora industrial",
    keywords: ["granizadora industrial", "máquina granizadora", "granizadora 2 tanques", "granizadora 3 tanques 12 litros", "máquina para granizados", "máquina de raspados", "máquina para raspados y cholados", "granizadora precio", "granizadora industrial bogotá", "granizadora comercial", "máquina de granizados precio colombia"],
    synonyms: ["máquina de granizados", "máquina de raspados", "máquina para cholados", "máquina frozen", "dispensadora de granizados"],
    h1Seo: "Granizadora industrial para vender raspados y cholados todo el día",
  },
  licuadora: {
    primary: "licuadora industrial",
    keywords: ["licuadora industrial", "licuadora industrial 4 litros", "licuadora industrial 2 litros", "licuadora semi industrial", "licuadora comercial", "licuadora industrial acero inoxidable", "licuadora para restaurante", "licuadora industrial precio", "licuadora industrial bogotá", "licuadora industrial alto rendimiento", "licuadora industrial 2.9 hp"],
    synonyms: ["licuadora comercial", "licuadora semi industrial", "licuadora profesional", "licuadora de alto rendimiento", "licuadora para jugos"],
    h1Seo: "Licuadora industrial de alto rendimiento para procesar a toda hora sin recalentarse",
  },
  exprimidor: {
    primary: "exprimidor de naranjas industrial",
    keywords: ["exprimidor de naranjas industrial", "exprimidor de naranjas", "exprimidor de naranjas eléctrico", "exprimidor de naranjas industrial precio", "exprimidor de naranjas industrial bogotá", "exprimidor de cítricos comercial", "exprimidor de naranjas semiautomático", "exprimidor de naranjas profesional", "máquina de jugo de naranja", "exprimidor naranjas eléctrico industrial", "exprimidor de naranjas acero inoxidable"],
    synonyms: ["exprimidor de cítricos", "exprimidor de jugo de naranja", "máquina de jugo de naranja", "exprimidor semiautomático"],
    h1Seo: "Exprimidor de naranjas industrial: jugo natural exprimido en segundos, sin pausas",
  },
  extractor: {
    primary: "extractor de jugos industrial",
    keywords: ["extractor de jugos industrial", "extractor de jugos", "extractor de jugos comercial", "extractor de jugos frutas y verduras", "extractor de zumos", "extractor de jugos industrial precio", "extractor de jugos profesional", "extractor de jugos para restaurante", "extractor de jugos acero inoxidable", "extractor de jugos 550w", "extractor de jugos industrial bogotá"],
    synonyms: ["extractor de zumos", "extractor de jugos y zumos", "extractor de frutas y vegetales", "centrífuga de jugos", "juguera industrial"],
    h1Seo: "Extractor de jugos industrial para frutas y verduras: zumo concentrado de turno completo",
  },
  malteadora: {
    primary: "malteadora industrial",
    keywords: ["malteadora industrial", "malteadora", "malteadora 2 puestos", "malteadora 1 puesto", "malteadora doble", "malteadora comercial", "malteadora profesional", "malteadora industrial precio", "máquina para malteadas", "malteadora para frappé", "malteadora industrial bogotá"],
    synonyms: ["máquina para malteadas", "mezcladora de malteadas", "batidora de malteadas", "mezclador para frappés"],
    h1Seo: "Malteadora industrial de 2 puestos para malteadas y frappés sin tiempos de espera",
  },

  // ── CAFÉ y HIELO ──
  espresso: {
    primary: "capuchinera",
    keywords: ["capuchinera", "capuchinera industrial", "capuchinera profesional", "máquina de café espresso", "máquina de café 2 grupos", "capuchinera 1 grupo", "cafetera espresso profesional", "máquina espresso para cafetería", "capuchinera precio colombia", "capuchinera bogotá", "capuchinera semiautomática", "máquina de café para negocio"],
    synonyms: ["máquina de café espresso", "cafetera espresso", "máquina de café profesional", "cafetera de grupos", "máquina espresso", "cafetera express"],
    h1Seo: "Capuchinera industrial: máquina de café espresso profesional para tu cafetería",
  },
  percoladora: {
    primary: "cafetera percoladora",
    keywords: ["cafetera percoladora", "percoladora de café", "cafetera percoladora industrial", "percolador de café 100 tazas", "cafetera industrial 100 tazas", "percoladora de café 100 tazas", "percoladora de café precio", "cafetera percoladora colombia", "percoladora para eventos", "cafetera 100 tazas bogotá", "percoladora de café 16 litros"],
    synonyms: ["percoladora", "percolador de café", "cafetera industrial de 100 tazas", "cafetera para café tinto"],
    h1Seo: "Cafetera percoladora de 100 tazas: café tinto por volumen para eventos y catering",
  },
  goteo: {
    primary: "cafetera de goteo industrial",
    keywords: ["cafetera de goteo industrial", "cafetera de goteo", "cafetera por goteo comercial", "cafetera goteo 2 jarras", "cafetera de goteo acero inoxidable", "cafetera goteo industrial precio", "cafetera de goteo dos jarras", "cafetera goteo continua", "cafetera de goteo para negocio", "cafetera goteo colombia"],
    synonyms: ["cafetera por goteo", "cafetera de goteo dos jarras", "cafetera de dos servicios", "cafetera de filtro", "cafetera para café americano"],
    h1Seo: "Cafetera de goteo industrial de 2 jarras: café americano continuo para tu negocio",
  },
  "cafe-automatica": {
    primary: "máquina de café automática",
    keywords: ["máquina de café automática", "máquina de café para oficina", "máquina de café vending", "dispensador de café automático", "máquina de café automática precio", "máquina de café superautomática", "máquina vending café colombia", "máquina de café a un botón", "máquina de café automática empresas", "dispensador de bebidas calientes"],
    synonyms: ["máquina de café superautomática", "dispensador de café", "máquina vending de café", "máquina de café a un botón", "máquina de café para oficina"],
    h1Seo: "Máquina de café automática para oficina: café a un botón con varias bebidas",
  },
  molino: {
    primary: "molino de café",
    keywords: ["molino de café", "molino de café industrial", "molino de café dosificador", "molino para grano de café", "molino de café profesional", "molino de café para cafetería", "molino de café automático", "molino de café precio colombia", "molino dosificador de café", "molino de café 1kg", "molino de café para espresso"],
    synonyms: ["molino dosificador", "molino para grano de café", "molino de café automático", "molino para espresso"],
    h1Seo: "Molino de café industrial con dosificador: molienda precisa de grano para espresso",
  },
  trituradora: {
    primary: "trituradora de hielo",
    keywords: ["trituradora de hielo", "triturador de hielo industrial", "trituradora de hielo industrial", "máquina para triturar hielo", "trituradora de hielo comercial", "trituradora de hielo con bodega", "trituradora de hielo precio", "picadora de hielo industrial", "trituradora de hielo colombia", "triturador de hielo grande", "máquina trituradora de hielo"],
    synonyms: ["triturador de hielo", "picadora de hielo", "máquina para triturar hielo"],
    h1Seo: "Trituradora de hielo industrial con bodega: hielo picado al instante para tu negocio",
  },
  fabricadora: {
    primary: "máquina de hielo",
    keywords: ["máquina de hielo", "fabricadora de hielo", "máquina de hielo industrial", "máquina para hacer hielo", "fabricadora de hielo en cubo", "máquina de hielo en cubos", "máquina de hielo 90kg", "fabricadora de hielo precio", "máquina de hielo colombia", "productora de hielo industrial", "máquina para hacer hielo industrial", "máquina de hielo para negocio"],
    synonyms: ["fabricadora de hielo", "máquina para hacer hielo", "productora de hielo", "fábrica de hielo"],
    h1Seo: "Máquina de hielo industrial en cubo: fabrica hasta 90 kg al día para tu negocio",
  },

  // ── SELLADO / DISPENSADO de bebidas ──
  "selladora-vasos": {
    primary: "selladora de vasos",
    keywords: ["selladora de vasos", "selladora de vasos automatica", "selladora de vasos manual", "maquina selladora de vasos", "selladora de vasos precio", "selladora de vasos colombia", "selladora de vasos bogota", "termoselladora de vasos", "selladora para bubble tea", "selladora de vasos para jugos", "selladora de vasos industrial", "selladora de vasos plasticos"],
    synonyms: ["termoselladora de vasos", "máquina para sellar vasos", "selladora de vasos plásticos", "selladora para bubble tea", "selladora para vasos de jugos"],
    h1Seo: "Selladora de vasos automática: sella tu bubble tea, jugos y granizados para llevar en segundos",
  },
  "selladora-latas": {
    primary: "selladora de latas",
    keywords: ["selladora de latas", "selladora de latas plasticas", "maquina selladora de latas", "selladora de latas precio", "selladora de latas colombia", "selladora de latas automatica", "selladora de latas para bebidas", "selladora de latas de cerveza", "selladora de latas industrial", "selladora de latas comercial", "selladora latas pet", "selladora de latas bogota"],
    synonyms: ["selladora de latas plásticas", "selladora de latas PET", "máquina para sellar latas", "cerradora de latas", "selladora para bebidas artesanales"],
    h1Seo: "Selladora de latas plásticas comercial: sella tus bebidas artesanales y cerveza con acabado profesional",
  },
  dispensador: {
    primary: "dispensador de bebidas frias",
    keywords: ["dispensador de bebidas frias", "dispensador de jugos", "dispensador de bebidas 3 tanques", "dispensador de jugos industrial", "dispensador de bebidas precio", "dispensador de bebidas frias colombia", "dispensador de jugos electrico", "dispensador de bebidas 2 tanques", "dispensador de jugos y bebidas frias", "surtidor de jugos", "dispensador de jugos bogota", "maquina dispensadora de jugos"],
    synonyms: ["dispensador de jugos", "dispensadora de bebidas", "surtidor de jugos", "máquina dispensadora de bebidas frías", "dispensador refrigerado de jugos"],
    h1Seo: "Dispensador de bebidas frías de 3 tanques: exhibe y vende jugos refrigerados todo el día",
  },
  gasificadora: {
    primary: "máquina gasificadora de agua",
    keywords: ["maquina gasificadora de agua", "gasificadora de liquidos", "maquina para hacer agua con gas", "maquina carbonatadora de bebidas", "carbonatador de bebidas", "gasificadora de agua precio", "maquina gasificadora colombia", "maquina para hacer bebidas con gas", "gasificadora de agua bogota", "maquina de agua con gas y gaseosa", "carbonatadora gasificadora"],
    synonyms: ["gasificadora de líquidos", "máquina para hacer agua con gas", "carbonatadora de bebidas", "máquina de agua con gas y gaseosa", "máquina para hacer soda"],
    h1Seo: "Gasificadora de líquidos: produce agua con gas y bebidas carbonatadas al instante",
  },

  // ── SNACKS dulce / fritura ──
  freidora: {
    primary: "freidora industrial",
    keywords: ["freidora industrial", "freidora a gas", "freidora industrial a gas", "freidora industrial 2 tanques", "freidora de papas", "freidor industrial", "freidora eléctrica doble tanque", "freidora industrial precio", "freidora industrial colombia", "freidora a gas de piso", "freidora industrial bogotá", "freidora industrial 30 litros"],
    synonyms: ["freidor", "fritador", "freidora de piso", "freidora de papas y buñuelos", "freidora de dos puestos"],
    h1Seo: "Freidora industrial a gas y eléctrica: más capacidad, más ventas por turno",
  },
  crispetera: {
    primary: "crispetera",
    keywords: ["crispetera", "máquina de crispetas", "crispetera con carro", "crispetera industrial", "crispetera oil free", "crispetera sin aceite", "máquina de palomitas", "crispetera precio", "crispetera 8 onzas", "crispetera colombia", "carro crispetero", "crispetera para negocio"],
    synonyms: ["máquina de crispetas", "máquina de palomitas de maíz", "carro crispetero", "máquina de maíz pira"],
    h1Seo: "Crispetera con carro y oil free: monta tu negocio de crispetas con margen alto",
  },
  algodonera: {
    primary: "máquina de algodón de azúcar",
    keywords: ["máquina de algodón de azúcar", "algodonera", "máquina de algodón de azúcar industrial", "algodonera con carro", "máquina de algodón de azúcar precio", "máquina de algodón de azúcar bogotá", "algodonera comercial", "máquina algodón azúcar colombia", "algodonera para negocio", "máquina de algodones", "algodonera manual", "máquina de algodón de azúcar para eventos"],
    synonyms: ["algodonera", "máquina de algodones", "algodonera con carro"],
    h1Seo: "Máquina de algodón de azúcar con carro: conos para eventos y negocio de alto margen",
  },
  chocolate: {
    primary: "fuente de chocolate",
    keywords: ["fuente de chocolate", "fuente de chocolate precio", "fuente de chocolate comercial", "fuente de chocolate 5 niveles", "fundidora de chocolate", "fundidor de chocolate eléctrico", "fuente de chocolate colombia", "fuente de chocolate para eventos", "fundidora de chocolate 1 tanque", "fuente de chocolate bogotá", "fuente de chocolate industrial", "máquina derretidora de chocolate"],
    synonyms: ["cascada de chocolate", "fundidora de chocolate", "fundidor de chocolate", "derretidora de chocolate", "temperadora de chocolate"],
    h1Seo: "Fuentes y fundidoras de chocolate: atrae clientes con postres que se venden solos",
  },
  wafflera: {
    primary: "wafflera industrial",
    keywords: ["wafflera industrial", "waflera industrial", "máquina de waffles industrial", "wafflera", "wafflera comercial", "wafflera precio", "wafflera burbuja", "wafflera 2 puestos", "máquina de waffles colombia", "wafflera tradicional", "máquina para hacer waffles", "wafflera para negocio"],
    synonyms: ["waflera", "máquina de waffles", "máquina para hacer waffles", "waflera de burbuja"],
    h1Seo: "Wafleras industriales tradicional, burbuja y 2 puestos: waffles listos para vender",
  },
  novelty: {
    primary: "wafflera erótica",
    keywords: ["wafflera erótica", "waflera erótica forma pene", "wafflera comercial molde pene", "wafflera erótica para negocio", "waflera divertida formas", "wafflera novelty", "wafflera erótica precio", "máquina de waffles formas", "wafflera para despedida de soltera", "wafflera temática para adultos"],
    synonyms: ["waflera erótica", "waflera de formas", "waflera divertida", "waflera temática para adultos", "waflera novelty"],
    h1Seo: "Wafleras eróticas para negocios temáticos: el producto que se vuelve viral y vende solo",
  },

  // ── SNACKS varios ──
  "asador-salchichas": {
    primary: "asador de salchichas",
    keywords: ["asador de salchichas", "asador de salchichas rodillos", "asador de salchichas 11 rodillos", "asador de salchichas precio", "asador de salchichas colombia", "máquina de perros calientes", "rodillo para salchichas", "salchichera comercial", "asador de salchichas giratorio", "vaporizador de salchichas y panes", "asador de salchichas bogotá"],
    synonyms: ["salchichera", "rodillo para salchichas", "asador de rodillos", "máquina de perros calientes", "máquina de hot dogs"],
    h1Seo: "Asador de salchichas de rodillos: vende más perros calientes con rotación constante",
  },
  sandwichera: {
    primary: "sanduchera industrial",
    keywords: ["sanduchera industrial", "sanduchera comercial", "sanduchera industrial precio", "sanduchera eléctrica industrial", "sanduchera 2 puestos", "máquina sanduchera", "sanduchera tipo panini", "sanduchera industrial colombia", "sanduchera industrial bogotá", "plancha para paninis", "sanduchera doble comercial", "sanduchera ranurada"],
    synonyms: ["sanduchera", "máquina de sándwiches", "plancha panini", "sanduchera tipo panini ranurada"],
    h1Seo: "Sanduchera industrial comercial: tuesta paninis y sándwiches en serie sin esperas",
  },
  plancha: {
    primary: "plancha asadora industrial",
    keywords: ["plancha asadora industrial", "plancha eléctrica industrial", "parrilla eléctrica industrial", "plancha asador industrial", "plancha asadora precio", "asador eléctrico industrial", "plancha de asar comercial", "plancha asadora a gas", "parrilla asador industrial", "plancha asadora colombia", "plancha eléctrica restaurante", "plancha asadora bogotá"],
    synonyms: ["plancha asadora", "parrilla eléctrica", "asador eléctrico", "plancha de asar", "plancha asador a gas"],
    h1Seo: "Plancha asadora industrial eléctrica: superficie pareja para asar todo el día sin parar",
  },
  helado: {
    primary: "máquina de helado suave",
    keywords: ["máquina de helado suave", "máquina de helado suave comercial", "máquina de helado suave precio", "máquina de helado suave industrial", "máquina de helado suave 1 boquilla", "máquina de helado soft", "máquina para helado suave colombia", "máquina de conos", "máquina de helado suave bogotá", "máquina de helado soft de mesa", "máquina para galleta de conos"],
    synonyms: ["máquina de helado soft", "máquina para helado suave", "máquina de conos", "helado soft de mesa", "máquina de galleta de conos"],
    h1Seo: "Máquina de helado suave comercial: conos cremosos al instante para tu heladería",
  },
  hamburguesa: {
    primary: "formadora de hamburguesas",
    keywords: ["formadora de hamburguesas", "formadora de hamburguesas manual", "formadora de hamburguesas precio", "prensa de hamburguesas", "formador de hamburguesas", "moldeadora de hamburguesas", "formadora de hamburguesas colombia", "molde para hamburguesas", "formadora de hamburguesas industrial", "formadora de hamburguesas 15cm", "prensa para carne de hamburguesa", "formadora de hamburguesas bogotá"],
    synonyms: ["formador de hamburguesas", "prensa de hamburguesas", "moldeadora de carne", "molde para hamburguesas", "máquina formadora de carne"],
    h1Seo: "Formadora de hamburguesas: carnes del mismo tamaño y peso, porción tras porción",
  },
  calientes: {
    primary: "calentador de papas a la francesa",
    keywords: ["calentador de papas a la francesa", "calentador de papas fritas", "calentador de papa francesa", "estación de papas fritas", "calentador para fritos", "calentador de papas fritas comercial", "calentador de papas a la francesa precio", "estación de papas fritas colombia", "lámpara calentadora de papas", "calentador de fritos infrarrojo", "calentador de papas bogotá"],
    synonyms: ["calentador de papas fritas", "calentador para fritos", "estación de papas fritas", "estación de descarga", "lámpara calentadora de fritos"],
    h1Seo: "Calentador de papas a la francesa: mantén tus fritos crujientes y listos para servir",
  },
  deshidratador: {
    primary: "deshidratador de alimentos industrial",
    keywords: ["deshidratador de alimentos industrial", "deshidratador de alimentos", "deshidratador de frutas industrial", "deshidratador industrial 20 bandejas", "deshidratador de alimentos precio", "deshidratador de alimentos 12 bandejas", "horno deshidratador industrial", "deshidratador de alimentos colombia", "deshidratador de frutas precio", "deshidratador de alimentos acero inoxidable", "deshidratador industrial bogotá"],
    synonyms: ["deshidratadora de alimentos", "horno deshidratador", "deshidratador de frutas", "deshidratador industrial de bandejas"],
    h1Seo: "Deshidratador de alimentos industrial: convierte frutas y snacks en producto de alto margen",
  },
  "egg-roller": {
    primary: "egg roller",
    keywords: ["egg roller", "máquina egg roller", "egg roller máquina", "máquina para banderillas", "máquina para hacer huevos egg roller", "egg roller precio", "egg roller colombia", "máquina de huevos en rollo", "egg roller comercial", "máquina egg roller 110v", "egg roller antiadherente"],
    synonyms: ["máquina para banderillas", "máquina para hacer huevos rápido", "máquina de huevos en rollo", "egg roll maker"],
    h1Seo: "Máquina egg roller: snack en palito listo en minutos para vender en la calle",
  },
  vending: {
    primary: "máquina expendedora",
    keywords: ["máquina expendedora", "máquina dispensadora de snacks", "máquina expendedora de snacks", "vending machine colombia", "máquina expendedora precio", "máquina dispensadora de snacks y bebidas", "máquina vending snacks", "máquina expendedora colombia", "máquina dispensadora seaga", "máquina expendedora bogotá", "máquina expendedora de snacks y café"],
    synonyms: ["máquina dispensadora de snacks", "vending machine", "máquina dispensadora de bebidas", "expendedora automática", "máquina de snacks y bebidas"],
    h1Seo: "Máquina expendedora de snacks: punto de venta 24/7 que trabaja solo, sin empleados",
  },

  // ── PANADERÍA ──
  horno: {
    primary: "horno para panadería",
    keywords: ["horno para panadería", "horno industrial para panadería", "horno de panadería a gas", "horno de panadería eléctrico", "horno de convección", "horno de convección 4 bandejas", "horno de pizza", "horno de pizza eléctrico doble cámara", "horno panadería 3 cámaras 6 latas", "horno industrial precio colombia", "horno para panadería precio bogotá", "horno comercial acero inoxidable"],
    synonyms: ["horno de latas", "horno de piso", "horno pizzero", "horno para hornear pan", "horno a gas", "horno de cámaras"],
    h1Seo: "Hornos industriales para panadería: gas, eléctricos, de convección y pizza — hornea más en cada tanda",
  },
  amasadora: {
    primary: "amasadora industrial",
    keywords: ["amasadora industrial", "amasadora para panadería", "amasadora de pan industrial", "amasadora 50 libras", "amasadora mojadora 50 libras", "amasadora 20 libras", "amasadora industrial 3 hp", "amasadora industrial 110v", "amasadora de pan precio colombia", "amasadora para panadería bogotá", "amasadora acero inoxidable", "amasadora 20 kg"],
    synonyms: ["mojadora", "amasadora mojadora", "mezcladora de masa", "amasadora de masa", "máquina de amasar pan"],
    h1Seo: "Amasadoras industriales para panadería: 20 y 50 libras que amasan más pan en menos tiempo",
  },
  batidora: {
    primary: "batidora industrial",
    keywords: ["batidora industrial", "batidora industrial para repostería", "batidora de pedestal", "batidora planetaria", "batidora industrial 7 litros", "batidora industrial 30 litros", "batidora para pastelería", "batidora para panadería", "batidora de mesa", "batidora industrial precio colombia", "batidora industrial acero inoxidable", "batidora profesional 12 velocidades"],
    synonyms: ["batidora de pie", "batidora de mesa", "batidora planetaria", "batidora amasadora", "batidora semi industrial"],
    h1Seo: "Batidoras industriales y planetarias: de mesa 7L a pedestal 30L para repostería sin límites",
  },
  escabiladero: {
    primary: "escabiladero",
    keywords: ["escabiladero", "escabiladero para panadería", "carro escabiladero", "carro para latas", "carro para bandejas", "escabiladero 15 bandejas", "escabiladero desarmable", "escabiladero acero inoxidable", "escabiladero 40x60", "escabiladero precio colombia", "estante para bandejas de panadería", "carro panadero"],
    synonyms: ["carro escabiladero", "carro panadero", "carro para latas", "carro para bandejas", "estante para bandejas", "carro porta-bandejas"],
    h1Seo: "Escabiladeros para panadería desarmables: organiza hasta 15 bandejas 40x60 en un solo carro",
  },

  // ── EMPAQUE y PESAJE ──
  empacadora: {
    primary: "empacadora al vacío",
    keywords: ["empacadora al vacío", "empacadora al vacío industrial", "empacadora al vacío precio", "empacadora al vacío dz300", "empacadora al vacío doble campana", "selladora al vacío", "máquina selladora al vacío", "empacadora al vacío bogotá", "empacadora al vacío para alimentos", "máquina de empaque al vacío comercial", "empacadora al vacío carnes", "empacadora al vacío de campana"],
    synonyms: ["selladora al vacío", "máquina de empaque al vacío", "selladora de bolsas al vacío", "máquina de vacío", "empacadora de campana"],
    h1Seo: "Empacadora al vacío industrial: conserva tus alimentos mucho más tiempo y reduce mermas",
  },
  "selladora-bolsas": {
    primary: "selladora de bolsas",
    keywords: ["selladora de bolsas", "selladora de bolsas precio", "selladora de bolsas de pedal", "selladora de bolsas plásticas", "selladora de banda continua", "selladora de bolsas industrial", "selladora de bolsas 30cm", "selladora de pedal 45cm", "selladora banda continua con impresión", "selladora de bolsas bogotá", "máquina selladora de bolsas", "selladora de bolsas manual"],
    synonyms: ["selladora de pedal", "selladora de banda continua", "selladora plástica", "máquina selladora de bolsas", "termoselladora de bolsas"],
    h1Seo: "Selladora de bolsas profesional: sellado hermético y limpio para empacar más rápido",
  },
  "consumible-empaque": {
    primary: "rollos para empacadora al vacío",
    keywords: ["rollos para empacadora al vacío", "rollos para selladora al vacío", "rollo empacadora al vacío 25cm", "rollos para selladora de vasos", "rollo film para selladora de vasos", "film para empaque", "rollos repuesto empacadora al vacío", "rollos para selladora de vasos precio", "sello para vasos", "bolsas para empacadora al vacío", "rollos para empacar al vacío colombia"],
    synonyms: ["rollos al vacío", "film de empaque", "rollos gofrados", "repuestos empacadora al vacío", "film para sellar vasos"],
    h1Seo: "Rollos y film para empacadora al vacío: insumos grado alimenticio que rinden más por sello",
  },
  dosificadora: {
    primary: "dosificadora de líquidos",
    keywords: ["dosificadora de líquidos", "llenadora y dosificadora de líquidos", "dosificadora de pistón", "dosificadora de líquidos precio", "llenadora dosificadora industrial", "dosificadora de líquidos manual", "envasadora de líquidos", "dosificador automático de líquidos", "máquina dosificadora de líquidos colombia", "dosificadora de alta viscosidad", "llenadora de líquidos semi industrial", "dosificadora de granulados"],
    synonyms: ["llenadora", "envasadora", "dosificador de pistón", "máquina de llenado", "llenadora de botellas"],
    h1Seo: "Dosificadora de líquidos de pistón: llena botellas con precisión y cero desperdicio",
  },
  bascula: {
    primary: "báscula digital",
    keywords: ["báscula digital", "báscula digital precio", "balanza digital comercial", "báscula electrónica con impresión", "gramera digital", "báscula digital 30kg", "báscula electrónica 50kg", "balanza gramera", "báscula de piso 300kg", "báscula ganadera electrónica", "báscula digital para negocio", "balanza comercial bogotá"],
    synonyms: ["balanza digital", "báscula electrónica", "gramera", "pesa digital", "balanza comercial", "báscula de plataforma", "báscula de piso"],
    h1Seo: "Básculas digitales calibradas: pesa con precisión y cobra sin perder un solo gramo",
  },
  tallimetro: {
    primary: "tallímetro",
    keywords: ["tallímetro", "tallímetro precio", "infantómetro tallímetro", "tallímetro para bebés", "tallímetro infantil", "tallímetro adultos", "tallímetro pediátrico", "medidor de talla", "tallímetro digital", "infantómetro para bebés colombia", "tallímetro portátil", "tallímetro niños"],
    synonyms: ["infantómetro", "medidor de talla", "estadiómetro", "metro de talla", "cinta de medición de talla"],
    h1Seo: "Tallímetro e infantómetro de precisión: mide la talla de bebés y adultos con exactitud",
  },

  // ── EXHIBICIÓN / FRÍO / BUFFET / CÁRNICOS / PROCESAMIENTO / MOBILIARIO ──
  "vitrina-caliente": {
    primary: "vitrina caliente",
    keywords: ["vitrina caliente", "vitrina exhibidora caliente", "vitrina para comida caliente", "vitrina exhibidora de alimentos calientes", "vitrina térmica para alimentos", "vitrina calefactora", "vitrina caliente industrial", "vitrina caliente para panadería", "vitrina exhibidora caliente precio", "vitrina caliente colombia", "vitrina para empanadas y pollo", "vitrina caliente bogotá"],
    synonyms: ["vitrina exhibidora caliente", "vitrina de calefacción", "vitrina térmica", "vitrina calentadora", "vitrina para comida caliente"],
    h1Seo: "Vitrina caliente exhibidora: mantén pollo, empanadas y pizza listos para vender todo el día",
  },
  refrigeracion: {
    primary: "congelador industrial",
    keywords: ["congelador industrial", "congelador horizontal", "congelador horizontal industrial", "congelador tipo isla", "congelador vertical industrial", "nevera comercial", "vitrina refrigerada", "vitrina refrigerada multideck", "enfriador de bebidas botellero", "congelador botellero", "refrigerador comercial", "congelador industrial precio", "nevera industrial bogotá", "vitrina refrigerada precio"],
    synonyms: ["congelador horizontal", "nevera industrial", "nevera comercial", "vitrina refrigerada", "vitrina exhibidora refrigerada", "enfriador de bebidas", "botellero", "refrigerador comercial", "congelador tipo isla"],
    h1Seo: "Congeladores y vitrinas refrigeradas comerciales: conserva carne, helados y bebidas sin perder producto",
  },
  buffet: {
    primary: "baño maría",
    keywords: ["baño maría", "baño maría eléctrico", "baño maría para buffet", "calentador de alimentos buffet", "samovar para buffet", "samovar calentador eléctrico", "chafing dish acero inoxidable", "baño maría 5 azafates", "baño maría precio", "samovar precio colombia", "baño maría industrial", "bandeja antideslizante para buffet"],
    synonyms: ["baño de maría", "samovar", "chafing dish", "calentador de alimentos", "calentador buffet", "azafate"],
    h1Seo: "Baño maría y samovares para buffet: sirve la comida caliente y presentable en eventos y línea de servicio",
  },
  carnicos: {
    primary: "molino de carne",
    keywords: ["molino de carne", "molino de carne industrial", "moledora de carne", "molino de carne #32", "molino y embutidora de chorizos", "embutidora de chorizos", "embutidora de carne", "sierra para huesos", "sierra corta hueso", "asador vertical shawarma", "trompo de carne para shawarma", "molino de carne precio colombia", "embutidora de chorizos precio", "clipadora de embutidos"],
    synonyms: ["moledora de carne", "moledor de carne", "embutidora", "embutidora de chorizos", "llenadora de embutidos", "sierra para huesos", "sierra corta hueso", "asador de shawarma", "trompo de carne", "clipadora"],
    h1Seo: "Molinos, embutidoras y sierras para carnicería: procesa carne, chorizo y cortes con rendimiento de negocio",
  },
  procesamiento: {
    primary: "peladora de papas industrial",
    keywords: ["peladora de papas industrial", "pelador de papas industrial", "peladora de papas precio", "tajadora de pan industrial", "cortadora rebanadora de pan", "procesador de alimentos industrial", "cortadora de vegetales industrial", "laminadora de masa", "laminadora de masa para pizza", "sobadora laminadora panadería", "máquina para pasta", "vinipeladora", "procesador de alimentos precio colombia", "laminadora de masa precio"],
    synonyms: ["peladora de papas", "pelador de papas", "tajadora de pan", "rebanadora de pan", "cortadora de pan", "procesador de alimentos", "cortadora de vegetales", "laminadora de masa", "sobadora", "máquina para pasta", "vinipeladora"],
    h1Seo: "Peladoras, tajadoras y laminadoras industriales: procesa papa, pan y masa en minutos y ahorra mano de obra",
  },
  // ── One-offs (términos cabeza obvios del mercado CO; patrón validado, no
  //     búsqueda individual por volumen). Cierran el hueco de "generico". ──
  donas: {
    primary: "máquina para hacer donas",
    keywords: ["máquina para hacer donas", "máquina de donas industrial", "máquina para donas", "freidora de donas", "máquina para hacer donas precio", "máquina de donas colombia", "dosificadora de donas", "máquina para donas comercial"],
    synonyms: ["máquina de donas", "freidora de donas", "dosificadora de donas"],
    h1Seo: "Máquina para hacer donas industrial: producción continua de donas listas para vender",
  },
  tostadora: {
    primary: "tostadora industrial",
    keywords: ["tostadora industrial", "tostadora comercial", "tostadora de pan industrial", "tostadora 6 rebanadas", "tostadora 4 rebanadas", "tostadora industrial precio", "tostadora para restaurante", "tostadora industrial colombia", "tostadora de pan comercial"],
    synonyms: ["tostadora de pan", "tostador industrial", "tostadora comercial"],
    h1Seo: "Tostadora industrial de varias rebanadas: pan tostado parejo para desayunos de alto flujo",
  },
  "dispensador-seco": {
    primary: "dispensador de cereal",
    keywords: ["dispensador de cereal", "dispensador de cereales", "dispensador de granel", "dispensador de cereal acrílico", "dispensador de cereal precio", "dispensador de granos", "dispensador de cereal para hotel", "dispensador de cereal colombia", "dispensador de productos a granel"],
    synonyms: ["dispensador de cereales", "dispensador de granel", "dispensador de granos", "surtidor de cereal"],
    h1Seo: "Dispensador de cereal y granel: autoservicio higiénico para hoteles, desayunos y tiendas",
  },
  mobiliario: {
    primary: "mesa de trabajo en acero inoxidable",
    keywords: ["mesa de trabajo en acero inoxidable", "mesón en acero inoxidable", "mesa de trabajo industrial acero", "mesa en acero con lavaplatos", "fregadero industrial acero inoxidable", "lavaplatos industrial acero 304", "mesón con poceta", "poceta industrial acero inoxidable", "mesa de trabajo acero 304", "mesón en acero inoxidable precio", "mesa de trabajo cocina industrial bogotá", "lavaplatos en acero inoxidable cocina industrial"],
    synonyms: ["mesón en acero", "mesón en acero inoxidable", "mesa de acero", "fregadero industrial", "lavaplatos industrial", "poceta", "lavaplatos con poceta"],
    h1Seo: "Mesas de trabajo y lavaplatos en acero inoxidable 304: monta una cocina industrial a prueba de uso pesado",
  },
};

/** Atajo: keywords de un tipo (o null si no hay investigación para ese tipo). */
export function kwFor(type) {
  return KW_RESEARCH[type] || null;
}

/**
 * Fusiona keywords bespoke (insignia, más específicas) con las investigadas del
 * tipo, sin duplicar (case-insensitive). Las bespoke van primero. Cap 16.
 * Así CADA producto carga la intención investigada + sus términos a mano.
 * Devuelve [] si no hay ni bespoke ni investigación (el caller decide fallback).
 */
export function mergeKeywords(bespoke, type) {
  const research = (KW_RESEARCH[type] && KW_RESEARCH[type].keywords) || [];
  const seen = new Set();
  const out = [];
  for (const k of [...(bespoke || []), ...research]) {
    if (!k) continue;
    const key = k.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(k);
    }
  }
  return out.slice(0, 16);
}
