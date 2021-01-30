import Vue from 'vue'
export const state = () => ({
  currency: {
    value: "$",
    label: "United State Dollar",
  },
  currencies: [
    {
      value: "₹",
      label: "India INR",
    },
    {
      value: "$",
      label: "United State Dollar",
    },
  ],
  invoiceFrom: '',
  invoiceTo: '',
  invoiceNote: '',
  tax: '',
  invoiceNumber: '',
})

export const mutations = {
  updateCurrency(state, value) {
    Vue.$cookies.set("currency", value);
    state.currency = value
  },
  updateInvoiceFrom(state, value) {
    Vue.$cookies.set("invoiceFrom", value)
    state.invoiceFrom = value
  },
  updateInvoiceTo(state, value) {
    Vue.$cookies.set("invoiceTo", value)
    state.invoiceTo = value
  },
  updateInvoiceNote(state, value) {
    Vue.$cookies.set("invoiceNote", value)
    state.invoiceNote = value
  },
  updateTax(state, value) {
    Vue.$cookies.set('tax', value)
    state.tax = value
  },
  updateInvoiceNumber(state, value) {
    Vue.$cookies.set('invoiceNumber', value)
    state.invoiceNumber = value
  }
}

export const getters = {
  currency: state => state.currency,
  currencies: state => state.currencies,
  invoiceFrom: state => state.invoiceFrom,
  invoiceTo: state => state.invoiceTo,
  invoiceNote: state => state.invoiceNote,
  tax: state => state.tax,
  invoiceNumber: state => state.invoiceNumber
}