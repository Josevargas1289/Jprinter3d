import Field from './Field';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import {
  MARKET_UPDATED_AT,
  MATERIAL_OPTIONS,
  MATERIALS,
  MODEL_COMPLEXITY_OPTIONS,
  PRICE_TYPE_OPTIONS,
  PRINT_MODE_OPTIONS,
  QUICK_PRESETS,
  ROUND_OPTIONS,
} from '../constants/materials';

export default function CalculatorForm({ calculator }) {
  const { form, updateField, updateMaterialType, applyPreset, applyMarketRates, resetForm, clearAll } = calculator;
  const material = MATERIALS[form.materialType] || MATERIALS.PLA;

  return (
    <section className="tool-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">Cotizador inteligente</p>
          <h2 className="mt-1 text-xl font-black text-[var(--text)] sm:text-2xl">Datos mínimos para precio real</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Ingresa material, gramos y horas del slicer. El sistema cruza tus costos con referencias de mercado Colombia.
          </p>
        </div>
        <button type="button" onClick={() => applyMarketRates()} className="btn-secondary shrink-0">
          Usar mercado {MARKET_UPDATED_AT}
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {Object.entries(QUICK_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            onClick={() => applyPreset(key)}
            className={`preset-card ${
              form.materialType === preset.values.materialType && Number(form.targetMargin) === preset.values.targetMargin
                ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            <span className="text-sm font-black text-[var(--text)]">{preset.label}</span>
            <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">{preset.description}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pieza" hint="sale en la cotización">
            <TextInput id="quoteName" value={form.quoteName} onChange={(value) => updateField('quoteName', value)} placeholder="Ej. Soporte de montaje" />
          </Field>
          <Field label="Cliente" hint="opcional">
            <TextInput id="clientName" value={form.clientName} onChange={(value) => updateField('clientName', value)} placeholder="Nombre del cliente" />
          </Field>
          <Field label="Material" hint="actualiza costos base">
            <SelectInput id="materialType" value={form.materialType} onChange={updateMaterialType} options={MATERIAL_OPTIONS} />
          </Field>
          <Field label="Cantidad" hint="unidades">
            <NumberInput id="quantity" value={form.quantity} onChange={(value) => updateField('quantity', value)} min={1} step="1" />
          </Field>
          <Field label="Filamento del slicer" hint="g por unidad">
            <NumberInput id="usedGrams" value={form.usedGrams} onChange={(value) => updateField('usedGrams', value)} />
          </Field>
          <Field label="Tiempo del slicer" hint="horas por unidad">
            <NumberInput id="printHours" value={form.printHours} onChange={(value) => updateField('printHours', value)} step="0.1" />
          </Field>
        </div>

        <div className="market-note">
          <p className="text-sm font-black text-[var(--text)]">{material.label} de referencia</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <MarketDatum label="Rollo" value={`$${material.marketRollPrice.toLocaleString('es-CO')}`} />
            <MarketDatum label="Servicio" value={`$${material.marketGramPrice}/g`} />
            <MarketDatum label="Máquina" value={`$${material.marketMinuteRate}/min`} />
            <MarketDatum label="Riesgo" value={`${material.failureRate}%`} />
          </dl>
          <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{material.note}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Complejidad">
          <SelectInput id="modelComplexity" value={form.modelComplexity || 'medium'} onChange={(value) => updateField('modelComplexity', value)} options={MODEL_COMPLEXITY_OPTIONS} />
        </Field>
        <Field label="Calidad">
          <SelectInput id="printMode" value={form.printMode || 'standard'} onChange={(value) => updateField('printMode', value)} options={PRINT_MODE_OPTIONS} />
        </Field>
        <Field label="Precio visible">
          <SelectInput id="priceType" value={form.priceType} onChange={(value) => updateField('priceType', value)} options={PRICE_TYPE_OPTIONS} />
        </Field>
        <Field label="Redondeo">
          <SelectInput id="roundTo" value={form.roundTo} onChange={(value) => updateField('roundTo', value)} options={ROUND_OPTIONS} />
        </Field>
      </div>

      {form.priceType === 'custom' ? (
        <div className="mt-4 max-w-sm">
          <Field label="Precio personalizado" hint="COP por unidad">
            <NumberInput id="customPrice" value={form.customPrice} onChange={(value) => updateField('customPrice', value)} />
          </Field>
        </div>
      ) : null}

      <details className="mt-5 details-panel">
        <summary className="cursor-pointer select-none text-sm font-black text-[var(--text)]">Costos y operación</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Costo del rollo" hint="COP">
            <NumberInput id="rollPrice" value={form.rollPrice} onChange={(value) => updateField('rollPrice', value)} />
          </Field>
          <Field label="Peso del rollo" hint="g">
            <NumberInput id="rollWeight" value={form.rollWeight} onChange={(value) => updateField('rollWeight', value)} />
          </Field>
          <Field label="Valor kWh" hint="COP">
            <NumberInput id="kwhPrice" value={form.kwhPrice} onChange={(value) => updateField('kwhPrice', value)} />
          </Field>
          <Field label="Potencia" hint="W">
            <NumberInput id="printerPower" value={form.printerPower} onChange={(value) => updateField('printerPower', value)} />
          </Field>
          <Field label="Máquina" hint="COP/hora">
            <NumberInput id="machineHour" value={form.machineHour} onChange={(value) => updateField('machineHour', value)} />
          </Field>
          <Field label="Mano de obra" hint="COP/hora">
            <NumberInput id="laborRate" value={form.laborRate} onChange={(value) => updateField('laborRate', value)} />
          </Field>
          <Field label="Preparación" hint="min">
            <NumberInput id="setupMinutes" value={form.setupMinutes} onChange={(value) => updateField('setupMinutes', value)} step="1" />
          </Field>
          <Field label="Postproceso" hint="min">
            <NumberInput id="postProcessMinutes" value={form.postProcessMinutes} onChange={(value) => updateField('postProcessMinutes', value)} step="1" />
          </Field>
          <Field label="Infill" hint="%">
            <NumberInput id="infillDensity" value={form.infillDensity} onChange={(value) => updateField('infillDensity', value)} min={1} step="1" />
          </Field>
          <Field label="Desperdicio" hint="%">
            <NumberInput id="wastePercent" value={form.wastePercent} onChange={(value) => updateField('wastePercent', value)} min={0} step="1" />
          </Field>
          <Field label="Riesgo/fallas" hint="%">
            <NumberInput id="failureRate" value={form.failureRate} onChange={(value) => updateField('failureRate', value)} min={0} step="1" />
          </Field>
          <Field label="Extras" hint="empaque/acabados">
            <NumberInput id="extras" value={form.extras} onChange={(value) => updateField('extras', value)} />
          </Field>
          <Field label="Margen objetivo" hint="%">
            <NumberInput id="targetMargin" value={form.targetMargin} onChange={(value) => updateField('targetMargin', value)} min={12} step="1" />
          </Field>
        </div>
      </details>

      <details className="mt-4 details-panel">
        <summary className="cursor-pointer select-none text-sm font-black text-[var(--text)]">Datos del documento</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Negocio">
            <TextInput id="businessName" value={form.businessName} onChange={(value) => updateField('businessName', value)} placeholder="Ej. JPrinter3D" />
          </Field>
          <Field label="Contacto">
            <TextInput id="contactInfo" value={form.contactInfo} onChange={(value) => updateField('contactInfo', value)} placeholder="WhatsApp, correo o Instagram" />
          </Field>
          <Field label="Tipo de documento">
            <SelectInput
              id="documentType"
              value={form.documentType || 'quote'}
              onChange={(value) => updateField('documentType', value)}
              options={[
                { label: 'Cotización', value: 'quote' },
                { label: 'Factura', value: 'invoice' },
              ]}
            />
          </Field>
          <Field label="Entrega estimada" hint="días">
            <NumberInput id="deliveryDays" value={form.deliveryDays} onChange={(value) => updateField('deliveryDays', value)} min={0} step="1" />
          </Field>
          <Field label="Vigencia" hint="días">
            <NumberInput id="validityDays" value={form.validityDays} onChange={(value) => updateField('validityDays', value)} min={0} step="1" />
          </Field>
          <Field label="Forma de entrega">
            <TextInput id="deliveryMethod" value={form.deliveryMethod} onChange={(value) => updateField('deliveryMethod', value)} placeholder="Domicilio o retiro" />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Field label="Condiciones de pago">
            <TextAreaInput id="paymentTerms" value={form.paymentTerms} onChange={(value) => updateField('paymentTerms', value)} placeholder="Ej. 50% de anticipo y 50% contra entrega" rows={3} />
          </Field>
          <Field label="Observaciones">
            <TextAreaInput id="notes" value={form.notes} onChange={(value) => updateField('notes', value)} placeholder="Ej. Incluye empaque sencillo y revisión final" rows={3} />
          </Field>
        </div>
      </details>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={resetForm} className="btn-secondary">
          Restablecer
        </button>
        <button type="button" onClick={clearAll} className="btn-danger">
          Limpiar todo
        </button>
      </div>
    </section>
  );
}

function MarketDatum({ label, value }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
      <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</dt>
      <dd className="mt-1 font-black text-[var(--text)]">{value}</dd>
    </div>
  );
}
