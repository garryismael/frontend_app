import i18n from "@/i18n";

export const isRequired = () => (value) => !!value || `${i18n.t('field_required')}`;