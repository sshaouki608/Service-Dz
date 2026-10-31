/**
 * DZ SERVICES - Unified Application Script
 * Fully self-contained JavaScript engine with Zero external dependencies.
 * Includes: Storage (LocalStorage + IndexedDB), Phone/WhatsApp Normalizer,
 * Animations, Search & Filter, Services UI, and Admin Dashboard.
 */

/* ==========================================================================
   1. Data Constants & Wilayas (58 Algerian Wilayas)
   ========================================================================== */
const STORAGE_KEYS = {
  SERVICES: 'dz_services_data',
  CATEGORIES: 'dz_categories_data',
  SETTINGS: 'dz_settings_data',
  FAVORITES: 'dz_favorites_data',
  THEME: 'dz_theme_mode',
  ADMIN_SESSION: 'dz_admin_session_auth'
};

const ALGERIA_WILAYAS = [
  "01 - أدرار (Adrar)",
  "02 - الشلف (Chlef)",
  "03 - الأغواط (Laghouat)",
  "04 - أم البواقي (Oum El Bouaghi)",
  "05 - باتنة (Batna)",
  "06 - بجاية (Béjaïa)",
  "07 - بسكرة (Biskra)",
  "08 - بشار (Béchar)",
  "09 - البليدة (Blida)",
  "10 - البويرة (Bouira)",
  "11 - تمنراست (Tamanrasset)",
  "12 - تبسة (Tébessa)",
  "13 - تلمسان (Tlemcen)",
  "14 - تيارت (Tiaret)",
  "15 - تيزي وزو (Tizi Ouzou)",
  "16 - الجزائر العاصمة (Alger)",
  "17 - الجلفة (Djelfa)",
  "18 - جيجل (Jijel)",
  "19 - سطيف (Sétif)",
  "20 - سعيدة (Saïda)",
  "21 - سكيكدة (Skikda)",
  "22 - سيدي بلعباس (Sidi Bel Abbès)",
  "23 - عنابة (Annaba)",
  "24 - قالمة (Guelma)",
  "25 - قسنطينة (Constantine)",
  "26 - المدية (Médéa)",
  "27 - مستغانم (Mostaganem)",
  "28 - المسيلة (M'Sila)",
  "29 - معسكر (Mascara)",
  "30 - ورقلة (Ouargla)",
  "31 - وهران (Oran)",
  "32 - البيض (El Bayadh)",
  "33 - إليزي (Illizi)",
  "34 - برج بوعريريج (Bordj Bou Arréridj)",
  "35 - بومرداس (Boumerdès)",
  "36 - الطارف (El Tarf)",
  "37 - تندوف (Tindouf)",
  "38 - تيسمسيلت (Tissemsilt)",
  "39 - الوادي (El Oued)",
  "40 - خنشلة (Khenchela)",
  "41 - سوق أهراس (Souk Ahras)",
  "42 - تيبازة (Tipaza)",
  "43 - ميلة (Mila)",
  "44 - عين الدفلى (Aïn Defla)",
  "45 - النعامة (Naâma)",
  "46 - عين تموشنت (Aïn Témouchent)",
  "47 - غرداية (Ghardaïa)",
  "48 - غليزان (Relizane)",
  "49 - تيميمون (Timimoun)",
  "50 - برج باجي مختار (Bordj Badji Mokhtar)",
  "51 - أولاد جلال (Ouled Djellal)",
  "52 - بني عباس (Béni Abbès)",
  "53 - عين صالح (In Salah)",
  "54 - عين قزام (In Guezzam)",
  "55 - تقرت (Touggourt)",
  "56 - جانت (Djanet)",
  "57 - المغير (El M'Ghair)",
  "58 - المنيعة (El Meniaa)"
];

const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'كهرباء وصيانة منزلية', icon: 'zap', count: 0 },
  { id: 'cat-2', name: 'بناء ودهان وترميم', icon: 'hammer', count: 0 },
  { id: 'cat-3', name: 'تصليح سيارات وميكانيك', icon: 'tool', count: 0 },
  { id: 'cat-4', name: 'تنظيف وتعقيم منازل', icon: 'sparkles', count: 0 },
  { id: 'cat-5', name: 'برمجة ومواقع وتطبيقات', icon: 'code', count: 0 },
  { id: 'cat-6', name: 'تصميم جرافيك ومونتاج', icon: 'palette', count: 0 },
  { id: 'cat-7', name: 'دروس خصوصية وتعليم', icon: 'book', count: 0 },
  { id: 'cat-8', name: 'نقل بضائع وترحيل أثاث', icon: 'truck', count: 0 },
  { id: 'cat-9', name: 'تصوير وحفلات ومناسبات', icon: 'camera', count: 0 },
  { id: 'cat-10', name: 'طبخ منزلي وحلويات', icon: 'utensils', count: 0 },
  { id: 'cat-11', name: 'استشارات قانونية ومالية', icon: 'briefcase', count: 0 },
  { id: 'cat-12', name: 'تبريد وتكييف هواء', icon: 'wind', count: 0 }
];

const DEFAULT_SETTINGS = {
  siteName: 'DZ SERVICES',
  siteTagline: 'المنصة الجزائرية للخدمات والإعلانات',
  adminPinHash: 'ch5529',
  contactPhone: '0550123456',
  allowAutoPublish: false,
  siteStatsOffset: {
    views: 1250,
    connections: 340
  }
};

const DEFAULT_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20250%22%20width%3D%22400%22%20height%3D%22250%22%20fill%3D%22none%22%3E%3Crect%20width%3D%22400%22%20height%3D%22250%22%20fill%3D%22%23101B32%22%2F%3E%3Ccircle%20cx%3D%22200%22%20cy%3D%22110%22%20r%3D%2240%22%20fill%3D%22%231A2B4C%22%2F%3E%3Cpath%20d%3D%22M200%2085V135M175%20110H225%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22185%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22%23FFFFFF%22%20text-anchor%3D%22middle%22%3EDZ%20SERVICES%3C%2Ftext%3E%3C%2Fsvg%3E";

const CATEGORY_ICONS_SVG = {
  zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  hammer: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0-.83-.83-.83-2.17 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.26-6.55 6.55"/><path d="m10.64 7.64 4.36 4.36"/></svg>`,
  tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>`,
  book: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>`,
  truck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="13" x="1" y="5" rx="2"/><polygon points="17 8 20 8 23 11 23 18 17 18 17 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  camera: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  utensils: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2"/><path d="M8 9v13"/></svg>`,
  briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  wind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`
};

/* ==========================================================================
   2. Storage & Image Compression (LocalStorage + IndexedDB + Canvas)
   ========================================================================== */
const DB_NAME = 'DZServicesDB';
const DB_VERSION = 1;
const STORE_NAME = 'service_images';
let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }
  return dbPromise;
}

function compressImageFile(file, maxWidth = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('فشل قراءة بيانات الصورة.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('تعذر تحميل الملف من جهازك.'));
    reader.readAsDataURL(file);
  });
}

function getStoredServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveStoredServices(services) {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      throw new Error('مساحة التخزين المحلية ممتلئة. يرجى حذف بعض الخدمات القديمة.');
    }
    throw e;
  }
}

function addService(serviceData) {
  const services = getStoredServices();
  const newService = {
    id: 'dz_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: String(serviceData.title || '').trim(),
    description: String(serviceData.description || '').trim(),
    price: serviceData.price !== undefined && serviceData.price !== '' ? Number(serviceData.price) : 0,
    priceNegotiable: Boolean(serviceData.priceNegotiable),
    category: String(serviceData.category || '').trim(),
    wilaya: String(serviceData.wilaya || '').trim(),
    providerName: String(serviceData.providerName || '').trim(),
    phone: String(serviceData.phone || '').trim(),
    whatsapp: String(serviceData.whatsapp || serviceData.phone || '').trim(),
    image: serviceData.image || '',
    createdAt: new Date().toISOString(),
    status: serviceData.status || 'pending',
    isFeatured: Boolean(serviceData.isFeatured),
    views: 0
  };
  services.unshift(newService);
  saveStoredServices(services);
  return newService;
}

function updateService(id, updateData) {
  const services = getStoredServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...updateData, updatedAt: new Date().toISOString() };
  saveStoredServices(services);
  return services[index];
}

function deleteService(id) {
  const services = getStoredServices();
  const filtered = services.filter(s => s.id !== id);
  saveStoredServices(filtered);
  return true;
}

function setServiceStatus(id, newStatus) {
  return updateService(id, { status: newStatus });
}

function toggleServiceFeatured(id) {
  const services = getStoredServices();
  const target = services.find(s => s.id === id);
  if (!target) return null;
  return updateService(id, { isFeatured: !target.isFeatured });
}

function getStoredCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

function saveStoredCategories(categories) {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

function addCategory(name, icon = 'briefcase') {
  const categories = getStoredCategories();
  const id = 'cat-' + Date.now();
  categories.push({ id, name: name.trim(), icon, count: 0 });
  saveStoredCategories(categories);
  return categories;
}

function deleteCategory(id) {
  const categories = getStoredCategories();
  const filtered = categories.filter(c => c.id !== id);
  saveStoredCategories(filtered);
  return filtered;
}

function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    if (parsed.adminPinHash === 'dz2025') {
      parsed.adminPinHash = 'ch5529';
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

function saveStoredSettings(newSettings) {
  const current = getStoredSettings();
  const merged = { ...current, ...newSettings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
  return merged;
}

function getStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function toggleFavorite(serviceId) {
  const favs = getStoredFavorites();
  const index = favs.indexOf(serviceId);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(serviceId);
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  return favs;
}

function isFavorite(serviceId) {
  return getStoredFavorites().includes(serviceId);
}

function exportDataAsJSON() {
  const data = {
    exportedAt: new Date().toISOString(),
    platform: 'DZ SERVICES',
    version: '1.0.0',
    services: getStoredServices(),
    categories: getStoredCategories(),
    settings: getStoredSettings()
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dz-services-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function validateAndImportJSON(jsonString, mode = 'merge') {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') throw new Error('ملف JSON غير صالح أو فارغ.');
    if (!Array.isArray(data.services)) throw new Error('الملف لا يحتوي على مصفوفة خدمات صالحة.');
    const validServices = data.services.filter(s => s && typeof s === 'object' && s.title && s.wilaya);
    if (validServices.length === 0 && data.services.length > 0) throw new Error('لم يتم العثور على خدمات مطابقة للمواصفات.');

    const currentServices = mode === 'replace' ? [] : getStoredServices();
    const existingIds = new Set(currentServices.map(s => s.id));
    let importedCount = 0;

    for (const s of validServices) {
      let finalId = s.id;
      if (!finalId || existingIds.has(finalId)) {
        finalId = 'dz_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      }
      existingIds.add(finalId);
      currentServices.push({ ...s, id: finalId, status: s.status || 'published' });
      importedCount++;
    }

    saveStoredServices(currentServices);
    if (Array.isArray(data.categories) && data.categories.length > 0) saveStoredCategories(data.categories);
    if (data.settings && typeof data.settings === 'object') saveStoredSettings(data.settings);

    return { success: true, importedCount, totalServices: currentServices.length };
  } catch (err) {
    return { success: false, error: err.message || 'فشل استيراد الملف.' };
  }
}

/* ==========================================================================
   3. WhatsApp & Algerian Phone Utilities
   ========================================================================== */
function cleanAlgerianPhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
  if (cleaned.startsWith('0') && cleaned.length === 10) cleaned = '213' + cleaned.substring(1);
  if (cleaned.startsWith('213') && (cleaned.length === 11 || cleaned.length === 12)) return cleaned;
  if (cleaned.length === 9) return '213' + cleaned;
  return cleaned;
}

function buildWhatsAppLink(phone, serviceTitle, providerName = '') {
  const normalizedPhone = cleanAlgerianPhoneNumber(phone);
  if (!normalizedPhone) return null;
  const greeting = providerName ? `السلام عليكم أخي ${providerName}` : 'السلام عليكم ورحمة الله';
  const message = `${greeting}، تواصلت معك بخصوص إعلانك على منصة DZ SERVICES:
🔹 "${serviceTitle}"
هل الخدمة ما زالت متوفرة؟ أرغب في معرفة التفاصيل والاتفاق معكم. شكراً جزيلاً!`;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

function buildTelLink(phone) {
  const cleaned = String(phone || '').replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '#';
}

async function copyPhoneNumber(phone) {
  if (!phone) return false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(phone);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = phone;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const res = document.execCommand('copy');
      document.body.removeChild(textArea);
      return res;
    }
  } catch (err) {
    return false;
  }
}

/* ==========================================================================
   4. UI Animations, Toasts & Modals
   ========================================================================== */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  } else if (type === 'danger') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  }

  toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span class="toast-text">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-closing');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 280);
  }, duration);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modalId);
      window.removeEventListener('keydown', escHandler);
    }
  };
  window.addEventListener('keydown', escHandler);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('is-active');
  const openModals = document.querySelectorAll('.modal-overlay.is-active');
  if (openModals.length === 0) document.body.style.overflow = '';
}

function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
    const closeBtn = overlay.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(overlay.id));
  });
}

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

function initTheme() {
  const savedTheme = localStorage.getItem('dz_theme_mode') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(nextTheme === 'dark' ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري', 'info', 2000);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('dz_theme_mode', theme);
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  if (theme === 'dark') {
    sunIcons.forEach(i => i.style.display = 'block');
    moonIcons.forEach(i => i.style.display = 'none');
  } else {
    sunIcons.forEach(i => i.style.display = 'none');
    moonIcons.forEach(i => i.style.display = 'block');
  }
}

function animateCounter(element, targetValue, duration = 1400) {
  if (!element) return;
  const target = parseInt(targetValue, 10);
  if (isNaN(target)) {
    element.textContent = targetValue;
    return;
  }
  const startTime = performance.now();
  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(target * eased);
    element.textContent = current.toLocaleString('ar-DZ');
    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target.toLocaleString('ar-DZ');
    }
  }
  requestAnimationFrame(updateCount);
}

/* ==========================================================================
   5. Search & Filter Engine
   ========================================================================== */
class SearchFilterEngine {
  constructor(options = {}) {
    this.services = [];
    this.currentFilters = { query: '', category: '', wilaya: '', sortBy: 'newest', onlyFavorites: false };
    this.onResultsChange = options.onResultsChange || (() => {});
  }

  setServices(servicesList) {
    this.services = Array.isArray(servicesList) ? servicesList : [];
    this.applyFilters();
  }
  setQuery(q) { this.currentFilters.query = String(q || '').trim().toLowerCase(); this.applyFilters(); }
  setCategory(c) { this.currentFilters.category = String(c || '').trim(); this.applyFilters(); }
  setWilaya(w) { this.currentFilters.wilaya = String(w || '').trim(); this.applyFilters(); }
  setSortBy(s) { this.currentFilters.sortBy = s; this.applyFilters(); }
  setFavoritesOnly(f) { this.currentFilters.onlyFavorites = Boolean(f); this.applyFilters(); }
  resetFilters() {
    this.currentFilters = { query: '', category: '', wilaya: '', sortBy: 'newest', onlyFavorites: false };
    this.applyFilters();
  }
  hasActiveFilters() {
    return Boolean(this.currentFilters.query) || Boolean(this.currentFilters.category) ||
      Boolean(this.currentFilters.wilaya) || this.currentFilters.sortBy !== 'newest' || this.currentFilters.onlyFavorites;
  }
  applyFilters() {
    let filtered = this.services.filter(s => {
      if (s.status !== 'published') return false;
      if (this.currentFilters.query) {
        const q = this.currentFilters.query;
        const inTitle = (s.title || '').toLowerCase().includes(q);
        const inDesc = (s.description || '').toLowerCase().includes(q);
        const inProvider = (s.providerName || '').toLowerCase().includes(q);
        const inWilaya = (s.wilaya || '').toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inProvider && !inWilaya) return false;
      }
      if (this.currentFilters.category && s.category !== this.currentFilters.category) return false;
      if (this.currentFilters.wilaya && s.wilaya !== this.currentFilters.wilaya) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (this.currentFilters.sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }
      if (this.currentFilters.sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (this.currentFilters.sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (this.currentFilters.sortBy === 'oldest') {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

    this.onResultsChange(filtered, this.currentFilters);
  }
}

/* ==========================================================================
   6. Services Cards, Details Modal & Add Service Form
   ========================================================================== */
function formatPriceDZD(price, isNegotiable) {
  if (isNegotiable || !price || Number(price) <= 0) return 'حسب الاتفاق';
  return Number(price).toLocaleString('ar-DZ') + ' د.ج';
}

function formatArabicDate(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const diffHours = Math.floor((new Date() - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'منذ قليل';
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffHours < 48) return 'أمس';
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    return date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return '';
  }
}

function createServiceCardElement(service, onDetailsClick) {
  const card = document.createElement('article');
  card.className = 'service-card card-hover-effect';
  card.dataset.id = service.id;
  const isFav = isFavorite(service.id);
  const providerInitial = (service.providerName || 'م').charAt(0);
  const imageSrc = service.image || DEFAULT_IMAGE;

  card.innerHTML = `
    <div class="card-img-wrapper">
      <img src="${imageSrc}" alt="${service.title}" class="card-img" loading="lazy" onerror="this.src='${DEFAULT_IMAGE}'"/>
      ${service.isFeatured ? `<div class="featured-badge">⭐ مميز</div>` : ''}
      <button class="favorite-btn ${isFav ? 'is-favorited' : ''}" title="حفظ في المفضلة" aria-label="حفظ في المفضلة">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <div class="card-category-tag">${service.category || 'خدمة'}</div>
    </div>
    <div class="card-body">
      <div class="card-wilaya">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${service.wilaya || 'كل الولايات'}</span>
      </div>
      <h3 class="card-title" title="${service.title}">${service.title}</h3>
      <div class="card-provider">
        <div class="provider-avatar">${providerInitial}</div>
        <span class="provider-name">${service.providerName || 'مقدم خدمة'}</span>
      </div>
      <div class="card-footer">
        <div class="card-price">
          <span class="price-label">السعر التقديري</span>
          <span class="price-value">${formatPriceDZD(service.price, service.priceNegotiable)}</span>
        </div>
        <button class="btn btn-primary btn-sm view-details-btn">عرض التفاصيل</button>
      </div>
    </div>
  `;

  const favBtn = card.querySelector('.favorite-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const updated = toggleFavorite(service.id);
    const nowFav = updated.includes(service.id);
    favBtn.classList.toggle('is-favorited', nowFav);
    favBtn.querySelector('svg').setAttribute('fill', nowFav ? 'currentColor' : 'none');
    showToast(nowFav ? 'تمت الإضافة إلى المفضلة' : 'تمت الإزالة من المفضلة', 'info', 2000);
  });

  card.querySelector('.view-details-btn').addEventListener('click', () => {
    if (onDetailsClick) onDetailsClick(service);
  });

  return card;
}

function openServiceDetailsModal(service) {
  const modal = document.getElementById('service-details-modal');
  if (!modal) return;

  const imageEl = modal.querySelector('#details-service-image');
  const titleEl = modal.querySelector('#details-service-title');
  const priceEl = modal.querySelector('#details-service-price');
  const descEl = modal.querySelector('#details-service-description');
  const categoryEl = modal.querySelector('#details-service-category');
  const wilayaEl = modal.querySelector('#details-service-wilaya');
  const providerEl = modal.querySelector('#details-service-provider');
  const dateEl = modal.querySelector('#details-service-date');
  const whatsappBtn = modal.querySelector('#details-whatsapp-btn');
  const callBtn = modal.querySelector('#details-call-btn');
  const copyPhoneBtn = modal.querySelector('#details-copy-phone-btn');
  const shareBtn = modal.querySelector('#details-share-btn');

  if (imageEl) imageEl.src = service.image || DEFAULT_IMAGE;
  if (titleEl) titleEl.textContent = service.title;
  if (priceEl) priceEl.textContent = formatPriceDZD(service.price, service.priceNegotiable);
  if (descEl) descEl.textContent = service.description || 'لا يوجد وصف مفصل لهذه الخدمة.';
  if (categoryEl) categoryEl.textContent = service.category || 'عام';
  if (wilayaEl) wilayaEl.textContent = service.wilaya || 'الجزائر';
  if (providerEl) providerEl.textContent = service.providerName || 'مقدم خدمة معتمد';
  if (dateEl) dateEl.textContent = formatArabicDate(service.createdAt);

  if (whatsappBtn) {
    const waLink = buildWhatsAppLink(service.whatsapp || service.phone, service.title, service.providerName);
    whatsappBtn.onclick = (e) => {
      e.preventDefault();
      if (!waLink) {
        showToast('رقم واتساب غير متوفر لهذا الإعلان.', 'warning');
        return;
      }
      showToast('جاري فتح تطبيق واتساب... يرجى الضغط على زر الإرسال داخل المحادثة.', 'info', 4000);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    };
  }

  if (callBtn) callBtn.href = buildTelLink(service.phone);

  if (copyPhoneBtn) {
    copyPhoneBtn.onclick = async () => {
      if (!service.phone) return showToast('رقم الهاتف غير متوفر.', 'warning');
      const ok = await copyPhoneNumber(service.phone);
      showToast(ok ? `تم نسخ رقم الهاتف: ${service.phone}` : 'تعذر نسخ الرقم.', ok ? 'success' : 'danger');
    };
  }

  if (shareBtn) {
    shareBtn.onclick = async () => {
      const shareData = {
        title: `DZ SERVICES - ${service.title}`,
        text: `شاهد خدمة "${service.title}" على منصة DZ SERVICES في ولاية ${service.wilaya}`,
        url: window.location.href
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (e) {}
      } else {
        await copyPhoneNumber(window.location.href);
        showToast('تم نسخ رابط المنصة للمشاركة!', 'success');
      }
    };
  }

  openModal('service-details-modal');
}

function initAddServiceForm(onServiceAdded) {
  const form = document.getElementById('add-service-form');
  if (!form) return;

  const fileInput = document.getElementById('service-image-input');
  const previewZone = document.getElementById('image-upload-zone');
  const previewContainer = document.getElementById('image-preview-container');
  const previewImg = document.getElementById('image-preview-img');
  const removeImgBtn = document.getElementById('image-remove-btn');
  const negotiableCheckbox = document.getElementById('service-price-negotiable');
  const priceInput = document.getElementById('service-price');

  let currentImageDataUrl = '';

  if (negotiableCheckbox && priceInput) {
    negotiableCheckbox.addEventListener('change', () => {
      if (negotiableCheckbox.checked) {
        priceInput.disabled = true;
        priceInput.value = '';
        priceInput.placeholder = 'حسب الاتفاق مع الزبون';
      } else {
        priceInput.disabled = false;
        priceInput.placeholder = 'مثال: 3500';
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 8 * 1024 * 1024) return showToast('حجم الصورة كبير جداً (الحد الأقصى 8 ميجابايت).', 'danger');

      try {
        showToast('جاري معالجة الصورة وتحسين حجمها...', 'info', 1500);
        const compressed = await compressImageFile(file, 900, 0.78);
        currentImageDataUrl = compressed;
        if (previewImg && previewContainer) {
          previewImg.src = compressed;
          previewContainer.style.display = 'block';
          if (previewZone) previewZone.style.display = 'none';
        }
      } catch (err) {
        showToast(err.message || 'فشل معالجة الصورة.', 'danger');
      }
    });
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageDataUrl = '';
      if (fileInput) fileInput.value = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (previewZone) previewZone.style.display = 'block';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.elements['title'].value.trim();
    const category = form.elements['category'].value.trim();
    const wilaya = form.elements['wilaya'].value.trim();
    const providerName = form.elements['providerName'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const whatsapp = form.elements['whatsapp'].value.trim() || phone;
    const isNegotiable = form.elements['priceNegotiable'] ? form.elements['priceNegotiable'].checked : false;
    const price = isNegotiable ? 0 : form.elements['price'].value;
    const description = form.elements['description'].value.trim();

    if (title.length < 5) return showToast('يرجى كتابة عنوان واضح للخدمة (5 أحرف على الأقل).', 'warning');
    if (!category) return showToast('يرجى اختيار تصنيف الخدمة.', 'warning');
    if (!wilaya) return showToast('يرجى تحديد الولاية الجزائرية.', 'warning');
    if (providerName.length < 3) return showToast('يرجى كتابة اسم مقدم الخدمة أو الشركة.', 'warning');
    if (!phone || phone.length < 9) return showToast('يرجى كتابة رقم هاتف صالح للتواصل.', 'warning');
    if (description.length < 15) return showToast('يرجى كتابة وصف تفصيلي للخدمة (15 حرفاً على الأقل).', 'warning');

    try {
      const newService = addService({
        title, category, wilaya, providerName, phone, whatsapp,
        priceNegotiable: isNegotiable,
        price: isNegotiable ? 0 : Number(price) || 0,
        description,
        image: currentImageDataUrl,
        status: 'pending',
        isFeatured: false
      });

      form.reset();
      currentImageDataUrl = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (previewZone) previewZone.style.display = 'block';
      closeModal('add-service-modal');
      showToast('تم إرسال خدمتك بنجاح! طلبك قيد المراجعة من طرف إدارة DZ SERVICES وسيتم نشره قريباً.', 'success', 6000);
      if (onServiceAdded) onServiceAdded(newService);
    } catch (err) {
      showToast(err.message || 'حدث خطأ أثناء حفظ الخدمة.', 'danger');
    }
  });
}

/* ==========================================================================
   7. Admin Dashboard Engine (Passcode: ch5529)
   ========================================================================== */
async function hashPin(pin) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(String(pin).trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return 'dz_' + btoa(encodeURIComponent(pin));
  }
}

class AdminDashboard {
  constructor(options = {}) {
    this.isAuthenticated = false;
    this.currentTab = 'services';
    this.serviceStatusFilter = 'all';
    this.onStateChange = options.onStateChange || (() => {});
  }

  init() {
    this.bindLogin();
    this.bindTriggers();
    this.bindTabs();
    this.bindBackupRestore();
    this.bindSettingsForm();
    this.bindCategoryManager();
    this.bindAdminAddService();
  }

  bindTriggers() {
    const footerSecret = document.getElementById('admin-secret-trigger');
    if (footerSecret) {
      footerSecret.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        this.open();
      }
    });

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  }

  async verifyPin(enteredPin) {
    const settings = getStoredSettings();
    const enteredHash = await hashPin(enteredPin);
    const expectedHash = await hashPin(settings.adminPinHash || 'ch5529');
    return enteredHash === expectedHash || enteredPin === (settings.adminPinHash || 'ch5529') || enteredPin === 'ch5529';
  }

  bindLogin() {
    const loginForm = document.getElementById('admin-login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pinInput = document.getElementById('admin-pin-input');
      const pin = pinInput ? pinInput.value.trim() : '';

      const isValid = await this.verifyPin(pin);
      if (isValid) {
        this.isAuthenticated = true;
        if (pinInput) pinInput.value = '';
        closeModal('admin-login-modal');
        this.renderDashboard();
        openModal('admin-dashboard-modal');
        showToast('مرحباً بك في لوحة تحكم DZ SERVICES', 'success');
      } else {
        showToast('رمز المرور غير صحيح! يرجى التحقق والمحاولة مجدداً.', 'danger');
      }
    });
  }

  open() {
    if (this.isAuthenticated) {
      this.renderDashboard();
      openModal('admin-dashboard-modal');
    } else {
      openModal('admin-login-modal');
      const pinInput = document.getElementById('admin-pin-input');
      if (pinInput) setTimeout(() => pinInput.focus(), 200);
    }
  }

  logout() {
    this.isAuthenticated = false;
    closeModal('admin-dashboard-modal');
    showToast('تم تسجيل الخروج من لوحة الإدارة بنجاح.', 'info');
  }

  bindTabs() {
    const tabButtons = document.querySelectorAll('.admin-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.renderTabContent();
      });
    });

    const statusFilters = document.querySelectorAll('.admin-status-tab');
    statusFilters.forEach(tab => {
      tab.addEventListener('click', () => {
        statusFilters.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.serviceStatusFilter = tab.dataset.status;
        this.renderServicesList();
      });
    });
  }

  renderDashboard() {
    this.updateStatsCards();
    this.renderTabContent();
  }

  updateStatsCards() {
    const services = getStoredServices();
    const categories = getStoredCategories();
    const published = services.filter(s => s.status === 'published').length;
    const pending = services.filter(s => s.status === 'pending').length;
    const rejected = services.filter(s => s.status === 'rejected').length;

    const statPublished = document.getElementById('admin-stat-published');
    const statPending = document.getElementById('admin-stat-pending');
    const statRejected = document.getElementById('admin-stat-rejected');
    const statCategories = document.getElementById('admin-stat-categories');

    if (statPublished) statPublished.textContent = published;
    if (statPending) statPending.textContent = pending;
    if (statRejected) statRejected.textContent = rejected;
    if (statCategories) statCategories.textContent = categories.length;
  }

  renderTabContent() {
    document.querySelectorAll('.admin-tab-pane').forEach(pane => {
      pane.style.display = (pane.id === `admin-tab-${this.currentTab}`) ? 'block' : 'none';
    });

    if (this.currentTab === 'services') this.renderServicesList();
    else if (this.currentTab === 'categories') this.renderCategoriesList();
    else if (this.currentTab === 'settings') this.loadSettingsForm();
  }

  renderServicesList() {
    const container = document.getElementById('admin-services-table-body');
    if (!container) return;

    const services = getStoredServices();
    let filtered = services;
    if (this.serviceStatusFilter !== 'all') {
      filtered = services.filter(s => s.status === this.serviceStatusFilter);
    }

    if (filtered.length === 0) {
      container.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">لا توجد خدمات مطابقة لهذا الفلتر حالياً.</td></tr>`;
      return;
    }

    container.innerHTML = '';
    filtered.forEach(service => {
      const tr = document.createElement('tr');
      const statusClass = service.status === 'published' ? 'status-published' : (service.status === 'pending' ? 'status-pending' : 'status-rejected');
      const statusLabel = service.status === 'published' ? 'منشورة' : (service.status === 'pending' ? 'قيد المراجعة' : 'مرفوضة');

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${service.title}</div>
          <small style="color: var(--text-muted);">${service.wilaya} • ${service.category}</small>
        </td>
        <td>${service.providerName || '-'}</td>
        <td><span style="font-weight: 700; color: var(--color-gold);">${service.priceNegotiable ? 'اتفاق' : (service.price ? service.price + ' د.ج' : '0')}</span></td>
        <td>
          <span class="status-badge ${statusClass}">${statusLabel}</span>
          ${service.isFeatured ? '<span class="status-badge" style="background: var(--color-gold-light); color:#92400E; margin-right:4px;">⭐ مميز</span>' : ''}
        </td>
        <td><small style="color: var(--text-muted);">${new Date(service.createdAt).toLocaleDateString('ar-DZ')}</small></td>
        <td>
          <div class="table-actions">
            ${service.status !== 'published' ? `<button class="btn btn-sm btn-primary action-approve-btn" title="قبول ونشر">نشر</button>` : ''}
            ${service.status !== 'rejected' ? `<button class="btn btn-sm btn-outline action-reject-btn" style="color:var(--color-danger); border-color:var(--color-danger);" title="رفض">رفض</button>` : ''}
            <button class="icon-btn action-feature-btn" title="تمييز" style="width:32px; height:32px;">⭐</button>
            <button class="icon-btn action-edit-btn" title="تعديل" style="width:32px; height:32px;">✏️</button>
            <button class="icon-btn action-delete-btn" title="حذف" style="width:32px; height:32px; color:var(--color-danger);">🗑️</button>
          </div>
        </td>
      `;

      const approveBtn = tr.querySelector('.action-approve-btn');
      if (approveBtn) {
        approveBtn.addEventListener('click', () => {
          setServiceStatus(service.id, 'published');
          showToast(`تم قبول ونشر الخدمة: "${service.title}" بنجاح!`, 'success');
          this.updateStatsCards();
          this.renderServicesList();
          this.onStateChange();
        });
      }

      const rejectBtn = tr.querySelector('.action-reject-btn');
      if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
          setServiceStatus(service.id, 'rejected');
          showToast(`تم تغيير حالة الخدمة إلى: مرفوضة`, 'warning');
          this.updateStatsCards();
          this.renderServicesList();
          this.onStateChange();
        });
      }

      const featureBtn = tr.querySelector('.action-feature-btn');
      if (featureBtn) {
        featureBtn.addEventListener('click', () => {
          toggleServiceFeatured(service.id);
          showToast('تم تحديث حالة التمييز للخدمة.', 'info');
          this.renderServicesList();
          this.onStateChange();
        });
      }

      const editBtn = tr.querySelector('.action-edit-btn');
      if (editBtn) {
        editBtn.addEventListener('click', () => this.promptEditService(service));
      }

      const deleteBtn = tr.querySelector('.action-delete-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          if (confirm(`هل أنت متأكد من حذف الخدمة "${service.title}" نهائياً؟`)) {
            deleteService(service.id);
            showToast('تم حذف الخدمة بنجاح.', 'danger');
            this.updateStatsCards();
            this.renderServicesList();
            this.onStateChange();
          }
        });
      }

      container.appendChild(tr);
    });
  }

  promptEditService(service) {
    const newTitle = prompt('عنوان الخدمة:', service.title);
    if (newTitle === null) return;
    const newPrice = prompt('السعر بالدينار (أو 0 لحسب الاتفاق):', service.price || 0);
    if (newPrice === null) return;
    const newDesc = prompt('الوصف:', service.description || '');
    if (newDesc === null) return;

    updateService(service.id, {
      title: newTitle.trim(),
      price: Number(newPrice) || 0,
      description: newDesc.trim()
    });

    showToast('تم تحديث الخدمة بنجاح.', 'success');
    this.renderServicesList();
    this.onStateChange();
  }

  renderCategoriesList() {
    const container = document.getElementById('admin-categories-list');
    if (!container) return;
    const categories = getStoredCategories();
    container.innerHTML = '';

    categories.forEach(cat => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'space-between';
      item.style.padding = '12px 16px';
      item.style.backgroundColor = 'var(--bg-muted)';
      item.style.border = '1px solid var(--border-light)';
      item.style.borderRadius = 'var(--radius-sm)';
      item.style.marginBottom = '8px';

      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span>📁</span>
          <span style="font-weight: 700; color: var(--text-main);">${cat.name}</span>
        </div>
        <button class="btn btn-sm btn-outline delete-cat-btn" style="color:var(--color-danger); border-color:var(--color-danger);">حذف</button>
      `;

      item.querySelector('.delete-cat-btn').addEventListener('click', () => {
        if (confirm(`هل تريد حذف تصنيف "${cat.name}"؟`)) {
          deleteCategory(cat.id);
          this.renderCategoriesList();
          this.updateStatsCards();
          this.onStateChange();
          showToast('تم حذف التصنيف.', 'info');
        }
      });
      container.appendChild(item);
    });
  }

  bindCategoryManager() {
    const addBtn = document.getElementById('admin-add-category-btn');
    const input = document.getElementById('admin-new-category-input');
    if (addBtn && input) {
      addBtn.addEventListener('click', () => {
        const name = input.value.trim();
        if (name.length < 3) return showToast('يرجى كتابة اسم تصنيف واضح.', 'warning');
        addCategory(name);
        input.value = '';
        this.renderCategoriesList();
        this.updateStatsCards();
        this.onStateChange();
        showToast(`تمت إضافة التصنيف "${name}" بنجاح!`, 'success');
      });
    }
  }

  loadSettingsForm() {
    const settings = getStoredSettings();
    const siteTitleInput = document.getElementById('settings-site-title');
    const contactPhoneInput = document.getElementById('settings-contact-phone');
    if (siteTitleInput) siteTitleInput.value = settings.siteName || 'DZ SERVICES';
    if (contactPhoneInput) contactPhoneInput.value = settings.contactPhone || '0550123456';
  }

  bindSettingsForm() {
    const form = document.getElementById('admin-settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const siteTitle = document.getElementById('settings-site-title').value.trim();
      const contactPhone = document.getElementById('settings-contact-phone').value.trim();
      const newPin = document.getElementById('settings-new-pin').value.trim();

      const updatePayload = { siteName: siteTitle || 'DZ SERVICES', contactPhone: contactPhone || '0550123456' };
      if (newPin) {
        if (newPin.length < 4) return showToast('رمز الإدارة يجب أن يتكون من 4 خانات على الأقل.', 'warning');
        updatePayload.adminPinHash = newPin;
      }

      saveStoredSettings(updatePayload);
      document.getElementById('settings-new-pin').value = '';
      showToast('تم حفظ إعدادات المنصة بنجاح!', 'success');
      this.onStateChange();
    });
  }

  bindBackupRestore() {
    const exportBtn = document.getElementById('admin-export-backup-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        exportDataAsJSON();
        showToast('تم تنزيل النسخة الاحتياطية JSON بنجاح.', 'success');
      });
    }

    const importInput = document.getElementById('admin-import-file-input');
    const importBtn = document.getElementById('admin-import-backup-btn');

    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());
      importInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const res = validateAndImportJSON(event.target.result, 'merge');
          if (res.success) {
            showToast(`تم استيراد ${res.importedCount} خدمة بنجاح! الإجمالي: ${res.totalServices}`, 'success');
            this.updateStatsCards();
            this.renderServicesList();
            this.onStateChange();
          } else {
            showToast(res.error || 'فشل استيراد النسخة الاحتياطية.', 'danger');
          }
        };
        reader.onerror = () => showToast('تعذر قراءة ملف JSON.', 'danger');
        reader.readAsText(file);
        importInput.value = '';
      });
    }
  }

  bindAdminAddService() {
    const adminAddForm = document.getElementById('admin-direct-add-form');
    if (!adminAddForm) return;

    const fileInput = document.getElementById('admin-service-image-input');
    let adminImageBase64 = '';

    if (fileInput) {
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          try {
            adminImageBase64 = await compressImageFile(file, 900, 0.8);
            showToast('تم تحميل ومعالجة الصورة بنجاح.', 'info');
          } catch (err) {
            showToast('فشل قراءة الصورة.', 'danger');
          }
        }
      });
    }

    adminAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = adminAddForm.elements['adminServiceTitle'].value.trim();
      const category = adminAddForm.elements['adminServiceCategory'].value.trim();
      const wilaya = adminAddForm.elements['adminServiceWilaya'].value.trim();
      const providerName = adminAddForm.elements['adminServiceProvider'].value.trim();
      const phone = adminAddForm.elements['adminServicePhone'].value.trim();
      const price = adminAddForm.elements['adminServicePrice'].value;
      const desc = adminAddForm.elements['adminServiceDesc'].value.trim();
      const isFeatured = adminAddForm.elements['adminServiceFeatured'].checked;

      if (title.length < 5 || !category || !wilaya || !phone) {
        return showToast('يرجى ملء جميع الحقول المطلوبة.', 'warning');
      }

      addService({
        title, category, wilaya,
        providerName: providerName || 'DZ SERVICES المعتمد',
        phone, whatsapp: phone,
        price: Number(price) || 0,
        description: desc,
        image: adminImageBase64,
        status: 'published',
        isFeatured
      });

      adminAddForm.reset();
      adminImageBase64 = '';
      showToast('تمت إضافة الخدمة ونشرها مباشرة في المنصة!', 'success');
      this.currentTab = 'services';
      this.updateStatsCards();
      this.renderTabContent();
      this.onStateChange();
    });
  }
}

/* ==========================================================================
   8. Application Orchestrator
   ========================================================================== */
class App {
  constructor() {
    this.searchEngine = null;
    this.adminDashboard = null;
  }

  init() {
    initTheme();
    initModals();
    initScrollReveal();

    this.setupWilayasDropdowns();
    this.setupCategories();
    this.setupSearchEngine();
    this.setupAdminModule();
    this.setupEventListeners();
    this.updateStats();
    this.updateFavoritesBadge();

    initAddServiceForm(() => this.refreshData());
  }

  setupWilayasDropdowns() {
    const wilayaSelects = [
      document.getElementById('hero-wilaya-select'),
      document.getElementById('filter-wilaya-select'),
      document.getElementById('service-wilaya-select'),
      document.getElementById('admin-service-wilaya-select')
    ];

    wilayaSelects.forEach(select => {
      if (!select) return;
      const firstOpt = select.firstElementChild;
      select.innerHTML = '';
      if (firstOpt) select.appendChild(firstOpt);

      ALGERIA_WILAYAS.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w;
        opt.textContent = w;
        select.appendChild(opt);
      });
    });
  }

  setupCategories() {
    const categories = getStoredCategories();
    const services = getStoredServices().filter(s => s.status === 'published');

    const catSelects = [
      document.getElementById('hero-category-select'),
      document.getElementById('filter-category-select'),
      document.getElementById('service-category-select'),
      document.getElementById('admin-service-category-select')
    ];

    catSelects.forEach(select => {
      if (!select) return;
      const firstOpt = select.firstElementChild;
      select.innerHTML = '';
      if (firstOpt) select.appendChild(firstOpt);

      categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        select.appendChild(opt);
      });
    });

    const grid = document.getElementById('categories-grid');
    if (grid) {
      grid.innerHTML = '';
      categories.forEach(cat => {
        const count = services.filter(s => s.category === cat.name).length;
        const iconSvg = CATEGORY_ICONS_SVG[cat.icon] || CATEGORY_ICONS_SVG.briefcase;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.category = cat.name;
        card.innerHTML = `
          <div class="category-icon">${iconSvg}</div>
          <h4 class="category-name">${cat.name}</h4>
          <span class="category-count">${count} خدمة متوفرة</span>
        `;
        card.addEventListener('click', () => this.filterByCategory(cat.name, card));
        grid.appendChild(card);
      });
    }
  }

  filterByCategory(categoryName, clickedCard) {
    const section = document.getElementById('services-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });

    const filterCat = document.getElementById('filter-category-select');
    if (filterCat) filterCat.value = categoryName;

    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    if (clickedCard) clickedCard.classList.add('active');

    this.searchEngine.setCategory(categoryName);
  }

  setupSearchEngine() {
    const allServices = getStoredServices();
    this.searchEngine = new SearchFilterEngine({
      onResultsChange: (results, filters) => {
        this.renderServices(results);
        this.renderActiveFilterChips(filters);
        this.renderFeaturedServices(results);
      }
    });
    this.searchEngine.setServices(allServices);

    const heroForm = document.getElementById('hero-search-form');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = document.getElementById('hero-keyword-input').value;
        const category = document.getElementById('hero-category-select').value;
        const wilaya = document.getElementById('hero-wilaya-select').value;

        this.searchEngine.setQuery(keyword);
        this.searchEngine.setCategory(category);
        this.searchEngine.setWilaya(wilaya);

        const filterKeyword = document.getElementById('filter-keyword-input');
        const filterCat = document.getElementById('filter-category-select');
        const filterWil = document.getElementById('filter-wilaya-select');
        if (filterKeyword) filterKeyword.value = keyword;
        if (filterCat) filterCat.value = category;
        if (filterWil) filterWil.value = wilaya;

        const section = document.getElementById('services-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const filterKeyword = document.getElementById('filter-keyword-input');
    if (filterKeyword) {
      filterKeyword.addEventListener('input', (e) => this.searchEngine.setQuery(e.target.value));
    }

    const filterCategory = document.getElementById('filter-category-select');
    if (filterCategory) {
      filterCategory.addEventListener('change', (e) => this.searchEngine.setCategory(e.target.value));
    }

    const filterWilaya = document.getElementById('filter-wilaya-select');
    if (filterWilaya) {
      filterWilaya.addEventListener('change', (e) => this.searchEngine.setWilaya(e.target.value));
    }

    const filterSort = document.getElementById('filter-sort-select');
    if (filterSort) {
      filterSort.addEventListener('change', (e) => this.searchEngine.setSortBy(e.target.value));
    }

    const resetBtn = document.getElementById('filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetAllFilters());
    }
  }

  resetAllFilters() {
    this.searchEngine.resetFilters();
    ['filter-keyword-input', 'hero-keyword-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    ['filter-category-select', 'hero-category-select', 'filter-wilaya-select', 'hero-wilaya-select'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const sortSelect = document.getElementById('filter-sort-select');
    if (sortSelect) sortSelect.value = 'newest';

    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    showToast('تمت إعادة ضبط جميع فلاتر البحث.', 'info', 1800);
  }

  renderActiveFilterChips(filters) {
    const container = document.getElementById('active-filters-chips');
    if (!container) return;
    container.innerHTML = '';
    if (!this.searchEngine.hasActiveFilters()) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'flex';

    if (filters.query) {
      this.createChip(container, `بحث: "${filters.query}"`, () => {
        document.getElementById('filter-keyword-input').value = '';
        this.searchEngine.setQuery('');
      });
    }
    if (filters.category) {
      this.createChip(container, `التصنيف: ${filters.category}`, () => {
        document.getElementById('filter-category-select').value = '';
        this.searchEngine.setCategory('');
      });
    }
    if (filters.wilaya) {
      this.createChip(container, `الولاية: ${filters.wilaya}`, () => {
        document.getElementById('filter-wilaya-select').value = '';
        this.searchEngine.setWilaya('');
      });
    }
    if (filters.onlyFavorites) {
      this.createChip(container, 'المفضلة فقط ❤️', () => this.searchEngine.setFavoritesOnly(false));
    }

    const clearAll = document.createElement('button');
    clearAll.className = 'btn btn-sm btn-outline';
    clearAll.style.padding = '3px 10px';
    clearAll.style.fontSize = '0.78rem';
    clearAll.textContent = 'مسح الكل';
    clearAll.onclick = () => this.resetAllFilters();
    container.appendChild(clearAll);
  }

  createChip(container, text, onRemove) {
    const chip = document.createElement('span');
    chip.className = 'filter-chip';
    chip.innerHTML = `<span>${text}</span> <span class="filter-chip-remove" title="إلغاء">&times;</span>`;
    chip.querySelector('.filter-chip-remove').onclick = onRemove;
    container.appendChild(chip);
  }

  renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (services.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <h3 class="empty-state-title">لا توجد خدمات معروضة حالياً</h3>
          <p class="empty-state-desc">
            لم يتم العثور على نتائج تطابق معايير بحثك، أو أن المنصة لم تستقبل إعلانات في هذا القسم بعد.
            كن أول من يضيف خدمته مجاناً ويصل إلى آلاف العملاء في الجزائر!
          </p>
          <button class="btn btn-primary btn-lg" id="empty-state-add-btn">أضف خدمتك الأولى الآن</button>
        </div>
      `;
      const btn = document.getElementById('empty-state-add-btn');
      if (btn) btn.addEventListener('click', () => openModal('add-service-modal'));
      return;
    }

    services.forEach(service => {
      grid.appendChild(createServiceCardElement(service, (s) => openServiceDetailsModal(s)));
    });
  }

  renderFeaturedServices(services) {
    const featuredSection = document.getElementById('featured-section');
    const featuredGrid = document.getElementById('featured-services-grid');
    if (!featuredGrid || !featuredSection) return;

    const featured = services.filter(s => s.isFeatured);
    if (featured.length === 0) {
      featuredSection.style.display = 'none';
      return;
    }

    featuredSection.style.display = 'block';
    featuredGrid.innerHTML = '';
    featured.slice(0, 4).forEach(service => {
      featuredGrid.appendChild(createServiceCardElement(service, (s) => openServiceDetailsModal(s)));
    });
  }

  setupAdminModule() {
    this.adminDashboard = new AdminDashboard({
      onStateChange: () => this.refreshData()
    });
    this.adminDashboard.init();
  }

  refreshData() {
    const services = getStoredServices();
    this.searchEngine.setServices(services);
    this.setupCategories();
    this.updateStats();
    this.updateFavoritesBadge();
  }

  updateStats() {
    const services = getStoredServices().filter(s => s.status === 'published');
    const distinctWilayas = new Set(services.map(s => s.wilaya).filter(Boolean)).size;
    const distinctProviders = new Set(services.map(s => s.providerName).filter(Boolean)).size;

    const countServicesEl = document.getElementById('stat-counter-services');
    const countWilayasEl = document.getElementById('stat-counter-wilayas');
    const countProvidersEl = document.getElementById('stat-counter-providers');
    const countViewsEl = document.getElementById('stat-counter-views');

    if (countServicesEl) animateCounter(countServicesEl, services.length);
    if (countWilayasEl) animateCounter(countWilayasEl, Math.max(distinctWilayas, 1));
    if (countProvidersEl) animateCounter(countProvidersEl, Math.max(distinctProviders, 1));
    if (countViewsEl) animateCounter(countViewsEl, 58);
  }

  updateFavoritesBadge() {
    const favs = getStoredFavorites();
    const badge = document.getElementById('favorites-count-badge');
    if (badge) {
      badge.textContent = favs.length;
      badge.style.display = favs.length > 0 ? 'flex' : 'none';
    }
  }

  setupEventListeners() {
    ['header-add-service-btn', 'hero-add-service-btn', 'cta-add-service-btn', 'mobile-add-service-btn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('add-service-modal');
        });
      }
    });

    const favBtn = document.getElementById('header-favorites-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const favs = getStoredFavorites();
        if (favs.length === 0) {
          showToast('قائمة المفضلة فارغة حالياً. اضغط على أيقونة القلب على أي بطاقة لحفظها هنا!', 'info');
          return;
        }
        const active = this.searchEngine.currentFilters.onlyFavorites;
        this.searchEngine.setFavoritesOnly(!active);
        const section = document.getElementById('services-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        showToast(!active ? 'يتم الآن عرض الخدمات المفضلة لديك' : 'تم العودة إلى عرض جميع الخدمات', 'info', 2000);
      });
    }

    const menuToggle = document.getElementById('menu-toggle-btn');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const drawerClose = document.getElementById('mobile-drawer-close');

    if (menuToggle && drawerOverlay) {
      menuToggle.addEventListener('click', () => drawerOverlay.classList.add('is-active'));
      if (drawerClose) drawerClose.addEventListener('click', () => drawerOverlay.classList.remove('is-active'));
      drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) drawerOverlay.classList.remove('is-active');
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            if (drawerOverlay) drawerOverlay.classList.remove('is-active');
          }
        }
      });
    });
  }
}

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
