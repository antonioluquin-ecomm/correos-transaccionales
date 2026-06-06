# Metodología de Trabajo Asistido por IA

## Documento Institucional Base

| Campo                | Detalle                                                         |
| -------------------- | --------------------------------------------------------------- |
| Nombre del documento | Metodología de Trabajo Asistido por IA                          |
| Version              | v2.1                                                            |
| Estado               | Activo                                                          |
| Objetivo             | Guia institucional reutilizable para proyectos asistidos por IA |

## Índice

- 1. Objetivo del documento.
- 2. Principios generales de trabajo.
- 3. Metodologia de trabajo con IA.
- 4. Flujo recomendado de trabajo con IA.
- 5. Manejo de contexto y documentacion institucional.
- 6. Optimizacion de consumo de tokens.
- 6.1 Configuracion recomendada de IA por etapa.
- 6.2 Eleccion de modelo en Codex y Claude Code.
- 7. Rol del equipo humano.
- 8. Estructura recomendada de proyectos.
- 9. Estado del proyecto y nivel de madurez.
- 10. Principio de simplicidad.
- 11. Flujo recomendado de trabajo.
- 12. Tipos de cambios.
- 13. Riesgo segun tipo de cambio.
- 14. Anti patrones comunes.
- 15. Validaciones recomendadas.
- 16. Flujo recomendado de release.
- 17. Documentacion tecnica vs operativa.
- 18. Documentacion viva.
- 19. Documentacion minima recomendada.
- 20. Uso de bases de datos ligeras.
- 21. Criterios para cerrar tareas.
- 22. Criterios para hacer deploy.
- 23. Manejo de errores y casos nuevos.
- 24. Cuando no usar IA o cuando limitar su uso.
- 25. Buenas practicas de prompts.
- 26. Checklist base del proyecto.
- 27. Convenciones recomendadas.
- 28. Regla operativa para comandos Git.
- 29. Metodologia visual y consistencia UI.
- 30. Freeze zones y zonas criticas.
- 31. Auditoria vs implementacion como metodologia formal.
- 32. Smoke visual y QA manual.
- 33. Niveles de madurez visual.
- 34. Auditoria documental y limpieza controlada.
- 35. Preparacion inicial de un proyecto nuevo.
- 36. Organizacion de etapas, cierre y handoff.
- 37. Aprendizajes y convenciones — caso VTEX Control Center.
- 38. Nota final.

# 1. Objetivo del documento

Este documento establece una metodologia oficial y reutilizable para organizar, desarrollar, validar, documentar y mantener proyectos asistidos por IA.

La guia esta pensada para equipos que necesitan trabajar con claridad, trazabilidad y control, evitando retrabajo y reduciendo el consumo innecesario de tokens.

Sirve como base para:

- organizar proyectos desde el inicio;
- trabajar con IA de forma coordinada;
- separar auditoria, implementacion, validacion y release;
- reducir cambios fuera de alcance;
- mantener documentacion institucional compartida;
- validar antes de publicar;
- cerrar tareas con criterios claros;
- sostener mejora continua.

# 2. Principios generales de trabajo

- Claridad antes que velocidad.
- Cambios pequenos, controlados y verificables.
- Separar analisis, implementacion, validacion y release.
- Validar antes de publicar.
- Mantener trazabilidad de decisiones, cambios y riesgos.
- Documentar decisiones importantes.
- Evitar cambios fuera de alcance.
- Priorizar estabilidad y comprension.
- No mezclar cambios funcionales, visuales, estructurales y documentales si pueden tratarse por separado.
- Alinear la documentacion al publico objetivo.
- Reutilizar contexto institucional antes de volver a explicar el proyecto.
- La IA acelera el trabajo, pero no reemplaza el criterio del equipo.

# 3. Metodologia de trabajo con IA

## ChatGPT

ChatGPT se utiliza principalmente como capa de organizacion, estrategia, UX, documentacion y coordinacion funcional.

Responsabilidades principales:

- redaccion de requerimientos;
- definicion de alcance;
- organizacion funcional;
- documentacion operativa;
- validacion de UX y enfoque de usuario;
- coordinacion general;
- generacion de prompts claros y optimizados;
- transformacion de ideas ambiguas en planes accionables;
- preparacion de criterios de aceptacion;
- redaccion de guias, informes y releases.

ChatGPT debe ayudar a generar requerimientos claros y especificos para reducir consumo excesivo de tokens en Codex y Claude Code.

ChatGPT tambien puede actuar como capa de validacion funcional y coherencia documental entre distintas IA.

Tambien actua como capa de coordinacion entre:

- implementacion;
- auditoria;
- documentacion;
- validacion final.

Buenas practicas con ChatGPT:

- definir alcance antes de implementar;
- dividir tareas grandes en tareas pequenas;
- separar cambios funcionales, visuales, estructurales y documentales;
- pedir auditoria antes de cambios grandes;
- pedir criterios de aceptacion;
- redactar prompts especificos para otras IA;
- adaptar el lenguaje segun audiencia tecnica u operativa;
- pedir una propuesta antes de ejecutar cuando el problema no esta claro.

Evitar:

```txt
Mejoralo.
```

Preferir:

```txt
Auditar esta funcionalidad sin modificar archivos. Identificar problemas, riesgos, mejoras priorizadas y proponer el siguiente cambio de menor riesgo.
```

## Codex

Codex se utiliza principalmente trabajando sobre proyectos y carpetas locales.

Responsabilidades principales:

- implementacion;
- modificacion de archivos;
- creacion de estructura;
- builds;
- validaciones;
- generacion de documentacion tecnica;
- cambios controlados sobre el repositorio local;
- ajustes verificables con comandos o pruebas.

Codex debe trabajar respetando:

- alcance definido;
- archivos permitidos;
- archivos que no deben modificarse;
- validaciones esperadas;
- estructura institucional del proyecto;
- convenciones existentes;
- separacion entre cambios de logica, UI, estructura y documentacion.

Buenas practicas con Codex:

- indicar exactamente que archivos puede modificar;
- indicar que archivos no debe tocar;
- pedir siempre:
  - archivos modificados;
  - resumen del cambio;
  - validaciones realizadas;
  - riesgos detectados;
  - confirmacion de alcance;
- pedir que no cambie logica cuando la tarea sea visual o documental;
- pedir validaciones concretas;
- evitar prompts ambiguos como "mejoralo" o "hacelo mas lindo";
- pedir implementaciones pequenas antes que refactors grandes.

Ejemplo recomendado:

```txt
Modificar solo src/form.js y docs/release.md.
No cambiar logica de validacion.
Agregar mensajes visibles.
Ejecutar npm test.
Devolver archivos modificados, validaciones y riesgos.
```

## Claude Code

Claude Code se utiliza cada vez mas como herramienta principal de trabajo sobre proyectos locales. En la practica, Codex y Claude Code terminan usandose para casi lo mismo: implementacion controlada, auditorias, analisis y validaciones sobre archivos del repositorio. La diferencia entre usar uno u otro suele ser de preferencia, disponibilidad o costo en el momento, no de capacidad.

Responsabilidades principales (compartidas con Codex):

- implementacion controlada sobre archivos locales;
- auditorias profundas y analisis arquitectonico;
- revision critica y deteccion de riesgos;
- evaluacion de escalabilidad e identificacion de deuda tecnica;
- analisis complejos de consistencia;
- propuestas de refactor;
- generacion y actualizacion de documentacion tecnica;
- validaciones sobre el codigo y los cambios.

Claude Code sigue siendo la opcion preferida para:

- auditorias profundas antes de refactors grandes;
- cambios estructurales o decisiones de arquitectura;
- reorganizacion de modulos;
- cambios con alto impacto transversal;
- entender sistemas complejos antes de modificarlos.

Buenas practicas con Claude Code:

- pedir auditorias antes de implementar cuando el alcance no este claro (igual que con Codex);
- pedir hallazgos priorizados;
- separar auditoria de implementacion;
- pedir riesgos, deuda tecnica y opciones;
- evitar cambios masivos sin validacion previa;
- indicar exactamente que archivos puede y no puede modificar, igual que con Codex;
- pedir resumen de cambios, archivos modificados, validaciones y riesgos al cerrar la tarea;
- elegir el modelo segun el riesgo de la tarea (ver 6.2) para optimizar tiempo y consumo.

# 4. Flujo recomendado de trabajo con IA

Flujo sugerido:

```txt
ChatGPT
-> estrategia, alcance y requerimientos

Codex
-> implementacion controlada sobre archivos locales

Claude Code
-> auditoria profunda y revision tecnica

ChatGPT
-> validacion final, UX, documentacion y comunicacion
```

No todas las tareas requieren todas las IA.

Ejemplos:

- Una correccion pequena puede ir directo a Codex.
- Una decision de producto puede trabajarse solo con ChatGPT.
- Un refactor grande conviene auditarlo primero con Claude Code.
- Una release importante puede requerir Codex para validar y ChatGPT para documentar.
- Una auditoria tecnica amplia puede hacerse con Claude Code antes de definir implementacion.

# 5. Manejo de contexto y documentacion institucional

Las IA funcionan mejor cuando mantienen contexto compartido y documentacion institucional consistente.

El equipo debe evitar que cada conversacion empiece desde cero. Para eso, conviene mantener documentos base actualizados y reutilizarlos como fuente de contexto.

Documentacion recomendada:

- `README.md`;
- documentos de contexto del proyecto;
- requerimientos;
- releases;
- roadmap;
- matriz de validacion;
- ejemplos reales;
- decisiones importantes;
- guias operativas.

Ejemplo de fuentes compartidas:

```txt
README.md
AI_CONTEXT.md
docs/releases/
docs/roadmap.md
docs/requerimientos/
docs/test-matrix.md
docs/decisions/
examples/
```

Buenas practicas:

- mantener README actualizado;
- mantener documentos de contexto;
- mantener releases;
- mantener roadmap;
- mantener ejemplos reales;
- evitar reexplicar arquitectura en cada conversacion;
- reutilizar documentacion existente;
- subir documentacion base a las fuentes de cada proyecto cuando aplique;
- registrar decisiones importantes;
- separar documentacion tecnica y operativa.

Las tres IA deben trabajar alineadas mediante documentacion compartida.

Sin contexto compartido:

- aumenta el consumo de tokens;
- aumenta el riesgo de respuestas inconsistentes;
- se repiten explicaciones;
- se incrementa el retrabajo;
- se pierden decisiones previas.

## Manejo de contexto largo

Cuando el chat acumula demasiado contexto:

- abrir un nuevo chat antes de degradar calidad;
- reutilizar handoff corto;
- evitar continuar refactors grandes en chats compactados;
- evitar mezclar multiples proyectos en un mismo chat;
- reutilizar documentacion institucional como contexto base.

Indicadores para abrir nuevo chat:

- respuestas mas lentas;
- perdida de contexto;
- repeticiones;
- IA confundiendo etapas;
- necesidad de reexplicar decisiones;
- proyecto con demasiadas ramas abiertas.

Buenas practicas:

- usar handoff corto;
- resumir estado actual;
- listar pendientes;
- indicar riesgos abiertos;
- pegar solo contexto relevante;
- evitar pegar historiales gigantes completos.

# 6. Optimizacion de consumo de tokens

Los requerimientos claros reducen:

- consumo de tokens;
- retrabajo;
- cambios incorrectos;
- loops innecesarios;
- explicaciones repetidas;
- perdida de foco;
- riesgo de cambios fuera de alcance.

Prompt ambiguo = mayor consumo de tokens y mayor riesgo de cambios fuera de alcance.

Buenas practicas:

- escribir prompts especificos;
- definir alcance acotado;
- indicar que archivos se pueden tocar;
- indicar que archivos no se deben tocar;
- reutilizar documentacion existente;
- mantener README y contexto institucional;
- evitar repetir contexto innecesariamente;
- dividir proyectos grandes en etapas;
- pedir primero auditoria cuando el problema no este claro;
- pedir salida esperada: archivos, validaciones, riesgos, decisiones;
- separar auditoria, implementacion y validacion.

Prompt malo:

```txt
Mejoralo.
```

Prompt bueno:

```txt
Auditar la pantalla principal sin modificar archivos.
Evaluar claridad para usuarios no tecnicos, redundancias, riesgos y mejoras priorizadas.
Devolver quick wins, cambios de mediano impacto y recomendaciones a postergar.
```

## 6.1 Configuracion recomendada de IA por etapa

Antes de cada etapa o bloque de trabajo, indicar explicitamente la configuracion recomendada para optimizar tokens y reducir riesgo:

- Codex: Fast activado/desactivado y nivel de inteligencia sugerido.
- Claude Code: modo normal para tareas simples; razonamiento mas profundo solo para debugging, refactor critico o cambios de alto impacto.
- Claude Cowork: usar solo cuando haga falta trabajo asistido mas amplio o coordinacion, porque puede consumir mas tokens.

Criterio por tipo de tarea:

| Riesgo  | Ejemplos                                                                                                      | Configuracion sugerida                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Bajo    | Textos visibles, documentacion, labels, copy, validaciones git, cambios estaticos acotados                    | Codex: Fast activado + Inteligencia Baja o Media. Claude Code: normal                                                  |
| Medio   | HTML con JS interno sin tocar scripts, CSS menor, navegacion visual, paginas internas con estructura sensible | Codex: Fast activado + Inteligencia Media. Claude Code: normal o analisis medio                                        |
| Alto    | JS funcional, refactor, rutas complejas, errores, render dinamico, Backlog/Gestion/Gantt, simuladores         | Codex: Fast desactivado + Inteligencia Alta. Claude Code: razonamiento mas profundo                                    |
| Critico | Apps Script, config, formularios, submit, endpoints, payloads, logica economica, datos reales                 | Codex: Fast desactivado + Inteligencia Alta o Extremadamente Alta. Claude Code: contexto acotado y validacion estricta |

Reglas operativas:

- Si una tarea empieza en Fast y Codex propone tocar logica, rutas, JS, CSS, submit o config fuera de alcance, detener y subir configuracion.
- Si el chat acumula mucho contexto, abrir nuevo chat y pegar handoff corto.
- Mantener prompts compactos con archivos permitidos/prohibidos.
- Mantener regla PowerShell: comandos en una sola linea cuando corresponda, evitar backslash de Bash y recordar que el usuario ejecuta commits manualmente.
- Para Marketplace Portal, usar Codex como ejecutor principal de implementacion, auditoria tecnica, documentacion y smoke mockeado/local.
- Para cambios criticos usar Codex con Fast desactivado e inteligencia alta.
- Para cambios menores, documentales o de copy usar configuracion liviana.
- No gastar tokens de Codex en smokes visuales/manuales extensos cuando el usuario indique que los validara personalmente.

### Reglas practicas de configuracion

Usar configuraciones livianas solo cuando el alcance sea realmente acotado.

Subir nivel de inteligencia cuando:

- el cambio toca JS;
- hay render dinamico;
- existen CSV, APIs o datos externos;
- se modifican rutas;
- hay riesgo de romper navegacion;
- hay formularios o submit;
- existen dependencias compartidas;
- el cambio afecta multiples paginas;
- el proyecto ya tiene deuda tecnica o estructura compleja.

Fast activado:

- ideal para cambios visuales simples;
- documentacion;
- textos;
- auditorias menores;
- smoke tests;
- validaciones de git;
- cambios HTML estaticos pequenos.

Fast desactivado:

- obligatorio para cambios criticos;
- recomendado para refactors;
- recomendado para cambios sobre JS;
- recomendado para cambios de arquitectura;
- recomendado para paginas operativas complejas.

Claude Code:

- recomendado para auditorias profundas;
- ideal para entender arquitectura;
- ideal para detectar deuda tecnica;
- ideal antes de refactors grandes.

Claude Cowork:

- usar solo cuando haga falta trabajo coordinado mas amplio;
- puede consumir significativamente mas tokens;
- no usar como modo por defecto para tareas pequenas o medianas.

Regla recomendada:

- comenzar simple;
- subir inteligencia solo si el riesgo aumenta;
- evitar razonamiento extremo innecesario en tareas pequenas.

## 6.2 Eleccion de modelo en Codex y Claude Code

Como Codex y Claude Code se usan hoy para tareas muy similares, en ambos conviene recomendar explicitamente que modelo o nivel de razonamiento usar antes de empezar un bloque de trabajo. Elegir el modelo correcto para cada tarea es lo que mas impacta en velocidad, costo y calidad del resultado — no conviene usar siempre el modelo mas potente "por las dudas".

Criterio general (aplica a ambas herramientas):

| Riesgo de la tarea | Tipo de tarea | Modelo / nivel sugerido |
| ------------------ | ------------- | ----------------------- |
| Bajo | Texto, copy, documentacion, validaciones de git, cambios estaticos chicos | Modelo rapido / liviano (Fast en Codex, modelo estandar en Claude Code) |
| Medio | HTML/CSS, navegacion, paginas internas, JS simple sin logica critica | Modelo intermedio, razonamiento estandar |
| Alto | JS funcional, refactor, render dinamico, modulos complejos, errores dificiles de reproducir | Modelo de mayor capacidad, razonamiento mas profundo |
| Critico | Apps Script, config, formularios, endpoints, payloads, datos reales, decisiones de arquitectura | Modelo mas potente disponible, razonamiento extendido y contexto acotado |

Buenas practicas:

- antes de iniciar un bloque, indicar que modelo/nivel conviene segun el riesgo (igual que se hace con Fast/Inteligencia en Codex);
- subir de nivel apenas la tarea empiece a tocar logica, datos reales o arquitectura, aunque haya arrancado liviana;
- volver a un modelo mas liviano cuando el bloque critico termine, para no sostener un costo innecesario en tareas chicas posteriores;
- si la herramienta o el modelo disponible cambia (nueva version, nuevo limite, nueva politica), actualizar esta tabla en vez de dejarla desactualizada;
- ante la duda entre dos niveles, preferir el mas alto solo si la tarea toca una freeze zone (ver seccion 30) o datos reales; en caso contrario, preferir el mas liviano que resuelva el problema.

# 7. Rol del equipo humano

La IA no reemplaza el criterio del equipo.

El equipo humano es responsable de:

- definir prioridades;
- validar negocio;
- aprobar alcance;
- revisar UX;
- aprobar releases;
- validar resultados;
- tomar decisiones finales;
- decidir riesgos aceptables;
- priorizar roadmap;
- confirmar que la solucion responde a una necesidad real.

La IA debe actuar como acelerador y soporte, no como reemplazo de validacion humana.

Responsabilidades que no deben delegarse completamente:

- aprobacion final de alcance;
- decisiones de negocio;
- criterios sensibles de usuario;
- validacion de impacto real;
- aprobacion de publicacion;
- definicion de prioridades.

# 8. Estructura recomendada de proyectos

Estructura generica sugerida:

```txt
/src
/dist o /build
/docs
/tests
/examples
/assets
README.md
CHANGELOG.md
```

La estructura puede adaptarse segun el proyecto.

Criterios generales:

- `src`: codigo fuente.
- `dist` o `build`: artefactos generados o publicables.
- `docs`: documentacion funcional, tecnica y operativa.
- `tests`: pruebas automatizadas.
- `examples`: casos de ejemplo o fixtures.
- `assets`: recursos visuales o estaticos.
- `README.md`: entrada principal del proyecto.
- `CHANGELOG.md`: historial de cambios relevantes.

# 9. Estado del proyecto y nivel de madurez

No todos los proyectos requieren el mismo nivel de documentacion, validacion o arquitectura.

El nivel de proceso debe adaptarse al estado real del proyecto. Un prototipo no necesita la misma estructura que un sistema operativo usado por usuarios reales. Del mismo modo, un proyecto heredado requiere auditoria antes de recibir cambios grandes.

| Estado    | Descripcion                       | Enfoque recomendado                      |
| --------- | --------------------------------- | ---------------------------------------- |
| Concepto  | Idea inicial sin desarrollo       | Definir problema, usuarios y alcance     |
| Prototipo | Primera prueba funcional          | Validar utilidad antes de escalar        |
| MVP       | Version minima usable             | Priorizar estabilidad y feedback real    |
| Operativo | Uso real por usuarios             | Validar, documentar y controlar releases |
| Escalando | Crecimiento en alcance o usuarios | Reforzar arquitectura, tests y soporte   |
| Legacy    | Proyecto existente o heredado     | Auditar antes de modificar               |

# 10. Principio de simplicidad

No se debe agregar complejidad antes de necesitarla.

Buenas practicas:

- evitar sobreingenieria;
- preferir soluciones simples, validadas y mantenibles;
- usar herramientas livianas cuando resuelvan el problema;
- escalar arquitectura solo cuando haya evidencia real;
- no introducir dependencias, procesos o capas sin necesidad clara;
- mantener el sistema comprensible para quienes lo usan y mantienen.

La mejor solucion no siempre es la mas completa, sino la mas clara, mantenible y suficiente para el problema actual.

# 11. Flujo recomendado de trabajo

## Regla general de auditoria

Cuando el alcance no este completamente claro:

1. auditoria;
2. identificacion de riesgos;
3. definicion de alcance;
4. implementacion;
5. validacion.

Evitar:

- implementar directamente cambios grandes;
- mezclar auditoria e implementacion;
- refactors masivos sin mapa previo;
- cambios transversales sin smoke test.

La auditoria previa reduce:

- retrabajo;
- consumo de tokens;
- cambios fuera de alcance;
- deuda tecnica accidental;
- regresiones funcionales.

## Modo operativo para Marketplace Portal

Para Marketplace Portal, el flujo por defecto debe ser mas liviano que el usado durante la reestructuracion inicial.

Regla base:

```txt
Implementacion controlada -> validacion minima -> commit manual.
```

Usar auditoria previa solo cuando el cambio toque o pueda afectar:

- formularios;
- submit;
- Apps Script;
- endpoints;
- payloads;
- config;
- simuladores con formulas;
- paginas operativas con datos, CSV, filtros, render dinamico o localStorage;
- aliases o legacy;
- cambios de arquitectura.

Documentar en archivos solo cuando:

- se cierre un bloque importante;
- haya cambio arquitectonico;
- haya una decision relevante;
- se corrija un error;
- se prepare una release;
- se toque algo critico.

No documentar cada smoke test menor. Para cambios visuales o informativos de bajo riesgo, basta con validacion manual minima y un commit claro.

Cuando el usuario valide manualmente un cambio local, Codex no debe repetir un smoke visual/manual largo. En ese caso debe:

- registrar la validacion humana solo si se lo piden;
- documentar el cierre solo si se lo piden;
- mantener el reporte final acotado a alcance, archivos, riesgos y pendientes;
- dejar explicitamente pendiente cualquier smoke no ejecutado por Codex.

Agrupar cambios compatibles en una misma etapa:

- paginas informativas juntas;
- CSS visual junto;
- JS simple informativo junto;
- documentacion de cierre al final.

Mantener metodologia estricta solo para cambios criticos:

- formularios;
- simuladores;
- Apps Script;
- config;
- endpoints;
- payloads;
- submit real;
- datos reales.

## 1. Contexto inicial

- Definir objetivo del proyecto.
- Identificar usuarios.
- Identificar problema principal.
- Definir alcance inicial.
- Registrar restricciones.
- Revisar documentacion existente.

## 2. Auditoria

- Revisar estado actual.
- Identificar riesgos.
- Detectar deuda tecnica o funcional.
- Separar problemas reales de mejoras deseables.
- Priorizar hallazgos.

## 3. Plan tecnico

- Definir enfoque.
- Separar etapas.
- Identificar archivos o modulos afectados.
- Definir validaciones.
- Confirmar que no se mezclen cambios incompatibles.

## 4. Implementacion

- Hacer cambios pequenos.
- Mantener consistencia con el proyecto.
- Evitar refactors no solicitados.
- Documentar decisiones si afectan arquitectura o comportamiento.

## 5. Validacion

- Ejecutar pruebas.
- Hacer smoke test.
- Revisar consola/logs cuando aplique.
- Validar archivos generados.
- Comparar con casos reales o ejemplos.

## 6. Documentacion

- Actualizar README si cambia uso general.
- Crear o actualizar release notes.
- Documentar decisiones relevantes.
- Documentar limitaciones conocidas.

## 7. Release

- Confirmar build.
- Confirmar tests.
- Confirmar version.
- Confirmar artefactos publicados.
- Registrar cambios y riesgos.

## 8. Post deploy

- Verificar entorno real.
- Confirmar que no haya errores criticos.
- Registrar incidentes o ajustes.
- Actualizar documentacion si se detectan diferencias.

## 9. Mejora continua

- Recolectar casos nuevos.
- Convertir errores en ejemplos o tests.
- Priorizar mejoras.
- Evitar crecer complejidad sin necesidad.

# 12. Tipos de cambios

Siempre que sea posible, los cambios deben tratarse por separado.

Tipos habituales:

- Funcional: cambia comportamiento o agrega capacidades.
- Visual/UI: cambia apariencia, jerarquia o experiencia.
- Estructural: mueve carpetas, archivos o responsabilidades.
- Documentacion: crea o ajusta guias, releases o contexto.
- Refactor: cambia organizacion interna sin cambiar comportamiento esperado.
- Performance: mejora tiempos, consumo o eficiencia.
- Release: prepara version, build, changelog y publicacion.

Separarlos ayuda a:

- revisar mejor;
- validar mejor;
- revertir mejor;
- explicar mejor;
- reducir riesgos.

# 13. Riesgo segun tipo de cambio

| Tipo de cambio       | Riesgo |
| -------------------- | ------ |
| Documentacion        | Bajo   |
| Texto/UI simple      | Bajo   |
| UI compleja          | Medio  |
| Cambio funcional     | Medio  |
| Refactor estructural | Alto   |
| Build/release        | Alto   |
| Dependencias nuevas  | Alto   |

Los cambios de mayor riesgo requieren:

- auditoria previa;
- validaciones adicionales;
- releases mas controlados;
- plan de rollback;
- revision humana mas cuidadosa;
- documentacion de riesgos.

# 14. Anti patrones comunes

Anti patrones que deben evitarse:

- prompts ambiguos;
- implementar sin auditoria cuando el alcance no esta claro;
- mezclar cambios funcionales, visuales y estructurales;
- publicar sin smoke test;
- refactors grandes sin validacion;
- modificar multiples modulos sin alcance claro;
- no documentar releases;
- no mantener contexto institucional actualizado;
- regenerar builds sin validar;
- agregar dependencias sin justificar;
- cambiar comportamiento cuando solo se pidio documentacion;
- hacer cambios visuales sin revisar responsive o accesibilidad;
- publicar sin saber que se modifico.

Estos escenarios suelen aumentar:

- consumo de tokens;
- retrabajo;
- errores;
- deuda tecnica;
- riesgo de regresiones;
- dificultad para revisar o revertir.

# 15. Validaciones recomendadas

Validaciones posibles segun el tipo de proyecto:

- validacion local;
- smoke test;
- tests automatizados;
- revision manual;
- validacion responsive;
- revision de consola/logs;
- validacion de archivos generados;
- comparacion con ejemplos reales;
- validacion de accesibilidad;
- validacion de performance;
- revision de permisos o seguridad;
- revision de compatibilidad entre navegadores o entornos.

Ejemplo de checklist de validacion:

```txt
- Build OK.
- Tests OK.
- Smoke test OK.
- Consola sin errores.
- Documentacion actualizada.
- Casos reales revisados.
- Riesgos documentados.
```

# 16. Flujo recomendado de release

Flujo sugerido:

1. Auditoria.
2. Definicion de alcance.
3. Implementacion controlada.
4. Validaciones.
5. Release notes.
6. Build.
7. Smoke test.
8. Deploy.
9. Auditoria post deploy.
10. Documentacion final.

Criterios:

- no publicar sin validacion minima;
- no publicar sin saber que cambio se esta entregando;
- no publicar si no hay forma de identificar o revertir el cambio;
- documentar riesgos conocidos;
- confirmar que el flujo principal funciona.

# 17. Documentacion tecnica vs operativa

La documentacion tecnica y la documentacion operativa no deben redactarse igual.

## Documentacion tecnica

Orientada a equipos de desarrollo, arquitectura o soporte tecnico.

Puede incluir:

- arquitectura;
- builds;
- APIs;
- estructura;
- desarrollo;
- decisiones tecnicas;
- validaciones;
- dependencias;
- flujo de release.

## Documentacion operativa

Orientada a usuarios, agentes, negocio, soporte o equipos no tecnicos.

Debe incluir:

- para que sirve;
- cuando usarlo;
- como usarlo paso a paso;
- que resultado esperar;
- que hacer ante errores;
- limites claros;
- lenguaje simple;
- ejemplos reales.

Regla general:

```txt
La documentacion tecnica explica como esta construido.
La documentacion operativa explica como se usa y para que sirve.
```

# 18. Documentacion viva

La documentacion debe evolucionar con el proyecto.

Un documento util no es el que se escribe una vez, sino el que se mantiene alineado con el estado real del producto.

Buenas practicas:

- actualizar README cuando cambie el uso general;
- actualizar roadmap cuando cambien prioridades;
- actualizar releases cuando se publique una version;
- actualizar contexto institucional cuando cambie arquitectura, alcance o convenciones;
- revisar si cada cambio relevante requiere actualizacion documental;
- eliminar o corregir documentacion obsoleta.

La documentacion debe revisarse especialmente despues de:

- releases;
- refactors;
- cambios de arquitectura;
- cambios operativos relevantes.

Una documentacion desactualizada genera:

- errores;
- retrabajo;
- perdida de contexto;
- decisiones inconsistentes;
- mayor consumo de tokens;
- onboarding mas lento.

# 19. Documentacion minima recomendada

Documentos utiles para proyectos mantenibles:

```txt
README.md
docs/requerimiento.md
docs/release.md
docs/roadmap.md
docs/test-matrix.md
docs/decisions/
```

Uso recomendado:

- `README.md`: que es el proyecto, como se usa, como se valida.
- `docs/requerimiento.md`: necesidad original y alcance.
- `docs/release.md`: cambios por version.
- `docs/roadmap.md`: proximos pasos.
- `docs/test-matrix.md`: casos de prueba y criterios esperados.
- `docs/decisions/`: decisiones importantes de arquitectura o producto.

# 20. Uso de bases de datos ligeras

Cuando un proyecto requiere persistencia simple o una base de datos liviana, se recomienda evaluar herramientas de bajo costo operativo antes de disenar una arquitectura backend compleja.

Opciones recomendadas para casos simples:

- Google Sheets.
- Google Apps Script.

Estas herramientas pueden ser utiles cuando el proyecto necesita:

- formularios;
- reportes;
- configuraciones;
- logs;
- dashboards;
- datos operativos;
- automatizaciones simples;
- seguimiento de casos;
- administracion manual por equipos no tecnicos.

Ventajas:

- implementacion rapida;
- bajo costo;
- facilidad de mantenimiento;
- integracion sencilla;
- baja barrera de adopcion;
- edicion comprensible para usuarios de negocio;
- buena opcion para prototipos o primeras versiones operativas.

Ejemplos de uso adecuado:

| Necesidad                                      | Opcion liviana     |
| ---------------------------------------------- | ------------------ |
| Registrar respuestas de un formulario          | Google Sheets      |
| Generar un panel operativo simple              | Google Sheets      |
| Automatizar envio o transformacion simple      | Google Apps Script |
| Mantener configuraciones editables por negocio | Google Sheets      |
| Registrar eventos o logs operativos simples    | Google Sheets      |

Limite importante:

Google Sheets y Google Apps Script no reemplazan arquitecturas backend complejas cuando el proyecto escala.

Conviene evaluar una solucion backend mas robusta cuando aparecen necesidades como:

- alto volumen de datos;
- concurrencia elevada;
- permisos avanzados;
- auditoria estricta;
- integraciones criticas;
- baja latencia;
- reglas de negocio complejas;
- trazabilidad transaccional;
- disponibilidad garantizada.

# 21. Criterios para cerrar tareas

Una tarea puede considerarse cerrada cuando:

- el alcance fue cumplido;
- los archivos esperados fueron creados o modificados;
- las validaciones definidas pasaron;
- la documentacion relevante fue actualizada;
- no hay errores criticos conocidos;
- los riesgos estan documentados;
- el resultado esta listo para revision o deploy.

# 22. Criterios para hacer deploy

Antes de publicar:

- build OK;
- tests OK;
- smoke test OK;
- documentacion actualizada;
- release documentado;
- rollback identificable;
- version o artefacto identificable;
- responsable o canal de soporte definido;
- riesgos conocidos comunicados.

No conviene publicar si:

- hay errores criticos sin resolver;
- no se pudo validar el flujo principal;
- no se sabe como revertir;
- no hay claridad sobre que cambio se esta publicando.

# 23. Manejo de errores y casos nuevos

Cuando aparece un error o caso nuevo:

1. Guardar evidencia.
2. Registrar pasos para reproducir.
3. Clasificar severidad.
4. Identificar impacto.
5. Agregar el caso a tests, examples o matriz de validacion.
6. Corregir con alcance controlado.
7. Validar regresiones.
8. Documentar la solucion si cambia comportamiento.

Clasificacion sugerida:

- Critico: bloquea uso principal o genera informacion incorrecta grave.
- Alto: afecta flujo importante, pero tiene workaround.
- Medio: afecta casos secundarios.
- Bajo: mejora menor, texto, estilo o ajuste no bloqueante.

# 24. Cuando no usar IA o cuando limitar su uso

La IA debe usarse con criterio y supervision humana.

Hay contextos donde puede ayudar a ordenar informacion o preparar borradores, pero no debe tomar la decision final.

Se debe limitar su uso o exigir revision humana estricta en:

- decisiones legales o contractuales;
- cambios productivos irreversibles;
- manejo de credenciales o secretos;
- datos sensibles sin controles adecuados;
- seguridad critica;
- decisiones financieras relevantes;
- acciones que requieran aprobacion formal;
- publicaciones sin validacion humana;
- decisiones que afecten cumplimiento normativo;
- operaciones que puedan impactar clientes, dinero, privacidad o disponibilidad.

En estos casos, la IA puede ayudar a:

- resumir informacion;
- preparar alternativas;
- redactar borradores;
- listar riesgos;
- organizar evidencia;
- generar checklists.

Pero la decision, aprobacion y ejecucion final deben quedar bajo responsabilidad humana.

# 25. Buenas practicas de prompts

## A. Auditoria

```txt
Auditar [modulo/proceso]. No modificar archivos.
Entregar:
- diagnostico;
- riesgos;
- problemas priorizados;
- mejoras recomendadas;
- quick wins;
- proximo paso sugerido.
```

## B. Implementacion

```txt
Implementar [cambio].
Modificar solo:
- [archivo/carpeta]

No modificar:
- [restricciones]

Validar:
- [comandos o criterios]

Devolver:
- archivos modificados;
- resumen;
- validaciones;
- riesgos.
```

## C. Validacion

```txt
Validar [funcionalidad/version].
No modificar archivos.
Revisar:
- carga;
- flujo principal;
- errores de consola;
- casos reales;
- responsive;
- artefactos generados.

Devolver resultado por seccion, errores, warnings y recomendacion final.
```

## D. Release

```txt
Preparar documentacion de release para [version].
Incluir:
- version;
- cambios;
- funcionalidades;
- validaciones;
- limitaciones;
- riesgos;
- proximos pasos.

No modificar logica.
```

## E. Documentacion

```txt
Crear documentacion para [audiencia].
Objetivo:
- [objetivo]

Estilo:
- claro;
- profesional;
- reutilizable;
- sin tecnicismos innecesarios.

No modificar codigo.
```

# 26. Checklist base del proyecto

Checklist reutilizable:

```txt
[ ] Objetivo definido.
[ ] Alcance definido.
[ ] Usuarios identificados.
[ ] Restricciones documentadas.
[ ] Estructura inicial creada.
[ ] README actualizado.
[ ] Contexto institucional actualizado.
[ ] Requerimiento documentado.
[ ] Roadmap inicial definido.
[ ] Auditoria realizada si aplica.
[ ] Implementacion separada por tipo de cambio.
[ ] Validaciones ejecutadas.
[ ] Casos reales o ejemplos agregados si aplica.
[ ] Release documentado.
[ ] Riesgos documentados.
[ ] Post deploy revisado.
[ ] Proximos pasos definidos.
```

# 27. Convenciones recomendadas

- Usar commits descriptivos.
- Usar nombres claros para archivos, carpetas y funciones.
- Separar documentacion tecnica y operativa.
- Evitar tecnicismos innecesarios en documentacion para usuarios.
- Mantener consistencia visual y documental.
- Registrar decisiones importantes.
- No mezclar refactors con cambios funcionales cuando se pueda evitar.
- Mantener ejemplos reales o fixtures cuando aporten validacion.
- Escribir releases entendibles para quienes usan y mantienen el proyecto.
- Priorizar legibilidad sobre complejidad.
- Mantener el contexto institucional actualizado.

# 28. Regla operativa para comandos Git

El usuario trabaja normalmente desde VS Code y PowerShell en Windows. Por eso, los bloques de comandos deben entregarse preferentemente compatibles con PowerShell.

## Regla operativa Git y consola

El usuario realiza commits manualmente desde consola la mayor parte del tiempo. En algunos casos puede pedirle directamente a la IA que haga el commit y/o el push por el.

Regla clave cuando la IA ejecuta git:

- la IA puede hacer commit y/o push solo cuando el usuario lo pide explicitamente en ese momento;
- antes de ejecutar, la IA debe preguntar y confirmar: que archivos va a incluir, el mensaje de commit propuesto, y si corresponde tambien hacer push (y a que branch);
- una autorizacion puntual no es una autorizacion permanente: si el usuario aprueba un commit/push una vez, eso no habilita a la IA a repetirlo sin preguntar en los siguientes cambios;
- evitar `git add .` o `git add -A` sin revisar antes que no se sumen archivos sensibles (credenciales, configuracion local, archivos generados);
- nunca forzar push, hacer reset duro ni reescribir historial sin pedido explicito y confirmacion previa.

Buenas practicas:

- entregar comandos listos para copiar;
- preferir una sola linea en PowerShell;
- evitar continuaciones con "\" estilo Bash;
- no asumir entorno Linux;
- indicar claramente:
  - commit;
  - push;
  - branch;
  - validaciones previas;
  - archivos modificados.

Preferir:

```powershell
git add . ; git commit -m "mensaje"
```

adaptado a PowerShell cuando corresponda.

Buenas practicas operativas:

- Evitar comandos multilinea con `\` cuando sean para copiar directamente.
- Para `git add` con varios archivos, usar una sola linea.
- Mantener siempre validacion antes y despues:
  - `git status --short`
  - `git diff --name-only`
- Los commits los ejecuta manualmente el usuario.

Ejemplo recomendado:

```powershell
git status --short
git diff --name-only
git add README.md CHANGELOG.md docs/roadmap.md
git status --short
```

# 29. Metodologia visual y consistencia UI

El documento refleja metodologia de arquitectura, IA y workflow. Esta seccion institucionaliza la metodologia visual que ya es parte central del trabajo real.

## Principios visuales base

- Consistencia entre paginas antes que perfeccion individual.
- Separar estilos publicos de estilos internos/operativos.
- Usar shared CSS para elementos comunes: topbar, sidebar, cards, badges, footer.
- No duplicar estilos entre paginas: centralizar.
- Priorizar legibilidad sobre densidad visual.
- Mantener jerarquia clara: titulo, subtitulo, cuerpo, etiqueta.

## Espaciado y tipografia

- Mantener spacing consistente entre secciones y componentes.
- No mezclar tamanios de fuente sin jerarquia clara.
- Evitar padding cero en contenedores principales.
- Verificar overflow en textos largos, especialmente en mobile.
- Respetar line-height para legibilidad en bloques de texto.

## Componentes recurrentes

| Componente         | Regla general                                           |
| ------------------ | ------------------------------------------------------- |
| Headers / topbar   | Consistentes entre todas las paginas del mismo modulo   |
| Sidebar            | Colapsable en mobile; no romper navegacion              |
| Cards              | Padding uniforme; texto sin overflow; accion clara      |
| Badges / etiquetas | Color con significado definido; no usar solo decorativo |
| Botones            | Jerarquia clara: primario, secundario, destructivo      |
| Formularios        | Label visible; error visible; submit claro              |
| Tablas             | Responsive; columnas priorizadas en mobile              |

## Separacion publico / interno

- Las paginas publicas deben tener estetica mas neutra y profesional.
- Las paginas internas/operativas pueden priorizar densidad de informacion.
- No mezclar estilos de ambos contextos sin justificacion.
- Definir paleta por contexto y documentarla.

## Navegacion y rutas

- Verificar que todos los links del menu funcionen despues de cambios.
- Verificar active states en navegacion.
- Verificar breadcrumbs si existen.
- No romper rutas al reorganizar carpetas o renombrar archivos.
- Verificar que paginas de error o fallback existan.

## Branding y consistencia visual

- Mantener uso coherente de logo, colores primarios y tipografia base.
- No mezclar familias de fuentes sin criterio.
- Documentar paleta de colores usada.
- Evitar cambios de branding en etapas operativas sin decision formal.

## Enterprise SaaS UI

Criterios de referencia para proyectos con nivel de madurez PRO o institucional:

- Layout limpio con espacio en blanco generoso.
- Sidebar estable y navegacion predecible.
- Densidad controlada: no mostrar todo junto.
- Estados vacios con mensaje claro.
- Feedback de acciones: loaders, confirmaciones, errores visibles.
- Consistencia entre modulos aunque hayan sido desarrollados en etapas distintas.

# 30. Freeze zones y zonas criticas

Las zonas criticas son archivos, modulos o configuraciones que NO deben modificarse sin auditoria y aprobacion explicita.

## Definicion de freeze zone

Una freeze zone es cualquier elemento donde un cambio no controlado puede:

- romper flujo principal;
- generar datos incorrectos;
- interrumpir integraciones externas;
- afectar usuarios reales;
- generar errores irreversibles.

## Zonas congeladas por defecto

Estas zonas requieren siempre validacion estricta antes de cualquier cambio:

| Zona                                | Razon                                         |
| ----------------------------------- | --------------------------------------------- |
| Apps Script / backend               | Logica de negocio y automatizaciones criticas |
| Payloads y endpoints                | Contratos con servicios externos              |
| Submit y formularios activos        | Afectan datos reales                          |
| Config y variables de entorno       | Pueden romper todo el proyecto                |
| Render dinamico con datos reales    | CSV, APIs, localStorage                       |
| Rutas y aliases                     | Pueden romper navegacion completa             |
| Timeline y simuladores con formulas | Logica economica sensible                     |
| Logica de autenticacion o permisos  | Seguridad critica                             |
| Legacy, aliases y raiz compatible   | Preservan URLs historicas y compatibilidad    |
| Logos y assets historicos           | Pueden estar referenciados por paginas reales |

## Regla operativa para freeze zones

Antes de tocar una freeze zone:

1. Auditoria del modulo.
2. Identificacion de dependencias.
3. Definicion de alcance acotado.
4. Implementacion con backup o rama separada.
5. Validacion estricta antes de publicar.
6. Documentar el cambio.

Nunca modificar una freeze zone como parte de un cambio visual o documental.
Si la IA propone tocar una freeze zone fuera de alcance: detener y renegociar alcance.

## Compatibility layer Marketplace Portal

En Marketplace Portal, la raiz conserva una capa de compatibilidad con aliases historicos. `legacy/root-html-v1/` queda reservado para snapshots futuros. Por defecto:

- no eliminar aliases de raiz;
- no mover aliases de raiz;
- no limpiar fisicamente `legacy/`;
- no limpiar fisicamente `Logos/` ni `assets/logos/`;
- no cambiar rutas historicas sin etapa explicita;
- no hacer limpieza fisica de archivos fuente o snapshots sin smoke de URLs historicas.

Cualquier limpieza fisica requiere:

1. auditoria de referencias;
2. lista exacta de archivos;
3. etapa explicita de limpieza;
4. smoke de aliases y URLs historicas;
5. plan de rollback.

## Como declarar freeze zones en prompts

```txt
No modificar:
- Apps Script
- config/
- src/submit.js
- payloads/
Modificar solo:
- src/ui/cards.css
- docs/release.md
```

# 31. Auditoria vs implementacion como metodologia formal

La separacion entre auditoria e implementacion es un principio central de esta metodologia, no una sugerencia opcional.

## Por que separar siempre

Mezclar auditoria e implementacion en una misma instruccion o etapa genera:

- cambios fuera de alcance no detectados;
- retrabajo por falta de mapa previo;
- consumo excesivo de tokens;
- regresiones no anticipadas;
- dificultad para revisar o revertir;
- deuda tecnica accidental.

## Flujo formal

```txt
AUDITORIA (sin modificar archivos)
-> diagnostico
-> riesgos detectados
-> dependencias identificadas
-> alcance recomendado
-> quick wins vs cambios de mayor impacto

IMPLEMENTACION (alcance definido y aprobado)
-> archivos permitidos declarados
-> archivos prohibidos declarados
-> validaciones esperadas definidas
-> resumen de cambio al finalizar

VALIDACION (independiente de implementacion)
-> smoke test
-> revision de consola
-> casos reales
-> responsive si aplica
```

## Cuando es obligatorio separar

- Refactors de cualquier escala.
- Cambios en JS, rutas, formularios o config.
- Cambios transversales que afecten multiples paginas.
- Proyectos con deuda tecnica o estructura heredada.
- Cualquier cambio donde el alcance no este completamente claro.

## Cuando puede omitirse la auditoria formal

- Cambios visuales acotados y bien definidos.
- Correcciones de texto o labels.
- Documentacion sin tocar logica.
- Cambios que el equipo ya entiende completamente.

Incluso en estos casos, conviene un smoke test minimo post-cambio.

## Prompt de auditoria recomendado

```txt
Auditar [modulo o archivo] sin modificar ningún archivo.
Entregar:
- diagnostico actual;
- riesgos detectados;
- dependencias criticas;
- quick wins;
- cambios recomendados priorizados;
- proximo paso sugerido de menor riesgo.
```

# 32. Smoke visual y QA manual

El smoke visual es la validacion rapida post-cambio que confirma que nada visible se rompio. Es parte obligatoria del flujo para cambios UI o estructurales.

## Que cubre el smoke visual

- Carga correcta de la pagina o modulo.
- Ausencia de errores visibles en consola.
- Layout sin elementos rotos, superpuestos o fuera de lugar.
- Navegacion funcional: links, menu, sidebar, topbar.
- Responsive basico: mobile y desktop.
- Overflow controlado en textos y contenedores.
- Estados vacios o de error visibles si aplica.
- Formularios con label, campo y submit visible.
- Datos o contenido cargado correctamente.
- Ausencia de elementos duplicados o faltantes.

## Checklist de smoke visual

```txt
[ ] Pagina carga sin error.
[ ] Consola sin errores criticos.
[ ] Layout sin elementos rotos.
[ ] Navegacion funciona.
[ ] Mobile sin overflow ni elementos cortados.
[ ] Formularios visibles y operativos.
[ ] Datos cargan correctamente si aplica.
[ ] Links internos funcionan.
[ ] No hay contenido duplicado ni faltante.
[ ] Branding y estilos consistentes con el resto del proyecto.
```

## Cuando ejecutar smoke visual

- Despues de cualquier cambio UI.
- Despues de cambios CSS o estructurales.
- Antes de hacer commit en cambios visuales.
- Antes de release.
- Despues de deploy en entorno real.

## QA manual para cambios funcionales

Para cambios que afecten logica, formularios, datos o integraciones:

```txt
[ ] Flujo principal funciona de inicio a fin.
[ ] Casos de error visibles y comprensibles.
[ ] Datos enviados o recibidos correctamente.
[ ] Sin loops, freezes ni comportamientos inesperados.
[ ] Validaciones activas.
[ ] Submit o accion principal ejecuta correctamente.
[ ] Respuesta del sistema es clara para el usuario.
[ ] Comportamiento consistente en distintos navegadores si aplica.
```

## GitHub Pages y entornos estaticos

Para proyectos publicados en GitHub Pages u hosting estatico:

- Verificar rutas relativas vs absolutas.
- Verificar que assets carguen correctamente post-deploy.
- Verificar que 404 no rompa navegacion.
- Verificar seller_id u otros parametros dinamicos si aplica.
- Revisar cache si los cambios no aparecen inmediatamente.

## Validacion manual humana vs validacion asistida por IA

La validacion puede ser asistida por IA o realizada manualmente por el usuario. La eleccion debe optimizar seguridad, evidencia y consumo de tokens.

Usar validacion asistida por IA cuando:

- haya validaciones estaticas o mockeadas rapidas;
- se necesite revisar diffs, payloads o contratos;
- se pueda ejecutar `git diff --check`, parsing local o smoke mockeado;
- el flujo tenga riesgo tecnico y requiera evidencia reproducible;
- el usuario no tenga el entorno manual abierto.

Usar validacion manual humana cuando:

- el usuario pueda validar visualmente mas rapido en navegador;
- el browser integrado o DevTools no este disponible;
- el smoke sea principalmente visual o responsive;
- la prueba requiera criterio humano de UX;
- la prueba real implique Apps Script, Google Sheets, datos dummy autorizados o GitHub Pages;
- el usuario indique explicitamente que la validara personalmente.

Reglas operativas:

- Si el usuario dice que validara manualmente, Codex no debe seguir intentando reconectar browser ni gastar tokens en smoke visual/manual.
- Codex debe dejar pendiente solo el smoke manual final que corresponda.
- Si despues de una implementacion local el usuario valida manualmente, Codex solo debe documentar el cierre si se lo piden.
- No pedir a Codex smokes manuales extensos si el usuario puede validarlos directamente con menor costo.
- Para cambios criticos, la validacion humana no reemplaza validaciones tecnicas basicas como `git diff --check`, revision de payloads o smoke mockeado cuando sean baratos y seguros.
- Para Apps Script, endpoints, payloads, formularios, simuladores y Google Sheets, cualquier prueba real debe quedar limitada a dummy autorizada o etapa explicita.

# 33. Niveles de madurez visual

Los proyectos evolucionan visualmente. Esta seccion define niveles de referencia para alinear expectativas y criterios de calidad.

| Nivel           | Descripcion                        | Criterios                                                                    |
| --------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| MVP visual      | Primera version funcional          | Funciona, no rompe, sin polish                                               |
| Operativo       | Usado por usuarios reales          | Consistente, legible, sin errores visuales                                   |
| PRO             | Referencia de calidad interna      | Espaciado, jerarquia, responsive, componentes unificados                     |
| Enterprise SaaS | Nivel institucional                | Feedback de acciones, estados vacios, navegacion predecible, branding solido |
| Institucional   | Documento o sistema con vida larga | Consistencia total, documentado, mantenible, escalable                       |

## Como usar estos niveles

- Definir el nivel objetivo antes de empezar una etapa visual.
- No exigir nivel Enterprise SaaS en un MVP.
- No publicar como operativo algo que aun esta en MVP visual.
- Elevar el nivel gradualmente con criterio y evidencia.

## Criterios para subir de nivel

De MVP a Operativo:

- Sin errores visuales criticos.
- Navegacion completa funcional.
- Responsive basico sin overflow.

De Operativo a PRO:

- Shared CSS implementado.
- Componentes consistentes entre paginas.
- Jerarquia tipografica clara.
- Spacing uniforme.

De PRO a Enterprise SaaS:

- Estados vacios documentados.
- Feedback de acciones implementado.
- Navegacion predecible y estable.
- Branding solido y documentado.
- Separacion clara entre contexto publico e interno.

# 34. Auditoria documental y limpieza controlada

La documentacion viva puede crecer mucho durante proyectos iterativos. El crecimiento no es un problema si la documentacion sigue teniendo proposito claro; si empieza a duplicar contexto, conviene auditar antes de limpiar.

## Criterios para detectar exceso documental

Un documento puede ser candidato a revision cuando:

- repite contenido de otro documento sin aportar audiencia distinta;
- conserva estados viejos que contradicen el estado actual;
- mezcla handoff, roadmap, test matrix y changelog en un mismo lugar;
- documenta detalles de smoke ya superados sin valor historico;
- no se referencia desde README, handoff o roadmap;
- contiene instrucciones obsoletas para rutas, deploy o herramientas.

## Reglas de limpieza

- No eliminar documentacion sin etapa explicita.
- No mover documentos sin revisar links y referencias.
- No borrar historico util para auditoria o rollback.
- Preferir archivar o consolidar antes que borrar.
- Mantener `CHANGELOG.md` como historial cronologico, no como manual operativo.
- Mantener `docs/roadmap.md` como direccion de etapas, no como bitacora exhaustiva.
- Mantener `docs/test-matrix.md` como matriz de validacion, no como changelog.
- Mantener `docs/handoff-post-v1.md` como punto de arranque para nuevo chat.

## Auditoria de limpieza Marketplace Portal

Candidatos a revisar en una etapa futura:

| Archivo o grupo | Motivo | Riesgo | Recomendacion |
| --- | --- | --- | --- |
| `docs/handoff-post-v1.md` | Puede quedar viejo despues de cada bloque largo | Alto si se usa como contexto inicial desactualizado | Mantener y actualizar solo en cierres de bloque o antes de nuevo chat |
| `docs/roadmap.md` | Acumula etapas historicas y proximos pasos | Medio por longitud | Mantener; evaluar resumen superior y archivo historico futuro |
| `docs/test-matrix.md` | Acumula smokes pasados y futuros | Medio por densidad | Mantener; separar matriz viva vs historico solo si crece demasiado |
| `docs/gantt-operativo-edicion.md` | Muy detallado por etapas 30-31 | Bajo mientras Gantt siga activo | Mantener como documento tecnico especializado |
| `docs/apps-script-modularizacion.md` | Mezcla diseno, validaciones y estado real | Medio | Mantener; revisar al cerrar modularizacion 31D/31E |
| Aliases raiz `*_v*.html` | Compatibility layer historica | Alto si se eliminan | No limpiar sin etapa explicita y smoke de URLs |
| `legacy/` | Reservado para snapshots futuros | Alto si se borra evidencia | No limpiar fisicamente |
| `Logos/` y `assets/logos/` | Posibles referencias actuales o historicas | Medio/alto | No limpiar sin auditoria de referencias y smoke visual |

Recomendacion actual:

- No limpiar ahora.
- Postergar limpieza fisica hasta una etapa dedicada.
- Priorizar consolidacion documental ligera: mantener handoff actualizado, roadmap como guia y changelog como historial.

# 35. Preparacion inicial de un proyecto nuevo

Antes de escribir la primera linea de codigo conviene dejar resuelto lo basico de organizacion. Esto evita retrabajo, reduce dudas en las primeras etapas y facilita que cualquier IA o persona entienda el proyecto desde el primer contacto.

## Carpeta local y repositorio

- Trabajar siempre sobre una carpeta local sincronizada con git (no editar directo en GitHub).
- Inicializar el repositorio con `git init` apenas exista la primera version util, no antes de tener algo para versionar ni mucho despues.
- Definir `.gitignore` desde el inicio: credenciales, dependencias, artefactos generados, archivos de entorno local.
- Hacer un primer commit chico que deje el esqueleto (README, CHANGELOG, estructura de carpetas) antes de sumar logica.

```powershell
git init
git add README.md CHANGELOG.md .gitignore
git status --short
git commit -m "chore: estructura inicial del proyecto"
```

## Estructura recomendada de directorios

Adaptar segun el tipo de proyecto, pero mantener una separacion clara entre frontend, backend/middleware y documentacion. Ejemplo para proyectos de tipo "frontend estatico + middleware + planilla":

```txt
/modules            -> paginas o features del frontend, agrupadas por dominio
/apps-script        -> codigo del middleware (router + modulos .gs)
/docs               -> documentacion tecnica, decisiones, roadmap, test-matrix
/assets             -> recursos estaticos (logos, imagenes, iconos)
config.js           -> configuracion sin credenciales (tiendas, version, changelog)
app.js              -> logica compartida del frontend
styles.css          -> estilos compartidos
README.md
CHANGELOG.md
CLAUDE.md / PROJECT_WORKFLOW.md
```

## Configuracion inicial del entorno

- Definir donde viven las credenciales antes de escribir el primer endpoint (Script Properties, variables de entorno, secret manager). Nunca en archivos versionados.
- Dejar documentado en `docs/` como se configura el entorno desde cero (que propiedades crear, que IDs anotar, que permisos pedir).
- Probar el flujo minimo end-to-end (login, primera llamada al backend, primer log) antes de construir modulos encima.

## Archivos minimos requeridos

Todo proyecto nuevo deberia arrancar con, al menos:

```txt
README.md           -> que es, como se usa, como se valida
CHANGELOG.md        -> historial de versiones
CLAUDE.md           -> instrucciones para la IA: convenciones, versionado, contexto
PROJECT_WORKFLOW.md -> esta metodologia, adaptada al proyecto
docs/roadmap.md     -> proximos pasos
docs/test-matrix.md -> casos de prueba y criterios esperados
```

Sumar `docs/decisions/` y `docs/handoff-*.md` apenas el proyecto empiece a tener decisiones relevantes o bloques largos de trabajo.

## Convenciones de nombres

Definir las convenciones antes de que crezca el proyecto, para no tener que migrar despues. Ejemplos que funcionaron bien:

- Archivos de modulo en minusculas con guiones, agrupados por dominio: `modules/<dominio>/<modulo>.html`.
- Funciones internas o privadas del backend con sufijo `_` (`getConfig_`, `vtexRequest_`) para distinguirlas de las acciones publicas del router.
- Variables de configuracion por entidad/tienda con prefijo en mayusculas (`SPORTING_VTEX_APP_KEY`, `WOKER_VTEX_APP_KEY`) y una clave compartida sin prefijo (`LOG_SPREADSHEET_ID`).
- Hojas de logs agrupadas por proposito y no por modulo suelto: `logs_<entidad>`, `backups_<entidad>`, `templates_<entidad>`.
- Claves de `localStorage` / `sessionStorage` con prefijo del proyecto (`vtex_cc_session`, `vtex_cc_active_store`) para evitar colisiones con otras apps.
- Commits con prefijo de tipo (`feat:`, `fix:`, `docs:`, `chore:`) y descripcion breve en español, igual que el resto del historial del repo.

## Checklist de arranque — primeros pasos en orden

Resumen accionable de como encarar el dia uno de un proyecto nuevo, combinando lo de esta seccion con la etapa de "Descubrimiento y analisis" de la seccion 36:

```txt
[ ] 1. Definir el proyecto en ChatGPT: objetivo, usuarios, problema, alcance inicial, restricciones.
[ ] 2. Pasar a Claude Code (o Codex) para materializarlo: son los que trabajan sobre carpeta y archivos locales.
[ ] 3. Crear la carpeta local del proyecto y abrirla en VS Code.
[ ] 4. Adjuntar/pegar PROJECT_WORKFLOW.md (adaptado si hace falta) como contexto inicial de la conversacion.
[ ] 5. git init.
[ ] 6. Crear los archivos minimos: README.md, CHANGELOG.md, CLAUDE.md, PROJECT_WORKFLOW.md, .gitignore.
[ ] 7. Primer commit chico con ese esqueleto.
[ ] 8. Definir la estructura de carpetas segun el tipo de proyecto (ver "Estructura recomendada de directorios" arriba).
[ ] 9. Resolver primero la configuracion critica: donde viven las credenciales, como se conecta el backend.
[ ] 10. Validar un flujo minimo end-to-end antes de construir modulos encima.
[ ] 11. Recien ahi avanzar incrementalmente, modulo por modulo, con commits chicos.
```

### Donde arrancar: ChatGPT o Claude Code

- **ChatGPT primero**, cuando la idea todavia no esta del todo definida: sirve para convertir una idea ambigua en un alcance claro, identificar usuarios, problema y restricciones, y preparar un brief que despues se le pasa a Claude Code o Codex. ChatGPT no trabaja sobre archivos ni carpetas locales.
- **Claude Code (o Codex) despues**, apenas exista un alcance minimo claro: son las herramientas que crean la carpeta, inicializan el repositorio, generan los archivos base y arman la estructura inicial.
- Si el alcance ya esta claro desde el arranque (por ejemplo, una iteracion sobre un tipo de proyecto ya conocido), se puede saltar el paso de ChatGPT y empezar directo en Claude Code.

### Adjuntar PROJECT_WORKFLOW.md desde el inicio

Si — conviene adjuntarlo (o pegarlo como contexto) desde la primera conversacion en Claude Code o Codex, no despues de tener avanzado el proyecto. Beneficios:

- evita reexplicar la metodologia en cada chat nuevo;
- la IA arranca alineada con las convenciones de versionado, git, freeze zones y documentacion institucional;
- reduce consumo de tokens porque no hay que reconstruir el contexto desde cero.

Si el proyecto nuevo difiere bastante del que origino este documento (otro stack, otra escala, otro tipo de usuarios), conviene primero adaptar las secciones especificas (estructura de carpetas, convenciones de nombres, ejemplos del proyecto) antes de adjuntarlo, para no arrastrar contexto que no aplica.

### Crear la carpeta de inicio — paso a paso

1. Elegir la ubicacion local habitual de proyectos y crear la carpeta con un nombre claro (kebab-case, sin espacios ni caracteres especiales).
2. Abrir la carpeta en VS Code.
3. Ejecutar `git init`.
4. Crear `.gitignore` con lo que nunca debe versionarse (credenciales, dependencias, archivos generados, configuracion local).
5. Crear los archivos minimos: `README.md`, `CHANGELOG.md`, `CLAUDE.md` (instrucciones para la IA) y `PROJECT_WORKFLOW.md` (esta metodologia, adaptada).
6. Hacer un primer commit chico con ese esqueleto, antes de sumar logica.
7. Recien ahi crear la estructura de carpetas del proyecto (ver "Estructura recomendada de directorios" en esta misma seccion) y empezar a sumar codigo.

```powershell
mkdir mi-proyecto-nuevo
cd mi-proyecto-nuevo
git init
git add .gitignore README.md CHANGELOG.md CLAUDE.md PROJECT_WORKFLOW.md
git status --short
git commit -m "chore: estructura inicial del proyecto"
```

# 36. Organizacion de etapas, cierre y handoff

## Etapas estandar de un proyecto

Toda iniciativa, grande o chica, puede mapearse a esta secuencia. No todas las etapas requieren el mismo esfuerzo: un cambio chico puede pasar por varias en minutos, uno grande puede dedicarle dias a cada una.

```txt
1. Descubrimiento y analisis  -> entender el problema, usuarios y restricciones
2. Diseño funcional           -> que debe hacer, para quien, con que alcance
3. Diseño tecnico             -> como se construye, que modulos y archivos cambian
4. Implementacion             -> cambios pequeños, controlados y verificables
5. Validacion                 -> smoke test, QA manual, revision de consola
6. Documentacion              -> README, CHANGELOG, decisiones, roadmap
7. Release                    -> version, changelog, deploy, comunicacion
8. Handoff                    -> resumen para retomar en otro chat, otra IA o otra persona
9. Mantenimiento              -> seguimiento, casos nuevos, mejora continua
```

## Que entregar al cerrar una etapa

Cerrar una etapa formalmente, aunque sea de forma breve, evita perder contexto entre bloques de trabajo. El cierre minimo de cualquier etapa relevante deberia incluir:

```txt
[ ] Resumen de los cambios realizados.
[ ] Lista de archivos creados o modificados.
[ ] Riesgos detectados (aunque no se hayan resuelto).
[ ] Validaciones realizadas (y cuales quedaron pendientes).
[ ] Proximos pasos recomendados.
```

No hace falta un documento extenso: un bloque corto en el chat o un commit bien descripto alcanza para cambios chicos. Para bloques grandes o cierres de modulo conviene dejarlo escrito en `docs/` (decisiones, roadmap o handoff).

## Handoff entre etapas, IAs o personas

El handoff es el "resumen de arranque" que le permite a quien sigue (otra persona, otra IA, o el mismo equipo en un chat nuevo) retomar sin tener que releer todo el historial.

Un buen handoff incluye:

- en que estado quedo el proyecto o modulo;
- que se hizo en el ultimo bloque (resumen corto, no el detalle completo);
- que quedo pendiente y por que;
- que riesgos o decisiones siguen abiertas;
- que documentos o commits revisar para mas contexto;
- cual es el siguiente paso recomendado.

Buenas practicas:

- mantenerlo corto (un handoff de varias paginas deja de ser util);
- actualizarlo al cerrar bloques importantes, no despues de cada cambio chico;
- evitar pegar historiales completos: lo que importa es el estado actual y lo que sigue;
- usarlo como punto de entrada al abrir un chat nuevo o al pasar el trabajo a otra IA.

# 37. Aprendizajes y convenciones — caso VTEX Control Center

Esta seccion resume los aprendizajes concretos que dejo este proyecto y que sirven como referencia para iniciativas similares (frontend estatico + middleware tipo Apps Script + planilla como base de datos liviana).

## Versionado embebido en config

Mantener la version, fecha y descripcion del cambio principal directamente en el archivo de configuracion del frontend (`config.js`), sincronizada con un changelog dentro del mismo archivo, funciono bien porque:

- la version queda visible para el usuario final (badge en el front) sin depender de procesos externos;
- obliga a describir el cambio principal en una frase clara antes de cerrar el commit;
- evita que el changelog quede desactualizado respecto del codigo publicado.

Regla aplicada: todo cambio funcional bumpea version (minor para modulos/features nuevas, patch para fixes y mejoras de UX, major para cambios de arquitectura, sin bump para documentacion).

## Arquitectura en capas con credenciales aisladas

Separar siempre frontend (sin credenciales) -> middleware (resuelve credenciales y llama a la API externa) -> servicio externo demostro ser robusto para este tipo de herramientas internas. Aprendizajes puntuales:

- el frontend solo necesita conocer un identificador logico (`storeId`), nunca claves;
- centralizar la resolucion de credenciales en una sola funcion del middleware (`getConfig_(storeId)`) permite agregar cuentas nuevas sin tocar el resto del codigo;
- mantener una clave compartida fuera del esquema con prefijo (`LOG_SPREADSHEET_ID`) cuando un recurso es comun a todas las cuentas, en vez de duplicarlo por cuenta.

## Patron reutilizable multi-cuenta (multi-store)

Cuando una herramienta debe operar sobre varias cuentas o entornos con la misma logica, conviene:

- definir las cuentas disponibles en un array simple en la config del frontend (`STORES = [{id, label}]`), sin credenciales;
- centralizar el estado de "cuenta activa" en una sola capa compartida (helpers `getActiveStore` / `setActiveStore` sobre `sessionStorage`), para que todos los modulos lo usen igual;
- inyectar el identificador de cuenta automaticamente en cada llamada al backend desde una funcion comun (`callApi`), en vez de que cada modulo lo agregue por su cuenta;
- propagar ese identificador hasta los logs, para poder auditar que cambios se hicieron sobre que cuenta;
- resetear el estado del modulo y pedir confirmacion al cambiar de cuenta si hay datos cargados sin guardar.

Agregar una cuenta nueva deberia requerir solo: nuevas variables de configuracion con prefijo + una entrada en el array de cuentas. Sin tocar el resto del codigo. Ese es el criterio para validar que el patron esta bien aplicado.

## Trazabilidad: logs y backups antes de escribir

Para cualquier operacion que modifique datos reales (update, delete, bulk):

- guardar un snapshot completo del estado anterior (`PRE_UPDATE` / `*_backup`) antes de ejecutar el cambio, en una hoja separada de la del log de cambios campo por campo;
- registrar cada cambio individual con: usuario, cuenta/tienda, identificador de la entidad, campo, valor anterior, valor nuevo y resultado;
- incluir siempre una columna de cuenta/tienda en los logs cuando el proyecto sea multi-cuenta, para poder filtrar y auditar por entorno;
- separar la hoja de "ejecuciones" (resumen de cada corrida: inicio, fin, totales, errores) de la hoja de "errores" (detalle con stack trace), ambas genericas y compartidas entre modulos.

Este patron de "backup + log de campo + ejecucion + error" se repitio en cada modulo de escritura (categorias, marcas, colecciones) y permitio auditar y revertir cambios sin sobreingenieria.

## Verificar contratos externos antes de asumirlos

Aprendizaje puntual del modulo de productos similares: se asumio que existia un endpoint para resolver SKUs de un producto (`/product/{id}/skus`) y no existia en la API real. La solucion fue obtener esos datos de un endpoint que ya se usaba para otra cosa (`items[].itemId` de la busqueda de productos), evitando llamadas adicionales.

Regla derivada: antes de diseñar un flujo sobre una API externa, confirmar que los endpoints asumidos existen y devuelven lo esperado (con una llamada real o documentacion oficial), en vez de darlo por sentado durante el diseño tecnico. Si el endpoint no existe, revisar primero si los datos necesarios ya estan disponibles en llamadas que el flujo va a hacer de todas formas.

## Componentes compartidos por convencion

Construir un componente una sola vez y reutilizarlo por convencion (no por copia/pegado) redujo el costo de sumar modulos nuevos. Ejemplo: la fila de seleccion de cuenta (`store-row`) se definio una vez en el JS y CSS compartidos, y cada modulo nuevo solo necesita agregar el contenedor en su HTML y llamar a la funcion de render. Mismo criterio aplica para el chip de usuario y las restricciones de escritura por rol.

# 38. Nota final

Esta metodologia debe adaptarse a cada proyecto, equipo y contexto.

Sin embargo, siempre conviene mantener:

- trabajo incremental;
- validacion;
- documentacion;
- trazabilidad;
- claridad de alcance;
- contexto compartido;
- optimizacion de tokens;
- separacion entre auditoria, implementacion y release;
- uso responsable de IA;
- criterio humano en decisiones finales.

La calidad del resultado depende tanto de la IA como de la claridad metodologica del equipo.

Un proyecto asistido por IA funciona mejor cuando:

- el alcance esta claro;
- la documentacion se mantiene actualizada;
- las decisiones quedan trazadas;
- las validaciones son parte del flujo;
- el contexto institucional se reutiliza;
- el equipo humano conserva la decision final.

La IA no reemplaza al equipo: ayuda a ordenar, acelerar, validar y documentar mejor el trabajo.
