<template>
  <div class="bg-gray-100 overflow-x-hidden">
    <client-only>
      <div class="px-6 py-8">
        <div class="flex justify-between container mx-auto">
          <div class="w-full lg:w-8/12">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
                Invoice
              </h1>
              <div class="flex items-center">
                <div>
                  <v-select
                    :options="currencies"
                    :value="currency"
                    @input="$store.commit('updateCurrency', $event)"
                  >
                  </v-select>
                </div>
                <div class="flex ml-4" style="margin-top: 2px">
                  <input
                    v-model="tax"
                    class="px-4 w-24 rounded-l-md border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
                    style="padding-top: 5px; padding-bottom: 5px"
                  />
                  <button
                    class="px-4 inline-flex items-center rounded-r-md bg-yellow-400 text-gray-800 font-bold uppercase"
                    style="padding-top: 3px; padding-bottom: 3px"
                  >
                    %
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                <div class="flex justify-between items-start">
                  <div class="overflow-hidden relative w-64 mt-4 mb-4">
                    <img
                      src=""
                      alt=""
                      id="logo-preview"
                      class="h-32"
                      v-if="logoExists"
                    />
                    <button
                      v-else
                      class="w-32 h-32 text-gray-600 bg-gray-300 flex justify-center items-center rounded flex-col"
                      onClick="document.getElementById('logo').click()"
                    >
                      <svg
                        class="fill-current"
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                      </svg>
                      <!-- <span class="ml-2">LOGO</span> -->
                      <small>Upload Company Logo</small>
                    </button>
                    <button
                      type="button"
                      href=""
                      v-if="logoExists"
                      onClick="document.getElementById('logo').click()"
                      class="text-red-500 bg-gray-200 focus:outline-none hover:bg-gray-400 px-4 py-2"
                    >
                      Change Logo
                    </button>
                    <input
                      class="cursor-pointer hidden"
                      type="file"
                      ref="logo"
                      id="logo"
                      @change="uploadLogo()"
                    />
                  </div>
                  <!-- <div
                  class="w-32 h-32 bg-gray-300 flex justify-center items-center text-gray-600 rounded"
                >
                  Logo
                </div> -->
                  <div class="flex flex-col items-end">
                    <a href="#" class="text-gray-600 text-2xl">INVOICE</a>
                    <div
                      class="flex flex-wrap items-stretch w-full mb-4 relative"
                    >
                      <div class="flex -mr-px">
                        <span
                          class="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-gray-600 text-sm"
                          >#</span
                        >
                      </div>
                      <input
                        v-model="invoiceNumber"
                        type="text"
                        class="flex-shrink flex-grow flex-auto leading-normal w-32 flex-1 border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:outline-none"
                        placeholder="Invoice No."
                      />
                    </div>
                    <div class="flex flex-col justify-between">
                      <span class="text-xs text-gray-700">Invoice Date</span>
                      <input
                        type="date"
                        class="rounded flex-shrink flex-grow flex-auto leading-normal w-48 flex-1 border-0 h-4 focus:outline-none rounded-l-none relative mb-3"
                        placeholder="Date"
                        v-model="invoiceCurrentDate"
                      />
                      <span class="text-xs text-gray-700">Invoice Due</span>
                      <input
                        type="date"
                        class="rounded flex-shrink flex-grow flex-auto leading-normal w-48 flex-1 border-0 h-4 focus:outline-none rounded-l-none relative"
                        placeholder="Due Date"
                        v-model="invoiceDueDate"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-2 w-full flex justify-between">
                  <div class="w-1/2 pr-2">
                    <small>Invoice From</small>
                    <editor
                      :content="invoiceFrom"
                      @updated="invoiceDataUpdated('updateInvoiceFrom', $event)"
                    />
                  </div>
                  <div class="w-1/2 pl-2">
                    <small>Invoice To</small>
                    <editor
                      :content="invoiceTo"
                      @updated="invoiceDataUpdated('updateInvoiceTo', $event)"
                    />
                  </div>
                  <!-- <div class="w-2/3">

                </div> -->
                </div>
                <div class="flex justify-between items-center mt-4 mb-4">
                  <table class="w-full rounded">
                    <thead>
                      <tr class="text-left bg-gray-300 border uppercase">
                        <th class="px-2 py-2 text-gray-600">#</th>
                        <th class="text-sm text-gray-600">ITEM</th>
                        <th
                          class="md:table-cell text-sm text-gray-600 text-center"
                        >
                          QUANTITY
                        </th>
                        <th
                          class="md:table-cell text-sm text-gray-600 text-center"
                        >
                          RATE
                        </th>
                        <th
                          class="md:table-cell text-sm text-gray-600 text-right pr-4"
                        >
                          AMOUNT
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      <tr
                        v-for="item in invoiceItems"
                        :key="item.id"
                        class="accordion border-b border-grey-light hover:bg-gray-100 border"
                      >
                        <td class="px-3 py-4">
                          <span class="rounded">{{ item.id }}</span>
                        </td>
                        <td class="flex inline-flex items-center w-11/12">
                          <span class="py-3 w-full">
                            <p class="text-gray-800 text-sm">
                              <input
                                type="text"
                                v-model="item.description"
                                class="border p-2 w-full rounded h-8 focus:outline-none"
                              />
                            </p>
                          </span>
                        </td>
                        <td class="hidden md:table-cell text-center">
                          <p class="text-sm text-gray-800 font-medium">
                            <!-- <vue-numeric-input
                            v-model="item.quantity"
                            :min="1"
                            :max="1000"
                            :step="1"
                            :controls="false"
                          ></vue-numeric-input> -->
                            <input
                              type="number"
                              v-model="item.quantity"
                              class="border rounded w-16 h-8 pl-1 focus:outline-none appearance-none"
                            />
                          </p>
                        </td>
                        <td class="hidden md:table-cell text-center">
                          <p class="text-sm text-gray-700 font-medium">
                            <input
                              type="number"
                              v-model="item.rate"
                              class="border rounded w-16 h-8 pl-2 focus:outline-none"
                            />
                          </p>
                        </td>
                        <td class="text-right pr-4">
                          {{ currency.value
                          }}{{ item.quantity * item.rate || 0 }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  @click="addNewItem()"
                  href="#"
                  class="px-2 py-1 bg-gray-600 text-gray-100 rounded hover:bg-gray-500"
                >
                  Add Item
                </button>
                <div class="flex justify-between mt-4">
                  <div class="w-1/2">
                    <small>Note</small>
                    <editor
                      :content="invoiceNote"
                      @updated="invoiceDataUpdated('updateInvoiceNote', $event)"
                    />
                  </div>
                  <table class="w-1/3">
                    <tbody>
                      <tr
                        class="accordion border-b border-grey-light hover:bg-gray-100 border"
                      >
                        <td colspan="3"></td>
                        <td class="md:table-cell font-bold text-gray-600">
                          Subtotal
                        </td>
                        <td class="text-right pr-4">
                          {{ currency.value }}{{ subtotal }}
                        </td>
                      </tr>
                      <tr
                        class="accordion border-b border-grey-light hover:bg-gray-100 border"
                      >
                        <td colspan="3"></td>
                        <td class="md:table-cell font-bold text-gray-600">
                          Taxes
                        </td>
                        <td class="text-right pr-4">
                          {{ currency.value }}{{ (subtotal * tax) / 100 }}
                        </td>
                      </tr>
                      <tr
                        class="accordion border-b border-grey-light hover:bg-gray-100 border"
                      >
                        <td colspan="3"></td>
                        <td class="md:table-cell font-bold text-gray-600">
                          Total
                        </td>
                        <td class="text-right pr-4">
                          {{ currency.value }}{{ total }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="-mx-8 w-4/12 mt-4">
            <div class="px-8">
              <h1 class="mb-4 text-xl font-bold text-gray-700">&nbsp;</h1>
              <div
                class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"
              >
                <button
                  class="bg-orange-400 hover:bg-orange-500 mb-4 text-white font-bold py-2 px-4 rounded inline-flex items-center h-12"
                  @click="previewPDF()"
                >
                  <svg
                    v-if="previewing"
                    class="animate-spin w-4 h-4 mr-2 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4 mr-2 fill-current text-white"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                    ></path>
                  </svg>
                  <span>Save & Preview</span>
                </button>
                <button
                  class="bg-gray-200 hover:bg-gray-500 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center h-12"
                  @click="downloadPDF()"
                >
                  <svg
                    v-if="downloading"
                    class="animate-spin w-4 h-4 mr-2 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="downloading"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="'Invoice-' + invoiceNumber"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        ref="html2Pdf"
        @hasDownloaded="hasDownloaded($event)"
      >
        <section
          slot="pdf-content"
          class="p-6 flex flex-col justify-between font-thin"
          style="height: 1100px"
        >
          <div class="">
            <div class="flex justify-between">
              <div class="w-1/2">
                <h2 class="font-normal uppercase text-gray-500">Bill From</h2>
                <p class="text-left" v-html="invoiceFrom"></p>
              </div>
              <div class="w-1/2 text-right">
                <img
                  src=""
                  alt=""
                  id="logo-preview-pdf"
                  class="h-32 inline-flex flex-end"
                  v-if="logoExists"
                />
                <h2 class="text-3xl">TAX INVOICE</h2>
                <h2>INVOICE #002</h2>
              </div>
            </div>
            <div class="flex justify-between items-end">
              <div class="w-2/3">
                <div class="mt-8">
                  <h2 class="font-normal uppercase text-gray-500">Bill To</h2>
                  <p class="text-left" v-html="invoiceTo"></p>
                </div>
              </div>
              <div class="w-1/3">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="text-left">Invoice Date</td>
                      <td class="text-right">{{ invoiceCurrentDate }}</td>
                    </tr>
                    <tr>
                      <td class="text-left">Due Date</td>
                      <td class="text-right">{{ invoiceDueDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <table class="table-auto w-full mt-12 border-t">
              <thead class="bg-gray-300">
                <tr>
                  <th class="font-normal">#</th>
                  <th class="font-normal">Item</th>
                  <th class="font-normal">Quantity</th>
                  <th class="font-normal">Price</th>
                  <th class="text-right pr-4 font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-l border-r"
                  v-for="item in invoiceItems"
                  :key="item.id"
                >
                  <td class="border-r text-center">{{ item.id }}</td>
                  <td class="border-r">{{ item.description }}</td>
                  <td class="border-r text-center">{{ item.quantity }}</td>
                  <td class="border-r text-center">
                    {{ currency.value }}{{ item.rate }}
                  </td>
                  <td class="text-right pr-4">
                    {{ currency.value }}{{ item.rate * item.quantity }}
                  </td>
                </tr>
                <tr>
                  <td colspan="3" rowspan="4">
                    <h3 class="font-normal uppercase text-gray-500">Note</h3>
                    <p class="text-left" v-html="invoiceNote"></p>
                  </td>
                  <td colspan="2" style="min-width: 300px">
                    <table class="w-full">
                      <tbody>
                        <tr class="border-b">
                          <td><h4>Subtotal</h4></td>
                          <td class="text-right pr-4">
                            {{ currency.value }}{{ subtotal }}
                          </td>
                        </tr>
                        <tr class="border-b-2">
                          <td><h4>Taxes</h4></td>
                          <td class="text-right pr-4">
                            {{ currency.value }}{{ (subtotal * tax) / 100 }}
                          </td>
                        </tr>
                        <tr class="border-b-2">
                          <td class="font-normal">Total</td>
                          <td class="text-right pr-4 font-bold">
                            {{ currency.value }}{{ total }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>footer</div>
        </section>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { mapGetters } from "vuex";
import Editor from "./../components/Editor.vue";

interface InvoiceItems {
  id: number;
  description: string;
  quantity: number | null;
  rate: number | null;
}

interface FileReaderEventTarget extends EventTarget {
  result: string;
}
interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
  getMessage(): ArrayLike<number>;
}

@Component({
  components: {
    Editor,
  },
  computed: {
    ...mapGetters({
      currency: "currency",
      currencies: "currencies",
      invoiceFrom: "invoiceFrom",
      invoiceTo: "invoiceTo",
      invoiceNote: "invoiceNote",
    }),
  },
})
export default class extends Vue {
  invoiceItems: Array<InvoiceItems> = [
    {
      id: 1,
      description: "",
      quantity: null,
      rate: null,
    },
  ];
  logoExists: boolean = false;
  invoiceCurrentDate: string = "";
  invoiceDueDate: string = "";
  filename: string = "";
  previewing: boolean = false;
  downloading: boolean = false;

  get invoiceNumber(): number {
    return this.$store.getters.invoiceNumber;
  }
  set invoiceNumber(value) {
    this.$store.commit("updateInvoiceNumber", value);
  }

  get tax(): number {
    return this.$store.getters.tax;
  }
  set tax(value) {
    this.$store.commit("updateTax", value);
  }

  get subtotal(): number {
    let temp = 0;
    this.invoiceItems.forEach((item) => {
      temp += item.quantity! * item.rate!;
    });
    return temp;
  }

  get total(): string {
    return ((this.subtotal * this.tax) / 100 + this.subtotal).toFixed(2);
  }

  /**
   * Need to define computed property for html2pdf library.
   * Issue: Property generatePdf does not exists on type Vue | Element | Vue[] | Element[]
   * @see https://stackoverflow.com/a/52109899/3210356
   */
  get html2pdf(): Vue & { generatePdf: () => boolean } {
    return this.$refs.html2Pdf as Vue & { generatePdf: () => boolean };
  }

  get logo(): Vue & { files: FileList } {
    return this.$refs.logo as Vue & { files: FileList };
  }

  uploadLogo(): void {
    if (this.logo.files[0]) {
      var reader: any = new FileReader();
      reader.onload = (e: FileReaderEvent) => {
        let logoPreview: HTMLElement | null = document.getElementById(
          "logo-preview"
        );
        let logoPreviewPDF: HTMLElement | null = document.getElementById(
          "logo-preview-pdf"
        );

        if (!!logoPreview) {
          logoPreview.setAttribute("src", e.target.result);
        }

        if (!!logoPreviewPDF) {
          logoPreviewPDF.setAttribute("src", e.target.result);
        }
      };

      reader.readAsDataURL(this.logo.files[0]);
      this.logoExists = true;
    }
  }
  addNewItem(): void {
    let currentInvoiceItemsLength = this.invoiceItems.length;

    this.invoiceItems.push({
      id: currentInvoiceItemsLength + 1,
      description: "",
      quantity: null,
      rate: null,
    });
  }
  hasDownloaded() {
    this.previewing = false;
    this.downloading = false;
  }
  invoiceDataUpdated(type: string, data: string) {
    this.$store.commit(type, data);
  }
  previewPDF(): void {
    this.previewing = true;
    this.html2pdf.generatePdf();
  }
  downloadPDF(): void {
    this.downloading = true;
    this.html2pdf.generatePdf();
  }

  mounted() {
    if (this.$cookies.isKey("currency")) {
      this.$store.commit("updateCurrency", Vue.$cookies.get("currency"));
    }

    if (this.$cookies.isKey("invoiceFrom")) {
      this.$store.commit("updateInvoiceFrom", Vue.$cookies.get("invoiceFrom"));
    }

    if (this.$cookies.isKey("invoiceTo")) {
      this.$store.commit("updateInvoiceTo", Vue.$cookies.get("invoiceTo"));
    }

    if (this.$cookies.isKey("invoiceNote")) {
      this.$store.commit("updateInvoiceNote", Vue.$cookies.get("invoiceNote"));
    }

    if (this.$cookies.isKey("tax")) {
      this.$store.commit("updateTax", Vue.$cookies.get("tax"));
    }

    if (this.$cookies.isKey("invoiceNumber")) {
      this.$store.commit(
        "updateInvoiceNumber",
        Vue.$cookies.get("invoiceNumber")
      );
    }
  }
}
</script>