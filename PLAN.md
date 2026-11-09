# Plan de implementación

## Objetivo

Crear una vitrina de comercio electrónico para Estampamos Medellín que permita descubrir prendas y servicios, y convertir el interés en una solicitud de cotización por WhatsApp.

## Experiencia implementada

- Interfaz mobile-first con React, Vite, Tailwind CSS y GSAP/ScrollTrigger; diseño negro/vinotinto, acentos tricolor, glassmorphism y tema claro/oscuro persistente.
- Copy con orgullo colombiano y voz de Medellín, sin afirmar precios, envíos ni capacidades no confirmadas.
- Hero fijado por scroll: “Los mejores” → “estampados” → “de Medellín” → llamada a cotizar. Tres fotografías reales acompañan la secuencia.
- Revelados al entrar en viewport para secciones y productos; desactivados cuando el dispositivo solicita movimiento reducido.
- Catálogo basado en fotografías del ZIP y descripciones limitadas a lo que se ve en las imágenes.
- Filtros para camisetas y buzos; cesta de cotización con cantidades, edición y envío del resumen por WhatsApp.
- Sección para proyectos personalizados y dotaciones. La imagen empresarial se presenta como un detalle de estampado en camiseta, no como una foto de uniforme.
- No se publican precios, inventario, plazos garantizados ni testimonios que no aparecen en los materiales de origen.

## Para habilitar compra en línea

1. Confirmar el número de WhatsApp Business con indicativo de país para dirigir las cotizaciones al equipo correcto.
2. Recibir catálogo validado: referencias vigentes, tallas, colores, materiales, precios y fotografías aprobadas.
3. Definir cobertura, costos de envío, tiempos, cambios, garantías y política de tratamiento de datos.
4. Con esos datos, implementar carrito y checkout; integrar inventario y una pasarela de pago disponible en Colombia.
5. Probar el recorrido de compra en móvil y escritorio y publicar con dominio, analítica y metadatos definitivos.

## Criterio de aceptación

- La tienda compila y puede ejecutarse localmente.
- Catálogo, filtros, carrito, cantidades y selector de tema responden.
- Las cotizaciones incluyen el resumen de prendas y cantidades.
- El diseño se adapta a móvil y escritorio y reutiliza recursos entregados por la empresa.

## Plan de mejora máxima

### Fase 1: Narrativa y conversión

- Afinar ritmo y distancias del hero con pruebas reales de scroll en teléfonos pequeños, tablet y escritorio.
- Ajustar el balance del tricolor con el vinotinto de marca a partir de pruebas con clientes locales.
- Conectar el número oficial de WhatsApp Business y medir clics de hero, ficha y carrito.
- Reordenar la colección según ventas y campañas vigentes; usar fotos originales sin recortes que oculten las prendas.

### Fase 2: Rendimiento y accesibilidad

- Convertir fotografías a AVIF/WebP con tamaños responsive y dimensiones reservadas para reducir transferencia y CLS.
- Probar tabulación, foco del diálogo de cotización, contraste en ambos temas y etiquetas con lector de pantalla.
- Validar que ScrollTrigger se refresque al cambiar orientación y que el modo de movimiento reducido mantenga contenido y CTA visibles.

### Fase 3: Catálogo comercial

- Confirmar nombres, tallas, colores, tejidos, técnicas disponibles, precios, mínimos por pedido y disponibilidad.
- Añadir fichas completas y variantes reales solo cuando el negocio confirme la información.
- Incorporar búsqueda y filtros por tipo de producto, técnica, color y rango de precio si el inventario los soporta.

### Fase 4: Checkout y operación

- Definir despacho, cobertura, tiempos, cambios, garantías, privacidad y facturación.
- Implementar backend, persistencia de pedidos e inventario, además de pasarela de pago disponible en Colombia.
- Probar pedidos de extremo a extremo y publicar con dominio, analítica, SEO local y monitoreo.