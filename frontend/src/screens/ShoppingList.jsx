/* Din lista (Inköpslista) — web layout, guest login prompt. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button, Input } from "../design-system/components.jsx";

const { Icon, metaOf, pressHandlers, SaveChip, PageContainer, SmartListCard } = A;

function ListRow({ item, favorites, onToggle, onRemove, onOpen }) {
  const product = K.productById(item.productId);
  const scope = favorites.filter((id) => K.availableStoreIds(product).includes(id));
  const best = K.bestVariant(product, scope.length ? scope : K.availableStoreIds(product));
  const m = best ? metaOf(best.storeId) : A.STORE_META.ica;
  const store = best ? K.storeById(best.storeId) : null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-surface)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-card)", padding: 10, opacity: item.checked ? 0.55 : 1, transition: "opacity var(--duration-fast) var(--ease-standard)" }}>
      <button onClick={() => onToggle(item.productId)} aria-label="Bocka av" style={{ width: 26, height: 26, flexShrink: 0, borderRadius: "50%", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", background: item.checked ? "var(--green-800)" : "transparent", border: item.checked ? "none" : "1.5px solid var(--border-strong)" }}>
        {item.checked ? <Icon name="check" size={15} color="var(--cream-050)" /> : null}
      </button>
      <button onClick={() => onOpen(product)} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
        <div style={{ width: 48, height: 48, flexShrink: 0 }}><A.ImageTile product={product} full radius="var(--radius-sm)" /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: "var(--text-body-md)", fontWeight: 500, color: "var(--ink-900)", textDecoration: item.checked ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</div>
          {store ? <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}><span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>{m.label} {store.short}</span></div> : null}
        </div>
      </button>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ font: "var(--text-display-sm)", color: "var(--green-800)" }}>{best ? best.variant.price : "–"}</div>
      </div>
      <button onClick={() => onRemove(item.productId)} aria-label="Ta bort" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 4, flexShrink: 0 }}><Icon name="trash" size={18} /></button>
    </div>
  );
}

function ShoppingList({ list, favorites, authed, onToggle, onRemove, onAdd, onOpen, onBrowse, onLogin }) {
  const [addOpen, setAddOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  let total = 0, worstTotal = 0;
  const stores = new Set();
  list.forEach((it) => {
    const p = K.productById(it.productId);
    const scope = favorites.filter((id) => K.availableStoreIds(p).includes(id));
    const b = K.bestVariant(p, scope.length ? scope : K.availableStoreIds(p));
    const w = K.worstVariant(p, scope.length ? scope : K.availableStoreIds(p));
    if (b) { total += b.val; stores.add(b.storeId); }
    if (w) worstTotal += w.val;
  });
  const savings = worstTotal - total;
  const checkedCount = list.filter((i) => i.checked).length;

  const inList = new Set(list.map((i) => i.productId));
  const addable = K.PRODUCTS.filter((p) => !inList.has(p.id) && (!q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())));

  return (
    <PageContainer max={980}>
      <A.PageHeader
        title="Din lista"
        sub={list.length ? `${list.length} varor · ${checkedCount} avbockade` : "Samla veckans varor och se var de är billigast"}
        right={list.length ? <button onClick={() => setAddOpen(true)} {...pressHandlers()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--green-800)", color: "var(--cream-050)", border: "none", borderRadius: "var(--radius-md)", padding: "11px 16px", cursor: "pointer", font: "var(--text-label-md)" }}><Icon name="plus" size={18} color="var(--cream-050)" /> Lägg till vara</button> : null}
      />

      {list.length === 0 ? (
        <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: "56px 24px", textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <span style={{ width: 64, height: 64, borderRadius: "var(--radius-lg)", background: "var(--cream-100)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Icon name="list" size={30} color="var(--ink-300)" /></span>
          <h2 style={{ font: "var(--text-h3)", color: "var(--ink-900)", margin: "0 0 6px" }}>Din lista är tom</h2>
          <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: "0 0 20px", textWrap: "pretty" }}>Lägg till varor från veckans erbjudanden så räknar vi ut var de är billigast.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <div {...pressHandlers()}><Button variant="accent" size="lg" onClick={onBrowse}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="tag" size={18} color="var(--green-900)" /> Bläddra bland erbjudanden</span></Button></div>
          </div>
          {!authed ? <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: "18px 0 0" }}>Vill du spara listan mellan besök? <button onClick={onLogin} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)", padding: 0 }}>Logga in</button></p> : null}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 24, alignItems: "start" }} className="kp-list-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
            {!authed ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--yellow-100)", border: "1px solid var(--yellow-500)", borderRadius: "var(--radius-md)", padding: "12px 14px", marginBottom: 4 }}>
                <Icon name="lock" size={18} color="var(--green-800)" />
                <span style={{ flex: 1, font: "var(--text-body-sm)", color: "var(--ink-900)", textWrap: "pretty" }}>Den här listan sparas bara på den här enheten. Logga in så följer den med.</span>
                <button onClick={onLogin} style={{ border: "none", background: "var(--green-800)", color: "var(--cream-050)", borderRadius: "var(--radius-pill)", padding: "8px 14px", cursor: "pointer", font: "var(--text-label-sm)", flexShrink: 0 }}>Logga in</button>
              </div>
            ) : null}
            {list.map((it) => <ListRow key={it.productId} item={it} favorites={favorites} onToggle={onToggle} onRemove={onRemove} onOpen={onOpen} />)}
          </div>

          {/* summary rail */}
          <div style={{ position: "sticky", top: 16, display: "flex", flexDirection: "column", gap: 16 }} className="kp-list-rail">
            <div style={{ background: "var(--green-800)", borderRadius: "var(--radius-lg)", padding: 20, color: "var(--cream-050)" }}>
              <div style={{ font: "var(--text-label-sm)", color: "var(--cream-100)", marginBottom: 2 }}>Billigast totalt</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ font: "var(--text-display-lg)", color: "var(--cream-050)" }}>{K.fmt(total)}</span>
                <span style={{ font: "var(--text-label-md)", color: "var(--cream-100)" }}>kr</span>
              </div>
              {savings > 0.001 ? <div style={{ marginTop: 12 }}><SaveChip tone="best">Du sparar {K.fmt(savings)} kr</SaveChip></div> : null}
              <div style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", marginTop: 14, display: "flex", alignItems: "center", gap: 6, paddingTop: 14, borderTop: "1px solid color-mix(in srgb, var(--cream-100) 22%, transparent)" }}>
                <Icon name="store" size={15} color="var(--cream-100)" /> Fördelat på {stores.size} butik{stores.size > 1 ? "er" : ""}
              </div>
            </div>
            <SmartListCard onClick={onBrowse} />
          </div>
        </div>
      )}

      {/* add-vara sheet */}
      <A.Sheet open={addOpen} onClose={() => setAddOpen(false)} title="Lägg till vara">
        <div style={{ marginBottom: 14 }}><Input placeholder="Sök vara" size="lg" value={q} onChange={(e) => setQ(e.target.value)} icon={<Icon name="search" size={18} color="var(--text-secondary)" />} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {addable.map((p) => {
            const b = K.bestVariant(p, favorites.filter((id) => K.availableStoreIds(p).includes(id)));
            return (
              <button key={p.id} onClick={() => { onAdd(p.id); setAddOpen(false); setQ(""); }} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: 10, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 44, height: 44, flexShrink: 0 }}><A.ImageTile product={p} full radius="var(--radius-sm)" /></div>
                <span style={{ flex: 1, font: "var(--text-body-md)", color: "var(--ink-900)" }}>{p.name}</span>
                <span style={{ font: "var(--text-display-sm)", color: "var(--green-800)" }}>{b ? b.variant.price : "–"}</span>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="plus" size={16} color="var(--cream-050)" /></span>
              </button>
            );
          })}
          {addable.length === 0 ? <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", textAlign: "center", padding: 20 }}>Inga fler varor att lägga till.</p> : null}
        </div>
      </A.Sheet>
    </PageContainer>
  );
}

export default ShoppingList;
