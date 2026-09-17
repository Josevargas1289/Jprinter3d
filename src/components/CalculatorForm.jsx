import Field from './Field';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import { MATERIAL_OPTIONS, MATERIALS, PRICE_TYPE_OPTIONS, ROUND_OPTIONS } from '../constants/materials';

export default function CalculatorForm({ calculator }) {
  const { form, updateField, updateMaterialType, resetForm, clearAll } = calculator;

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black sm:text-2xl">Datos de la pieza</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Puedes ajustar costos, condiciones y el precio final que verá el cliente.</p>
        </div>
        <div className="hidden rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-3 py-2 text-xs text-[var(--muted)] sm:block">
          Guardado local automático
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Nombre del negocio" hint="sale en la cotización">
          <TextInput id="businessName" value={form.businessName} onChange={(value) => updateField('businessName', value)} placeholder="Ej. JPrinter3D" />
        </Field>
        <Field label="Subtítulo del negocio" hint="opcional">
          <TextInput
            id="businessSubtitle"
            value={form.businessSubtitle}
            onChange={(value) => updateField('businessSubtitle', value)}
            placeholder="Ej. Impresión 3D personalizada"
          />
        </Field>
        <Field label="Contacto" hint="teléfono, Instagram o correo">
          <TextInput id="contactInfo" value={form.contactInfo} onChange={(value) => updateField('contactInfo', value)} placeholder="Ej. WhatsApp 300..." />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre de la pieza" hint="sale en la cotización">
          <TextInput id="quoteName" value={form.quoteName} onChange={(value) => updateField('quoteName', value)} placeholder="Ej. Bowl decorativo" />
        </Field>
        <Field label="Cliente" hint="opcional">
          <TextInput id="clientName" value={form.clientName} onChange={(value) => updateField('clientName', value)} placeholder="Nombre del cliente" />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Tipo de documento" hint="cotización o factura">
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
        <Field label="Cantidad" hint="unidades">
          <NumberInput id="quantity" value={form.quantity} onChange={(value) => updateField('quantity', value)} min={1} step="1" />
        </Field>
        <Field label="Material" hint="ajusta watts sugeridos">
          <SelectInput id="materialType" value={form.materialType} onChange={updateMaterialType} options={MATERIAL_OPTIONS} />
          <p className="text-xs text-[var(--muted)]">{MATERIALS[form.materialType]?.note}</p>
        </Field>
        <Field label="Potencia promedio" hint="W">
          <NumberInput id="printerPower" value={form.printerPower} onChange={(value) => updateField('printerPower', value)} />
        </Field>
        <Field label="Precio para documento" hint="solo este verá el cliente">
          <SelectInput id="priceType" value={form.priceType} onChange={(value) => updateField('priceType', value)} options={PRICE_TYPE_OPTIONS} />
        </Field>
      </div>

      {form.priceType === 'custom' ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Precio personalizado" hint="COP por unidad">
            <NumberInput id="customPrice" value={form.customPrice} onChange={(value) => updateField('customPrice', value)} />
          </Field>
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Costo del rollo" hint="COP">
          <NumberInput id="rollPrice" value={form.rollPrice} onChange={(value) => updateField('rollPrice', value)} />
        </Field>
        <Field label="Peso del rollo" hint="g">
          <NumberInput id="rollWeight" value={form.rollWeight} onChange={(value) => updateField('rollWeight', value)} />
        </Field>
        <Field label="Filamento usado" hint="g por unidad">
          <NumberInput id="usedGrams" value={form.usedGrams} onChange={(value) => updateField('usedGrams', value)} />
        </Field>
        <Field label="Tiempo de impresión" hint="horas por unidad">
          <NumberInput id="printHours" value={form.printHours} onChange={(value) => updateField('printHours', value)} step="0.1" />
        </Field>
        <Field label="Valor del kWh" hint="COP">
          <NumberInput id="kwhPrice" value={form.kwhPrice} onChange={(value) => updateField('kwhPrice', value)} />
        </Field>
        <Field label="Uso de máquina por hora" hint="COP">
          <NumberInput id="machineHour" value={form.machineHour} onChange={(value) => updateField('machineHour', value)} />
        </Field>
        <Field label="Extras" hint="empaque, lijado, etc.">
          <NumberInput id="extras" value={form.extras} onChange={(value) => updateField('extras', value)} />
        </Field>
        <Field label="Ganancia meta por rollo" hint="COP">
          <NumberInput id="targetProfit" value={form.targetProfit} onChange={(value) => updateField('targetProfit', value)} />
        </Field>
        <Field label="Redondeo" hint="precio final">
          <SelectInput id="roundTo" value={form.roundTo} onChange={(value) => updateField('roundTo', value)} options={ROUND_OPTIONS} />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Entrega estimada" hint="días">
          <NumberInput id="deliveryDays" value={form.deliveryDays} onChange={(value) => updateField('deliveryDays', value)} min={0} step="1" />
        </Field>
        <Field label="Vigencia de la cotización" hint="días">
          <NumberInput id="validityDays" value={form.validityDays} onChange={(value) => updateField('validityDays', value)} min={0} step="1" />
        </Field>
        <Field label="Forma de entrega" hint="opcional">
          <TextInput
            id="deliveryMethod"
            value={form.deliveryMethod}
            onChange={(value) => updateField('deliveryMethod', value)}
            placeholder="Ej. Domicilio o entrega en Cali"
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Field label="Condiciones de pago" hint="saldrán en la cotización">
          <TextAreaInput
            id="paymentTerms"
            value={form.paymentTerms}
            onChange={(value) => updateField('paymentTerms', value)}
            placeholder="Ej. 50% de anticipo y 50% contra entrega"
            rows={3}
          />
        </Field>
        <Field label="Observaciones" hint="saldrán en la cotización">
          <TextAreaInput
            id="notes"
            value={form.notes}
            onChange={(value) => updateField('notes', value)}
            placeholder="Ej. Incluye empaque sencillo"
            rows={3}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={resetForm}
          className="rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 font-semibold text-[var(--text)] transition hover:translate-y-[-1px]"
        >
          Restablecer valores
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 font-semibold text-rose-300 transition hover:translate-y-[-1px]"
        >
          Borrar formulario
        </button>
      </div>
    </section>
  );
}
