import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, Menu, MessageCircle, Minus, Moon, Plus, ShoppingBag, Sun, X } from 'lucide-react'

const products = [
  { id: 'hd-2026', category: 'Camisetas', name: 'Camiseta HD 2026', detail: 'Camiseta blanca · gráfico rojo', description: 'Primer plano de una camiseta blanca con gráfico rojo Harley-Davidson.', image: '/images/camiseta-hd-2026.jpg', imagePosition: 'center 58%', code: 'EM-01' },
  { id: 'royal-enfield', category: 'Camisetas', name: 'Royal Enfield Vintage', detail: 'Camiseta negra · lettering rojo', description: 'Camiseta negra con lettering Royal Enfield en rojo, fotografiada en plano.', image: '/images/royal-enfield.jpg', imagePosition: 'center 52%', code: 'EM-02' },
  { id: 'eagle-edition', category: 'Camisetas', name: 'Eagle Edition', detail: 'Camiseta gráfica · águila', description: 'Detalle de gráfico de águila en tonos oscuros sobre tela clara.', image: '/images/eagle-edition.jpg', imagePosition: 'center 48%', code: 'EM-03' },
  { id: 'palo-rosa', category: 'Camisetas', name: 'Gráfico sobre palo de rosa', detail: 'Camiseta palo de rosa · gráfico rojo', description: 'Detalle de camiseta palo de rosa con gráfico rojo de inspiración motera.', image: '/images/camiseta-palo-rosa.jpg', imagePosition: 'center 63%', code: 'EM-04' },
  { id: 'factory-tee', category: 'Camisetas', name: 'Factory Racing', detail: 'Camiseta negra · gráfica frontal', description: 'Camiseta negra mostrada de frente, con gráfica Factory Racing y bandera en la manga.', image: '/images/camiseta-factory.jpg', imagePosition: 'center 48%', code: 'EM-05' },
  { id: 'factory-buzo', category: 'Busos', name: 'Buzo Factory Racing', detail: 'Buzo negro · gráfica pecho y mangas', description: 'Buzo negro con gráfica racing en pecho y mangas, fotografiado en uso.', image: '/images/buso-racing.jpg', imagePosition: 'center 40%', code: 'EM-06' },
]
const categories = ['Todos', 'Camisetas', 'Busos']

function quoteLink(message) {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')
  const recipient = phone ? `https://wa.me/${phone}` : 'https://wa.me/'
  return `${recipient}?text=${encodeURIComponent(message)}`
}

function readStorage(key, fallback) {
  try { return window.localStorage.getItem(key) ?? fallback } catch { return fallback }
}

function App() {
  const [theme, setTheme] = useState(() => readStorage('estampamos-theme', 'dark'))
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(readStorage('estampamos-cart', '[]')) } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const visibleProducts = products.filter((product) => activeCategory === 'Todos' || product.category === activeCategory)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { window.localStorage.setItem('estampamos-theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    try { window.localStorage.setItem('estampamos-cart', JSON.stringify(cart)) } catch {}
  }, [cart])

  useEffect(() => {
    if (!cartOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    document.body.classList.add('cart-visible')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('cart-visible')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [cartOpen])

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(productId, amount) {
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  }

  function sendCart() {
    const items = cart.map((item) => `• ${item.name}: ${item.quantity} prenda(s)`).join('\n')
    const message = `Hola, quiero cotizar estas prendas:\n${items}\n\nPor favor compártanme precio, tallas disponibles y tiempos.`
    window.open(quoteLink(message), '_blank', 'noopener,noreferrer')
  }

  function submitCustomQuote(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name') || 'Hola'
    const details = data.get('details') || 'Quiero personalizar unas prendas.'
    window.open(quoteLink(`${name}, quiero cotizar estampados personalizados. ${details}`), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="storefront" id="inicio">
      <div className="announcement"><span>ESTAMPADOS CON IDENTIDAD · MEDELLÍN, COLOMBIA</span><a href="#estampados">Descubre la colección <ArrowRight size={13} /></a></div>
      <header className="store-header">
        <a className="store-brand" href="#inicio" aria-label="Estampamos Medellín, inicio"><img src="/images/logo.jpg" alt="" /><span>ESTAMPAMOS<small>MEDELLÍN · COLOMBIA</small></span></a>
        <nav className={menuOpen ? 'store-nav is-open' : 'store-nav'} aria-label="Navegación principal">
          <a href="#estampados" onClick={() => setMenuOpen(false)}>Estampados</a><a href="#personaliza" onClick={() => setMenuOpen(false)}>Personaliza</a><a href="#empresas" onClick={() => setMenuOpen(false)}>Empresas</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" type="button" aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Abrir cotización, ${cartCount} prendas`}><ShoppingBag size={18} /><span>Mi cotización</span><b>{cartCount}</b></button>
          <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span /> DTF · SUBLIMACIÓN · BORDADO</p>
            <h1>Estampados<br />que hablan <em>por ti.</em></h1>
            <p className="hero-description">Diseños para llevar puestos. Prendas personalizadas, hechas con carácter en Medellín.</p>
            <div className="hero-ctas"><a className="primary-button" href="#estampados">Ver estampados <ArrowRight size={17} /></a><a className="quiet-link" href="#personaliza">Crea el tuyo <ArrowDownRight size={16} /></a></div>
            <div className="hero-caption"><span className="caption-index">01</span><span>DISEÑO REAL · PRENDA REAL</span><span className="caption-rule" /></div>
          </div>
          <div className="hero-stage">
            <img src="/images/camiseta-hd-2026.jpg" alt="Detalle del gráfico rojo estampado en una camiseta blanca" fetchPriority="high" />
            <div className="stage-gradient" /><div className="stage-edition"><span>ESTAMPADO</span><b>01 / 06</b></div>
            <div className="press-loader" aria-label="Animación de entrada inspirada en una prensa de estampado"><div><span className="press-dot" /> PREPARANDO LA PRENSA <b>LISTO</b></div><span className="press-track"><i /></span></div>
            <span className="stage-mark" aria-hidden="true">EM</span>
          </div>
          <span className="hero-vertical-note">HECHO PARA EXPRESARTE — 2026</span>
        </section>

        <section className="signal-bar" aria-label="Servicios de Estampamos Medellín"><div><span className="signal-icon"><Check size={16} /></span> Diseño personalizado</div><div><span className="signal-icon"><Check size={16} /></span> Calidad y cumplimiento</div><div><span className="signal-icon"><Check size={16} /></span> Medellín · Colombia</div></section>

        <section className="collection section-wrap" id="estampados">
          <div className="collection-heading"><div><p className="eyebrow"><span /> LA COLECCIÓN</p><h2>Estampados <em>para llevar.</em></h2></div><p className="collection-intro">Referencias de prendas y gráficos que ya salieron del taller. Elige una para cotizarla o úsala de punto de partida.</p></div>
          <div className="collection-toolbar">
            <div className="collection-filters" role="group" aria-label="Filtrar estampados por tipo de prenda">
              {categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'collection-filter is-active' : 'collection-filter'} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="collection-meta"><span>PRENDAS PERSONALIZADAS</span><span>{String(visibleProducts.length).padStart(2, '0')} REFERENCIAS</span></div>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id} style={{ '--card-index': index }}>
                <div className="product-photo"><img src={product.image} alt={product.description} loading={index < 2 ? 'eager' : 'lazy'} style={{ objectPosition: product.imagePosition }} /><span className="product-code">{product.code}</span><button className="add-button" type="button" onClick={() => addToCart(product)} aria-label={`Añadir ${product.name} a mi cotización`} title="Añadir a mi cotización"><Plus size={19} /></button></div>
                <div className="product-copy"><div><span className="product-detail">{product.detail}</span><h3>{product.name}</h3></div><button className="product-add-text" type="button" onClick={() => addToCart(product)}>Añadir <ArrowRight size={14} /></button></div>
                <p className="quote-only">Precio y disponibilidad por cotizar</p>
              </article>
            ))}
          </div>
        </section>

        <section className="custom-banner" id="personaliza"><div className="custom-inner section-wrap"><div className="custom-image"><img src="/images/camiseta-palo-rosa.jpg" alt="Detalle de camiseta palo de rosa con estampado rojo" loading="lazy" /><span>COLOR · GRÁFICA · PRENDA</span></div><div className="custom-copy"><p className="eyebrow"><span /> TU IDEA, TU ESTAMPADO</p><h2>No tiene que estar<br />en el catálogo.</h2><p>Un diseño propio, una camiseta favorita o una idea a medio hacer. Hablemos de qué quieres estampar y en qué prenda.</p><a className="outline-button" href="#cotizar">Cuéntanos tu idea <ArrowRight size={16} /></a></div></div></section>

        <section className="business section-wrap" id="empresas"><div className="business-content"><p className="eyebrow"><span /> PARA PERSONAS Y EMPRESAS</p><h2>Una prenda<br />también <em>representa.</em></h2><p>En el archivo hay ejemplos de camisetas estampadas y publicaciones de dotaciones empresariales. Cuéntanos qué necesita tu equipo y cotizamos el proyecto.</p><div className="business-tags"><span>DTF</span><span>Sublimación</span><span>Bordado</span><span>Uniformes</span></div><a className="primary-button" href={quoteLink('Hola, quiero cotizar estampados y dotaciones para mi empresa.')} target="_blank" rel="noreferrer">Cotizar para mi empresa <ArrowRight size={17} /></a></div><figure className="business-photo"><img src="/images/dotaciones.jpg" alt="Detalle de estampado tipográfico en una camiseta clara, fotografía publicada junto a servicios empresariales" loading="lazy" /><figcaption><span>TRABAJO PUBLICADO</span><span>MEDELLÍN · COLOMBIA</span></figcaption></figure></section>

        <section className="custom-quote" id="cotizar"><div className="custom-quote-inner section-wrap"><div><p className="eyebrow"><span /> COTIZACIÓN DIRECTA</p><h2>¿Qué quieres<br />estampar?</h2><p>Cuéntanos lo esencial. El equipo continúa la conversación contigo por WhatsApp.</p></div><form className="quote-form" onSubmit={submitCustomQuote}><label htmlFor="quote-name">Tu nombre</label><input id="quote-name" name="name" type="text" placeholder="¿Cómo te llamas?" autoComplete="name" /><label htmlFor="quote-details">Tu idea</label><textarea id="quote-details" name="details" rows="3" placeholder="Prenda, diseño y cantidad aproximada…" /><button className="primary-button" type="submit">Cotizar por WhatsApp <MessageCircle size={17} /></button></form></div></section>
      </main>

      <footer className="store-footer"><a className="store-brand" href="#inicio"><img src="/images/logo.jpg" alt="" /><span>ESTAMPAMOS<small>MEDELLÍN · COLOMBIA</small></span></a><p>Estampados DTF · Sublimación · Bordados</p><a href={quoteLink('Hola, quiero información sobre los estampados de Estampamos Medellín.')} target="_blank" rel="noreferrer">Hablemos <ArrowRight size={15} /></a></footer>

      {cartCount > 0 && !cartOpen && <button className="mobile-cart-bar" type="button" onClick={() => setCartOpen(true)}><ShoppingBag size={18} /><span>Ver cotización</span><b>{cartCount} {cartCount === 1 ? 'prenda' : 'prendas'}</b><ArrowRight size={17} /></button>}
      {cartOpen && <div className="cart-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="cart-head"><div><p className="eyebrow"><span /> TU SELECCIÓN</p><h2 id="cart-title">Mi cotización <small>({cartCount})</small></h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar cotización"><X size={20} /></button></div>
        {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={31} /><h3>Tu selección empieza aquí.</h3><p>Añade estampados del catálogo y te ayudamos a cotizarlos.</p><button className="outline-button" type="button" onClick={() => setCartOpen(false)}>Volver a estampados <ArrowRight size={15} /></button></div> : <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-copy"><span>{item.detail}</span><h3>{item.name}</h3><div className="quantity-stepper"><button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><b>{item.quantity}</b><button type="button" aria-label={`Añadir una unidad de ${item.name}`} onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div><button className="remove-item" type="button" aria-label={`Eliminar ${item.name}`} onClick={() => changeQuantity(item.id, -item.quantity)}><X size={16} /></button></article>)}</div><div className="cart-disclaimer">El precio y la disponibilidad se confirman al cotizar.</div><button className="primary-button cart-checkout" type="button" onClick={sendCart}>Enviar selección por WhatsApp <ArrowRight size={17} /></button><button className="continue-shopping" type="button" onClick={() => setCartOpen(false)}>Seguir viendo estampados</button></>}
      </section></div>}
    </div>
  )
}

export default App