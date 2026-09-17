import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function safeFilePart(value, fallback) {
  return (
    String(value || fallback)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || fallback
  );
}

function buildFilename(form, suffix) {
  const piece = safeFilePart(form.quoteName, 'pieza');
  const client = safeFilePart(form.clientName, 'cliente');
  return `cotizacion-${piece}-${client}.${suffix}`;
}

function triggerDownload(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function renderQuote(quoteNode) {
  return html2canvas(quoteNode, {
    backgroundColor: '#ffffff',
    scale: Math.max(window.devicePixelRatio || 1, 2),
    useCORS: true,
    logging: false,
    allowTaint: true,
  });
}

export async function exportQuoteImage({ quoteNode, form }) {
  const canvas = await renderQuote(quoteNode);
  const dataUrl = canvas.toDataURL('image/png');
  triggerDownload(dataUrl, buildFilename(form, 'png'));
}

export async function exportQuotePdf({ quoteNode, form, results }) {
  const canvas = await renderQuote(quoteNode);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;
  const ratio = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
  const renderWidth = canvas.width * ratio;
  const renderHeight = canvas.height * ratio;
  const x = (pageWidth - renderWidth) / 2;
  const y = Math.max((pageHeight - renderHeight) / 2, margin);

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');

  const footer = form.businessName || 'JPrinter3D';
  pdf.setTextColor(71, 85, 105);
  pdf.setFontSize(8);
  pdf.text(`${footer} - Cotización ${results?.quoteNumber || 'N/A'} - Valores expresados en COP`, margin, pageHeight - 6);

  pdf.save(buildFilename(form, 'pdf'));
}
