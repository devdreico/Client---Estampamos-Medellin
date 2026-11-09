# Estampamos Medellín

Tienda mobile-first de estampados, construida con React, Vite y Tailwind CSS. Incluye catálogo filtrable, carrito de cotización por WhatsApp y selector persistente de tema oscuro/claro.

## Desarrollo local

```sh
npm install
npm run dev
```

## WhatsApp

Configura `VITE_WHATSAPP_NUMBER` con el número de WhatsApp Business en formato internacional, solo dígitos e incluyendo el indicativo de país. Por ejemplo, `573001234567` (reemplazar por el número real). Mientras no se configure, los botones abren WhatsApp con el mensaje listo para elegir destinatario.

Los productos se envían a cotizar porque las imágenes y publicaciones no incluyen precios ni inventario. Para activar pagos en línea se requieren referencias, precios, disponibilidad, políticas y una pasarela de pago.

Consulta [PLAN.md](PLAN.md) para el alcance implementado y siguientes pasos.