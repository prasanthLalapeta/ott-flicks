export interface MovieEntry {
  title: string;
  type: string;
  platform: string;
  language: string;
}

export const parseText = (text: string): MovieEntry[] => {
  const lines = text.split('\n').filter(line => line.trim());
  const entries: MovieEntry[] = [];

  for (const line of lines) {
    const parts = line.split(/[-:]/).map(part => part.trim());
    
    if (parts.length >= 3) {
      const entry: MovieEntry = {
        title: parts[0],
        language: parts[1],
        platform: parts[2],
        type: parts[3]?.toLowerCase().includes('series') ? 'Series' : 'Movie'
      };
      entries.push(entry);
    }
  }

  return entries;
};