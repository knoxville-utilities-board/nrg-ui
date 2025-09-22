export const websiteCookies = [
  'exp_kub_display_name',
  'exp_kub_amount_due',
  'exp_kub_account_id',
  'exp_kub_amount_last_paid',
  'exp_kub_last_paid_date',
  'exp_kub_bill_pdf_link',
  'exp_kub_display_name',
  'exp_kub_prepay',
  'exp_kub_fiber_customer',
  'exp_publisher_prev_status',
  'exp_publisher_site_language',
];
export const secureCookies = ['has_access_token', 'id_token'];

export function createAuthToken(
  claims: Record<string, unknown>,
  options: { header?: unknown; signature?: string } = {},
): string {
  const header = btoa('{}');
  const payload = btoa(JSON.stringify(claims));
  const signature = btoa(options.signature ?? 'signature');

  return [header, payload, signature].join('.');
}

export function resetAuth() {
  for (const cookie of websiteCookies) {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  for (const cookieName of secureCookies) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`;
  }
}

export default {
  createAuthToken,
  resetAuth,
  websiteCookies,
  secureCookies,
};
