import Field from './Field';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
import { MARKET_UPDATED_AT, MATERIAL_OPTIONS, MATERIALS, MODEL_COMPLEXITY_OPTIONS, PRINT_MODE_OPTIONS, ROUND_OPTIONS } from '../constants/materials';
import { formatCurrency } from '../utils/format';

export default function CalculatorForm({ calculator }) {
  const { form, updateField, updateMaterialType, applyMarketRates, resetForm, clearAll } = calculator;
  const material = MATERIALS[form.materialType] || MATERIALS.PLA;
  const number = (name, props = {}) => <NumberInput id={name} value={form[name]} onChange={(value) => updateField(name, value)} {...props} />;
  const select = (name, options) => <SelectInput id={name} value={form[name]} onChange={(value) => updateField(name, value)} options={options} />;

  return (
    <section className="calculator-column" aria-labelledby="project-heading">
      <div className="column-heading"><span className="step-number">01</span><div><p className="eyebrow">Comencemos</p><h2 id="project-heading">Detalles del proyecto</h2></div></div>
      <div className="form-section">
        <Field label="Nombre de la pieza"><TextInput id="quoteName" value={form.quoteName} onChange={(value) => updateField('quoteName', value)} placeholder="Ej. Soporte para escritorio" /></Field>
        <div className="field-grid two">
          <Field label="Material"><SelectInput id="materialType" value={form.materialType} onChange={updateMaterialType} options={MATERIAL_OPTIONS} /></Field>
          <Field label="Cantidad" hint="unidades">{number('quantity', { min: 1, step: '1' })}</Field>
        </div>
        <div className="field-grid two">
          <Field label="Peso por pieza" hint="gramos">{number('usedGrams')}</Field>
          <Field label="Tiempo de impresión" hint="horas por pieza">{number('printHours', { step: '0.1' })}</Field>
        </div>
        <div className="material-reference"><span className="reference-mark" aria-hidden="true">↗</span><div><strong>{material.label} · {formatCurrency(material.marketRollPrice)}/kg</strong><span>Base de referencia Colombia · {MARKET_UPDATED_AT}</span></div><button type="button" onClick={() => applyMarketRates()} title="Restaurar valores de mercado">Actualizar</button></div>
      </div>

      <div className="form-section bordered">
        <div className="section-title"><h3>Ajustes de impresión</h3><span>Opcional</span></div>
        <div className="field-grid two">
          <Field label="Complejidad">{select('modelComplexity', MODEL_COMPLEXITY_OPTIONS)}</Field>
          <Field label="Acabado">{select('printMode', PRINT_MODE_OPTIONS)}</Field>
        </div>
      </div>

      <details className="disclosure"><summary>Costos de producción <span>Personalizar</span></summary>
        <div className="disclosure-body field-grid two">
          <Field label="Rollo" hint="COP">{number('rollPrice')}</Field><Field label="Peso del rollo" hint="g">{number('rollWeight')}</Field>
          <Field label="Electricidad" hint="COP/kWh">{number('kwhPrice')}</Field><Field label="Potencia" hint="W">{number('printerPower')}</Field>
          <Field label="Máquina" hint="COP/h">{number('machineHour')}</Field><Field label="Mano de obra" hint="COP/h">{number('laborRate')}</Field>
          <Field label="Preparación" hint="min">{number('setupMinutes')}</Field><Field label="Postproceso" hint="min">{number('postProcessMinutes')}</Field>
          <Field label="Desperdicio" hint="%">{number('wastePercent')}</Field><Field label="Riesgo de falla" hint="%">{number('failureRate')}</Field>
          <Field label="Infill" hint="%">{number('infillDensity')}</Field><Field label="Extras" hint="COP">{number('extras')}</Field>
          <Field label="Margen objetivo" hint="%">{number('targetMargin')}</Field><Field label="Redondeo">{select('roundTo', ROUND_OPTIONS)}</Field>
        </div>
      </details>

      <details className="disclosure"><summary>Datos de la cotización <span>Personalizar</span></summary>
        <div className="disclosure-body field-grid two">
          <Field label="Cliente"><TextInput id="clientName" value={form.clientName} onChange={(value) => updateField('clientName', value)} placeholder="Nombre del cliente" /></Field>
          <Field label="Negocio"><TextInput id="businessName" value={form.businessName} onChange={(value) => updateField('businessName', value)} /></Field>
          <Field label="Contacto"><TextInput id="contactInfo" value={form.contactInfo} onChange={(value) => updateField('contactInfo', value)} /></Field>
          <Field label="Documento">{select('documentType', [{ value: 'quote', label: 'Cotización' }, { value: 'invoice', label: 'Factura' }])}</Field>
          <Field label="Entrega" hint="días">{number('deliveryDays')}</Field><Field label="Vigencia" hint="días">{number('validityDays')}</Field>
          <Field label="Forma de entrega"><TextInput id="deliveryMethod" value={form.deliveryMethod} onChange={(value) => updateField('deliveryMethod', value)} /></Field>
          <Field label="Condiciones de pago"><TextInput id="paymentTerms" value={form.paymentTerms} onChange={(value) => updateField('paymentTerms', value)} /></Field>
          <div className="span-two"><Field label="Observaciones"><TextAreaInput id="notes" value={form.notes} onChange={(value) => updateField('notes', value)} rows={3} /></Field></div>
        </div>
      </details>
      <div className="form-actions"><button type="button" onClick={resetForm}>Restablecer valores</button><button type="button" onClick={clearAll}>Limpiar todo</button></div>
    </section>
  );
}
