const bffConfig: Record<string, string> = {
  local: 'http://localhost:8080',
};

export function getBffHost(): string {
  switch (process.env.BFF_URL) {
    case 'local':
      return bffConfig.local;
    default:
      return bffConfig.local;
  }
}
