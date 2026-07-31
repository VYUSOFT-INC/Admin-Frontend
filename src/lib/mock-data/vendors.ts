export type VendorType = "Online Seller" | "Physical Store";
export type SellerTier = "Basic" | "Limited" | "Verified";
export type VendorStatus = "Pending" | "Active" | "Suspended" | "Rejected";
export type KycDocumentStatus = "Verified" | "Pending" | "Rejected";

/** A single KYC document row shown on the Vendor Detail screen's KYC summary/tab. */
export interface KycDocument {
  name: string;
  status: KycDocumentStatus;
}

export interface Vendor {
  slug: string;
  name: string;
  category: string;
  /** Two-stop gradient passed to the `Avatar` component's `gradient` prop. */
  gradient: readonly [string, string];
  type: VendorType;
  location: string;
  registeredDate: string;
  productsListed: number;
  sellerTier: SellerTier;
  status: VendorStatus;
  /** Fields below are only surfaced on the Vendor Detail screen. */
  ownerName: string;
  email: string;
  phone: string;
  gstNumber: string;
  panNumber: string;
  bankAccountMasked: string;
  ifscCode: string;
  pickupAddress: string;
  businessDescription: string;
  kycDocuments: KycDocument[];
}

export const VENDORS: Vendor[] = [
  {
    slug: "urban-thread-house",
    name: "Urban Thread House",
    category: "Men's Fashion",
    gradient: ["#082a67", "#123d8e"],
    type: "Online Seller",
    location: "Mumbai, MH",
    registeredDate: "14 Jun 2025",
    productsListed: 0,
    sellerTier: "Basic",
    status: "Pending",
    ownerName: "Rahul Mehta",
    email: "rahul@urbanthreadhouse.in",
    phone: "+91 98765 43210",
    gstNumber: "27AABCU9603R****",
    panNumber: "AABCU9***R",
    bankAccountMasked: "XXXX XXXX 4821",
    ifscCode: "HDFC0001234",
    pickupAddress: "Shop No. 12, Dharavi Industrial Estate, Sion, Mumbai – 400017, Maharashtra",
    businessDescription:
      "Urban Thread House offers curated men's fashion — from casual streetwear to semi-formal kurtas, targeting the 18–35 age group across India.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Pending" },
    ],
  },
  {
    slug: "green-loom-studio",
    name: "Green Loom Studio",
    category: "Women's Apparel",
    gradient: ["#5b21b6", "#7c3aed"],
    type: "Online Seller",
    location: "Bengaluru, KA",
    registeredDate: "11 Jun 2025",
    productsListed: 0,
    sellerTier: "Basic",
    status: "Pending",
    ownerName: "Ananya Rao",
    email: "ananya@greenloomstudio.in",
    phone: "+91 90123 45678",
    gstNumber: "29AACCG1234K****",
    panNumber: "AACCG1***K",
    bankAccountMasked: "XXXX XXXX 7734",
    ifscCode: "ICIC0002345",
    pickupAddress: "Plot 45, Whitefield Industrial Area, Bengaluru – 560066, Karnataka",
    businessDescription:
      "Green Loom Studio designs sustainable, handloom-based women's apparel using organic cotton and natural dyes, sold direct-to-consumer online.",
    kycDocuments: [
      { name: "GST Certificate", status: "Pending" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  {
    slug: "velora-styles",
    name: "Velora Styles",
    category: "Women's Fashion",
    gradient: ["#047857", "#059669"],
    type: "Online Seller",
    location: "Pune, MH",
    registeredDate: "02 Mar 2025",
    productsListed: 148,
    sellerTier: "Verified",
    status: "Active",
    ownerName: "Priya Nair",
    email: "priya@velorastyles.com",
    phone: "+91 91234 56789",
    gstNumber: "27AAAPV5678L****",
    panNumber: "AAAPV5***L",
    bankAccountMasked: "XXXX XXXX 2290",
    ifscCode: "HDFC0004567",
    pickupAddress: "Unit 7, Hinjewadi Industrial Park, Pune – 411057, Maharashtra",
    businessDescription:
      "Velora Styles is a verified women's fashion label offering contemporary ethnic and western wear, with over 148 SKUs shipped pan-India.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  {
    slug: "north-square-atelier",
    name: "North Square Atelier",
    category: "Multi-brand Store",
    gradient: ["#b45309", "#d97706"],
    type: "Physical Store",
    location: "New Delhi, DL",
    registeredDate: "18 Jan 2025",
    productsListed: 74,
    sellerTier: "Limited",
    status: "Active",
    ownerName: "Vikram Anand",
    email: "vikram@northsquare.in",
    phone: "+91 98111 22334",
    gstNumber: "07AABCN4432P****",
    panNumber: "AABCN4***P",
    bankAccountMasked: "XXXX XXXX 5510",
    ifscCode: "PUNB0112233",
    pickupAddress: "14 Connaught Place, New Delhi – 110001, Delhi",
    businessDescription:
      "North Square Atelier curates a multi-brand assortment across apparel, accessories, and footwear from its flagship Delhi storefront.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Pending" },
    ],
  },
  {
    slug: "kraze-fashion",
    name: "Kraze Fashion",
    category: "Streetwear",
    gradient: ["#9d174d", "#be185d"],
    type: "Online Seller",
    location: "Hyderabad, TS",
    registeredDate: "29 Oct 2024",
    productsListed: 31,
    sellerTier: "Limited",
    status: "Suspended",
    ownerName: "Sameer Qureshi",
    email: "sameer@krazefashion.co",
    phone: "+91 90000 11223",
    gstNumber: "36AADCK7789Q****",
    panNumber: "AADCK7***Q",
    bankAccountMasked: "XXXX XXXX 3387",
    ifscCode: "SBIN0009988",
    pickupAddress: "8-2-120 Banjara Hills, Hyderabad – 500034, Telangana",
    businessDescription:
      "Kraze Fashion sells streetwear and graphic apparel targeted at younger buyers, currently suspended pending review of repeated shipping delays.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Rejected" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  {
    slug: "harbor-blend-collective",
    name: "Harbor Blend Collective",
    category: "Lifestyle Store",
    gradient: ["#0e7490", "#0891b2"],
    type: "Physical Store",
    location: "Kochi, KL",
    registeredDate: "07 Feb 2025",
    productsListed: 62,
    sellerTier: "Verified",
    status: "Active",
    ownerName: "Meera Thomas",
    email: "meera@harborblend.in",
    phone: "+91 94440 55667",
    gstNumber: "32AADCH3345R****",
    panNumber: "AADCH3***R",
    bankAccountMasked: "XXXX XXXX 8823",
    ifscCode: "SIBL0000456",
    pickupAddress: "MG Road, Ernakulam, Kochi – 682016, Kerala",
    businessDescription:
      "Harbor Blend Collective is a lifestyle concept store blending home decor, apparel, and wellness products across its Kochi outlet.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  {
    slug: "maple-wear-co",
    name: "Maple Wear Co.",
    category: "Kidswear & Family",
    gradient: ["#374151", "#4b5563"],
    type: "Physical Store",
    location: "Ahmedabad, GJ",
    registeredDate: "20 Jun 2025",
    productsListed: 0,
    sellerTier: "Basic",
    status: "Pending",
    ownerName: "Devansh Patel",
    email: "devansh@maplewear.in",
    phone: "+91 99887 66554",
    gstNumber: "24AABCM9981S****",
    panNumber: "AABCM9***S",
    bankAccountMasked: "XXXX XXXX 1145",
    ifscCode: "AXIS0001122",
    pickupAddress: "Shed 3, Naroda Industrial Estate, Ahmedabad – 382330, Gujarat",
    businessDescription:
      "Maple Wear Co. is a newly registered kidswear and family apparel brand awaiting its first compliance review.",
    kycDocuments: [
      { name: "GST Certificate", status: "Pending" },
      { name: "PAN Card", status: "Pending" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Pending" },
    ],
  },
  {
    slug: "blaze-zone",
    name: "Blaze Zone",
    category: "Sportswear",
    gradient: ["#6b7280", "#9ca3af"],
    type: "Online Seller",
    location: "Chennai, TN",
    registeredDate: "03 May 2025",
    productsListed: 0,
    sellerTier: "Basic",
    status: "Rejected",
    ownerName: "Karan Malhotra",
    email: "karan@blazezone.in",
    phone: "+91 93333 44556",
    gstNumber: "33AABCB2246T****",
    panNumber: "AABCB2***T",
    bankAccountMasked: "XXXX XXXX 6602",
    ifscCode: "IOBA0001789",
    pickupAddress: "12 Anna Salai, Chennai – 600002, Tamil Nadu",
    businessDescription:
      "Blaze Zone's application was rejected after submitted GST and address documents failed verification.",
    kycDocuments: [
      { name: "GST Certificate", status: "Rejected" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Rejected" },
      { name: "Address Proof", status: "Rejected" },
    ],
  },
  {
    slug: "aurel-lane",
    name: "Aurel Lane",
    category: "Women's Fashion",
    gradient: ["#1e40af", "#2563eb"],
    type: "Online Seller",
    location: "Jaipur, RJ",
    registeredDate: "15 Nov 2024",
    productsListed: 213,
    sellerTier: "Verified",
    status: "Active",
    ownerName: "Ishita Sharma",
    email: "ishita@aurellane.com",
    phone: "+91 97654 32109",
    gstNumber: "08AABCA5567U****",
    panNumber: "AABCA5***U",
    bankAccountMasked: "XXXX XXXX 4470",
    ifscCode: "HDFC0007890",
    pickupAddress: "C-56 Malviya Nagar, Jaipur – 302017, Rajasthan",
    businessDescription:
      "Aurel Lane is one of the platform's top-performing women's fashion sellers, with 213 active listings and a verified seller badge.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  {
    slug: "moss-and-clay",
    name: "Moss & Clay",
    category: "Home Linen",
    gradient: ["#7c2d12", "#b45309"],
    type: "Physical Store",
    location: "Kolkata, WB",
    registeredDate: "08 Sep 2024",
    productsListed: 44,
    sellerTier: "Limited",
    status: "Suspended",
    ownerName: "Arjun Bose",
    email: "arjun@mossandclay.in",
    phone: "+91 98300 11223",
    gstNumber: "19AABCM6678V****",
    panNumber: "AABCM6***V",
    bankAccountMasked: "XXXX XXXX 9931",
    ifscCode: "UBIN0567890",
    pickupAddress: "45 Park Street, Kolkata – 700016, West Bengal",
    businessDescription:
      "Moss & Clay, a home linen seller, was suspended pending review of a spike in customer return requests.",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Rejected" },
    ],
  },
];

export const STATUS_TABS: Array<{ label: string; value: VendorStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Pending Approval", value: "Pending" },
  { label: "Active", value: "Active" },
  { label: "Suspended", value: "Suspended" },
  { label: "Rejected", value: "Rejected" },
];

export const TYPE_TABS: Array<{ label: string; value: VendorType | "All" }> = [
  { label: "All Types", value: "All" },
  { label: "Online Sellers", value: "Online Seller" },
  { label: "Physical Stores", value: "Physical Store" },
];
