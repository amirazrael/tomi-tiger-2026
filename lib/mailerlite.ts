/** MailerLite API expects group IDs as numbers, not strings. */
export function mailerLiteGroupsFromEnv(
  raw: string | undefined
): number[] | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;
  const id = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(id) || id <= 0) return undefined;
  return [id];
}
