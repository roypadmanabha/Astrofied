export const CONTACT_PHONE = '+91 96127 36566';
export const WHATSAPP_NUMBER = '919612736566';

export const getWhatsAppLink = (text) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
